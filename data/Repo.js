import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";

const fetchBlogPost = (id, onSuccess, onError) => {
  firestore()
    .collection("posts")
    .doc(id)
    .get()
    .then((doc) => {
      let currentPost = doc.data();
      currentPost.id = id;
      onSuccess(currentPost);
    })
    .catch((error) => {
      onError(error);
    });
};

//filderedIds = array of blog post ids to filter out
const subscribeBlogPosts = (filteredIds, onSuccess) => {
  return firestore()
    .collection("posts")
    .onSnapshot((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //don't show the post we are currently on
        if (!filteredIds.includes(doc.id)) {
          const post = {
            ...data,
            id: doc.id,
            image: { uri: data.image },
            date: new Date(data.date.seconds * 1000),
          };

          posts.push(post);
        }
      });
      posts.sort((a, b) => b.date.getTime() - a.date.getTime());
      onSuccess(posts);
    });
};

const subscribeComments = (postId, onSuccess) => {
  return firestore()
    .collection("comments")
    .onSnapshot((querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.postId === postId) {
          const comment = {
            ...data,
            date: new Date(data.date.seconds * 1000), //format date as it comes in from firebase
            id: doc.id,
          };
          comments.push(comment);
        }
      });
      comments.sort((a, b) => b.date.getTime() - a.date.getTime());
      onSuccess(comments);
    });
};

const addComment = (comment, onSuccess) => {
  firestore()
    .collection("comments")
    .doc(uuid.v4())
    .set({
      comment: comment.text,
      date: new Date(),
      displayName: comment.userDisplayName,
      postId: comment.postId,
      uid: comment.userUid,
      profilePhotoUrl: comment.userProfileUrl,
    })
    .then(() => {
      onSuccess();
    })
    .catch((error) => console.log(error));
};

export { fetchBlogPost, subscribeBlogPosts, subscribeComments, addComment };
