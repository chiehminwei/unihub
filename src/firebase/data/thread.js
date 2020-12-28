import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const getUserPostRef = (userID, postID) => firestore.doc(`users/${userID}/posts/${postID}`);
const getGroupPostRef = (groupID, postID) => firestore.doc(`groups/${groupID}/posts/${postID}`);
const getReportRef = (postID) => firestore.doc(`reported/posts/${postID}`)
const getPostCollection = () => firestore.collection('posts');
const getPostRef = (postID) => firestore.doc(`posts/${postID}`);

const getComments = () => firestore.collection(`comments`)
const getPostComments = (postID) => firestore.collection(`post/${postID}/comments`);
const getUserComments = (userID, postID) => firestore.collection(`users/${userID}/posts/${postID}/comments`);
const getGroupComments = (groupID, postID) => firestore.collection(`groups/${groupID}/posts/${postID}/comments`);
// const getComment = ()


const Post = {
  addPost: (userID, groupID, post) => {
    // Create post, add post to author's post list, and group's post list
    // TODO: multiple groups?
    const postRef = getPostCollection().doc();
    const postID = postRef.id;
    post.group = groupID;
    post.author = userID;

    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    const batch = firestore.batch();
    batch.set(postRef, post)
    batch.set(userPostRef, post);
    batch.set(groupPostRef, post);
    batch.commit()
         .catch(err => console.error(err));    
  },
  modifyPost: (userID, groupID, postID, post) => {
    // Modify post (public, author's, group's)    
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    const batch = firestore.batch();
    batch.set(postRef, post)
    batch.set(userPostRef, post);
    batch.set(groupPostRef, post);
    batch.commit()
         .catch(err => console.error(err));
  },
  removePost: (userID, groupID, postID) => {
    // Delete post (public, author's, group's)
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    const batch = firestore.batch();
    batch.delete(postRef);
    batch.delete(userPostRef);
    batch.delete(groupPostRef);
    batch.commit()
         .catch(err => console.error(err));
  },
  likePost: (userID, groupID, postID) => {
    // Like post (public, author's, group's)
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    return firestore.runTransaction(async transaction => {
      const post = await transaction.get(postRef);
      const userPost = await transaction.get(userPostRef);
      const groupPost = await transaction.get(groupPostRef);

      if (!post.exists || !userPost.exists || !groupPost.exists) {
          throw "Post does not exist!";
      }

      const likeCount = post.data().likeCount + 1;

      transaction.update(post, { likeCount })
      transaction.update(userPost, { likeCount })
      transaction.update(groupPost, { likeCount })

    }).catch(err => console.error(err));
  },
  unlikePost: (userID, groupID) => {
    // Unlike post (public, author's, group's)
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    return firestore.runTransaction(async transaction => {
      const post = await transaction.get(postRef);
      const userPost = await transaction.get(userPostRef);
      const groupPost = await transaction.get(groupPostRef);

      if (!post.exists || !userPost.exists || !groupPost.exists) {
          throw "Post does not exist!";
      }

      const likeCount = post.data().likeCount - 1;

      transaction.update(post, { likeCount })
      transaction.update(userPost, { likeCount })
      transaction.update(groupPost, { likeCount })

    }).catch(err => console.error(err));
  },
  reportPost: (userID, groupID, postID, post) => {
    // Report a post (public, author's, group's)
    const reportRef = getReportRef(postID);
    return reportRef.set(post);
  },
  replyPost: (userID, groupID, postID) => {
    // S
    // const commentsRef = getComments(postID);
    // const commentID = 

    // const postRef = getPostCollection().doc();
    // const postID = postRef.id;
    // post.group = groupID;
    // post.author = userID;

    // const userPostRef = getUserPostRef(userID, postID);
    // const groupPostRef = getGroupPostRef(groupID, postID);

    // const userCommentsRef = getUserComments(userID, postID);
    // const groupCommentsRef = getGroupComments(groupID, postID);

    // const batch = firestore.batch();
    // batch.delete(memberRef);
    // batch.delete(userGroupRef);
    // batch.commit()
    //      .catch(err => console.error(err));
    console.log(123)
  },
  replyComment: () => {
    console.log(123)
  }
};

export default Post;
