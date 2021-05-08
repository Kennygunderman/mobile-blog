import React, { Component } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import BlogItem from "../components/BlogItem";
import { subscribeBlogPosts } from "../data/Repo";

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
    this.unsubscribeBlogPosts = subscribeBlogPosts([], (posts) => {
      this.setState({ isLoading: false, posts: posts });
    });
  }

  componentWillUnmount() {
    this.unsubscribeBlogPosts ?? this.unsubscribeBlogPosts();
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
