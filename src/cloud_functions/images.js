'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mkdirp = require('mkdirp');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

admin.initializeApp();


/**
 * When an image is uploaded in the Storage bucket it is converted to JPEG automatically using
 * ImageMagick.
 */
exports.imageToJPG = functions.storage.object().onFinalize(async (object) => {
  // File extension for the created JPEG files.
  const JPEG_EXTENSION = '.jpg';
  
  const filePath = object.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const JPEGFilePath = path.normalize(path.format({dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION}));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!object.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a JPEG.
  if (object.contentType.startsWith('image/jpeg')) {
    console.log('Already a JPEG.');
    return null;
  }

  const bucket = admin.storage().bucket(object.bucket);
  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  // Download file from bucket.
  await bucket.file(filePath).download({destination: tempLocalFile});
  console.log('The file has been downloaded to', tempLocalFile);
  // Convert the image to JPEG using ImageMagick.
  await spawn('convert', [tempLocalFile, tempLocalJPEGFile]);
  console.log('JPEG image created at', tempLocalJPEGFile);
  // Uploading the JPEG image.
  await bucket.upload(tempLocalJPEGFile, {destination: JPEGFilePath});
  console.log('JPEG image uploaded to Storage at', JPEGFilePath);
  // Once the image has been converted delete the local files to free up disk space.
  fs.unlinkSync(tempLocalJPEGFile);
  fs.unlinkSync(tempLocalFile);
  return null;
});


/**
 * When an image is uploaded we check if it is flagged as Adult or Violence by the Cloud Vision
 * API and if it is we blur it using ImageMagick.
 */
exports.blurOffensiveImages = functions.storage.object().onFinalize(async (object) => {
  const vision = require('@google-cloud/vision');
  const VERY_UNLIKELY = 'VERY_UNLIKELY';
  const BLURRED_FOLDER = 'blurred';

  // Ignore things we've already blurred
  if (object.name.startsWith(`${BLURRED_FOLDER}/`)) {
    console.log(`Ignoring upload "${object.name}" because it was already blurred.`);
    return null;
  }
  
  // Check the image content using the Cloud Vision API.
  const visionClient = new vision.ImageAnnotatorClient();
  const data = await visionClient.safeSearchDetection(
    `gs://${object.bucket}/${object.name}`
  );

  const safeSearch = data[0].safeSearchAnnotation;
  console.log('SafeSearch results on image', safeSearch);

  // Tune these detection likelihoods to suit your app.
  // The current settings show the most strict configuration
  // Docs: https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
  if (
    safeSearch.adult !== VERY_UNLIKELY ||
    safeSearch.spoof !== VERY_UNLIKELY ||
    safeSearch.medical !== VERY_UNLIKELY ||
    safeSearch.violence !== VERY_UNLIKELY ||
    safeSearch.racy !== VERY_UNLIKELY
  ) {
    console.log('Offensive image found. Blurring.');
    return blurImage(object.name, object.bucket, object.metadata);
  }

  return null;
});

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 */
async function blurImage(filePath, bucketName, metadata) {
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const bucket = admin.storage().bucket(bucketName);

  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  console.log('Temporary directory has been created', tempLocalDir);

  // Download file from bucket.
  await bucket.file(filePath).download({destination: tempLocalFile});
  console.log('The file has been downloaded to', tempLocalFile);

  // Blur the image using ImageMagick.
  await spawn('convert', [tempLocalFile, '-channel', 'RGBA', '-blur', '0x8', tempLocalFile]);
  console.log('Blurred image created at', tempLocalFile);

  // Uploading the Blurred image.
  await bucket.upload(tempLocalFile, {
    destination: `${BLURRED_FOLDER}/${filePath}`,
    metadata: {metadata: metadata}, // Keeping custom metadata.
  });
  console.log('Blurred image uploaded to Storage at', filePath);

  // Clean up the local file
  fs.unlinkSync(tempLocalFile);
  console.log('Deleted local file', filePath);
}


/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * Sharp.
 */
exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  const gcs = require('@google-cloud/storage')();
  const sharp = require('sharp');

  const THUMB_MAX_WIDTH = 200;
  const THUMB_MAX_HEIGHT = 200;

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket);

  const metadata = {
    contentType: contentType,
  };
  // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
  // Create write stream for uploading thumbnail
  const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

  // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
  const pipeline = sharp();
  pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).max().pipe(thumbnailUploadStream);

  bucket.file(filePath).createReadStream().pipe(pipeline);

  return new Promise((resolve, reject) =>
      thumbnailUploadStream.on('finish', resolve).on('error', reject));
});