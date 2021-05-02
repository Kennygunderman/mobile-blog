import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import FeaturedBlogItem from "./FeaturedBlogItem";

class Blog extends Component {
  render() {
    return (
      <SafeAreaView>
        <FeaturedBlogItem />
      </SafeAreaView>
    );
  }
}

export default Blog;
