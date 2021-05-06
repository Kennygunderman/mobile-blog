import firestore from "@react-native-firebase/firestore";

//filderedIds = array of blog post ids to filter out
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

const subscribeBlogPosts = (filteredIds, onSuccess) => {
  firestore()
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
  firestore()
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

export { fetchBlogPost, subscribeBlogPosts, subscribeComments };
