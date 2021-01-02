import * as firebase from "firebase";
import firebaseConfig from "../firebaseConfig";
import moment from 'moment';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const getUserLikePostRef = (userID, postID) => firestore.doc(`users/${userID}/liked_posts/${postID}`);

const getUserPostRef = (userID, postID) => firestore.doc(`users/${userID}/posts/${postID}`);
const getUserPosstRef = (userID) => firestore.collection(`users/${userID}/posts`);
const getGroupPostsRef = (groupID) => firestore.collection(`groups/${groupID}/posts`);
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
    console.log('firebase:addPost')
    // Create post, add post to author's post list, and group's post list
    // TODO: multiple groups?
    const postRef = getPostCollection().doc();
    const postID = postRef.id;
    post.postID = postID;
    post.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);

    const batch = firestore.batch();
    batch.set(postRef, post)
    batch.set(userPostRef, post);
    batch.set(groupPostRef, post);
    batch.commit()
         .catch(err => console.error(err));    
  },
  getGroupPosts: (groupID, setGroupPosts) => {
    console.log('firebase:getGroupPosts')
    const groupPostsRef = getGroupPostsRef(groupID)
                            .orderBy('timestamp', 'desc')
                            .limit(10);

    const unsubscribe = groupPostsRef.onSnapshot(snapshot => {
      console.log('firebase:getGroupPosts:snapShot')
      if (snapshot.size) {
        const posts = [];    
        snapshot.forEach(docRef => {
          const doc = docRef.data();
          if (doc.timestamp) {
            const timestampDate = doc.timestamp.toDate();    
            const m = moment(timestampDate);
            const timestamp = m.format('ddd, MMM D');
            doc.timestampStr = timestamp;
          }
          posts.push(doc);

        })
        setGroupPosts(posts);
      }
    })
    return unsubscribe;
  },
  getUserPosts: (userID, setUserPosts) => {
    console.log('firebase:getUserPosts')
    const userPosts = getUserPosstRef(userID)
                        .orderBy('timestamp', 'desc')
                        .limit(10);

    const unsubscribe = userPosts.onSnapshot(snapshot => {
      console.log('firebase:getUserPosts:snapShot')
      if (snapshot.size) {
        const posts = [];    
        snapshot.forEach(docRef => {
          const doc = docRef.data();
          if (doc.timestamp) {
            const timestampDate = doc.timestamp.toDate();    
            const m = moment(timestampDate);
            const timestamp = m.format('ddd, MMM D');
            doc.timestampStr = timestamp;
          }
          posts.push(doc);

        })
        setUserPosts(posts);
      }
    })
    return unsubscribe;
  },
  getPosts: (setPosts) => {
    console.log('firebase:getPosts')
    const postsRef = getPostCollection()
                        .orderBy('timestamp', 'desc')
                        .limit(10);
                        
    const unsubscribe = postsRef.onSnapshot(snapshot => {
      console.log('firebase:getPosts:snapShot')
      if (snapshot.size) {
        const posts = [];    
        snapshot.forEach(docRef => {
          const doc = docRef.data();
          if (doc.timestamp) {
            const timestampDate = doc.timestamp.toDate();    
            const m = moment(timestampDate);
            const timestamp = m.format('ddd, MMM D');
            doc.timestampStr = timestamp;
          }
          posts.push(doc);

        })
        setPosts(posts);
      }
    })
    return unsubscribe;
  },
  modifyPost: (userID, groupID, postID, post) => {
    console.log('firebase:modifyPost')
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
    console.log('firebase:removePost')
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
    console.log('firebase:likePost')
    // Like post (public, author's, group's)
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);
    const userLikePostRef = getUserLikePostRef(userID, postID);

    return firestore.runTransaction(async transaction => {
      const post = await transaction.get(postRef);
      const userPost = await transaction.get(userPostRef);
      const groupPost = await transaction.get(groupPostRef);

      if (!post.exists || !userPost.exists || !groupPost.exists) {
          throw "Post does not exist!";
      }

      const numLikes = post.data().numLikes + 1;

      transaction.update(postRef, { numLikes })
      transaction.update(userPostRef, { numLikes })
      transaction.update(groupPostRef, { numLikes })
      transaction.set(userLikePostRef, { contains: true });

    }).catch(err => console.error(err));
  },
  unlikePost: (userID, groupID, postID) => {
    console.log('firebase:unlikePost')
    // Unlike post (public, author's, group's)
    const postRef = getPostRef(postID);
    const userPostRef = getUserPostRef(userID, postID);
    const groupPostRef = getGroupPostRef(groupID, postID);
    const userLikePostRef = getUserLikePostRef(userID, postID);

    return firestore.runTransaction(async transaction => {
      const post = await transaction.get(postRef);
      const userPost = await transaction.get(userPostRef);
      const groupPost = await transaction.get(groupPostRef);

      if (!post.exists || !userPost.exists || !groupPost.exists) {
          throw "Post does not exist!";
      }

      const numLikes = post.data().numLikes - 1;

      transaction.update(postRef, { numLikes });
      transaction.update(userPostRef, { numLikes });
      transaction.update(groupPostRef, { numLikes });
      transaction.delete(userLikePostRef);

    }).catch(err => console.error(err));
  },
  checkHasLiked: (userID, postID, setHasLiked) => {
    const userLikePostRef = getUserLikePostRef(userID, postID);
    const unsubscribe = userLikePostRef.onSnapshot(snapshot => {
      console.log('firebase:checkHasLiked:snapshot')
      if (snapshot.exists) {
        setHasLiked(true);
      }
      else {
        setHasLiked(false);
      }
    });
    return unsubscribe;
  },
  reportPost: (userID, groupID, postID, post) => {
    console.log('firebase:reportPost')
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
