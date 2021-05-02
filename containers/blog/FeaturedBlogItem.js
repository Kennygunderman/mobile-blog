import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";

const image = {
  uri:
    "https://firebasestorage.googleapis.com/v0/b/web-app-d1952.appspot.com/o/blog-imgs%2Fday_1_header.jpg?alt=media&token=1bf4d298-297a-44c8-9a1d-b4a454cac934",
};

const onPressed = () => {
  console.log("pressed");
};

const featuredBlogItem = (props) => {
  return (
    <Ripple onPress={onPressed} rippleColor={"#ffffff"}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.header}>Day 1 React Native</Text>
            <Text style={styles.body} numberOfLines={2}>
              Test! text Test text Test text Test text Test text Test text Test
              text Test text Test textTest text Test text Test text Test text
              Test text Test text Test text Test text Test text
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    margin: 10,
    height: 250,
    borderRadius: 5,
  },
  overlay: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#000000a0",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    margin: 8,
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
  },
  body: {
    margin: 8,
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
});

export default featuredBlogItem;
