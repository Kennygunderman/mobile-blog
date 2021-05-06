import firestore from "@react-native-firebase/firestore";

import React, { Component } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import BlogItem from "../components/BlogItem";

class Blog extends Component {
  state = {
    isLoading: false,
    posts: [],
  };

  onBlogItemPressed = (id, title) => {
    this.props.navigation.navigate("Detail", {
      id: id,
      title: title,
    });
  };

  renderBlogItem = ({ item }) => (
    <BlogItem
      id={item.id}
      image={item.image}
      title={item.title}
      date={item.date}
      summary={item.summary}
      featured={item.featured}
      onPressed={this.onBlogItemPressed}
    />
  );

  componentDidMount() {
    this.setState({ isLoading: true });

    firestore()
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const post = {
            ...data,
            image: { uri: data.image },
            date: new Date(data.date.seconds * 1000), //format data as it comes in from firebase
            id: doc.id,
          };
          posts.push(post);
        });
        posts.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.setState({ isLoading: false, posts: posts });
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={this.state.posts}
            renderItem={this.renderBlogItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default Blog;
