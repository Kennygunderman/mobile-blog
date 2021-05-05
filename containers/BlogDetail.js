import firestore from "@react-native-firebase/firestore";
import Moment from "moment";
import React, { Component } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BlogItem from "../components/BlogItem/BlogItem";
import HTML from "react-native-render-html";
import { themeStyles } from "../resources/theme";

class BlogDetail extends Component {
  state = {
    content: [],
    isLoading: true,
    error: false,
  };

  itemType = {
    HEADER: "header",
    CONTENT: "content",
    OTHER_POSTS: "other_posts",
  };

  componentDidMount() {
    const id = this.props.route.params.id;
    this.props.navigation.setOptions({
      title: this.props.route.params.title.slice(0, 5),
    });

    let content = [];
    let currentPost = null;
    firestore()
      .collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        currentPost = doc.data();
        currentPost.id = id;

        //set header section
        content.push({
          title: null,
          data: [
            {
              id: currentPost.id,
              image: { uri: currentPost.image },
              title: "",
              featured: true,
              itemType: this.itemType.HEADER,
            },
          ],
        });

        //set content section
        content.push({
          title: currentPost.title,
          data: [
            {
              id: "content-block",
              title: currentPost.title,
              date: new Date(currentPost.date.seconds * 1000),
              summary: currentPost.summary,
              itemType: this.itemType.CONTENT,
            },
          ],
        });

        //set other posts section
        this.unsubscribeBlogPosts = firestore()
          .collection("posts")
          .onSnapshot((querySnapshot) => {
            const otherPosts = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              //don't show the post we are currently on
              if (doc.id != currentPost.id) {
                const post = {
                  ...data,
                  featured: false,
                  id: doc.id,
                  date: new Date(data.date.seconds * 1000),
                  itemType: this.itemType.OTHER_POSTS,
                };
                otherPosts.push(post);
              }
            });
            otherPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
            content.push({ title: "Other Posts", data: otherPosts });
            this.setState({
              isLoading: false,
              content: content,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  renderContent = ({ item }) => {
    switch (item.itemType) {
      case this.itemType.HEADER:
        return (
          <BlogItem
            image={item.image}
            title={item.title}
            summary={""}
            featured={true}
            onPressed={() => {}}
          />
        );
      case this.itemType.CONTENT:
        return (
          <View style={styles.content}>
            <Text style={[styles.date_alignment, themeStyles.text_subheader]}>
              {Moment(item.date).format("MMM. D, YYYY")}
            </Text>
            <View style={styles.summary}>
              <HTML
                tagsStyles={{
                  p: { color: "#ffffff", marginBottom: 16 },
                  ul: { color: "#ffffff" },
                  li: { color: "#ffffff" },
                  div: { color: "#ffffff" },
                }}
                source={{ html: item.summary }}
              />
            </View>
          </View>
        );
      case this.itemType.OTHER_POSTS:
        return (
          <BlogItem
            id={item.id}
            image={item.image}
            title={item.title}
            date={item.date}
            summary={item.summary}
            featured={item.featured}
            onPressed={(id, title) => {
              this.props.navigation.push("Detail", { id: id, title: title });
            }}
          />
        );
    }
  };

  render() {
    return (
      <SafeAreaView>
        <SectionList
          sections={this.state.content}
          renderItem={this.renderContent}
          renderSectionHeader={({ section: { title } }) =>
            title ? (
              <View>
                <View style={styles.divider} />
                <Text
                  style={[
                    styles.header_alignment,
                    themeStyles.text_header_size,
                    themeStyles.text_color_primary,
                    { backgroundColor: themeStyles.color_surface.color },
                  ]}
                >
                  {title}
                </Text>
                <View style={styles.divider} />
              </View>
            ) : null
          }
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: themeStyles.color_divider.color,
  },
  header_alignment: {
    paddingStart: 16,
    paddingTop: 16,
    paddingBottom: 16,
    textAlign: "left",
  },
  date_alignment: {
    marginTop: 16,
    marginStart: 16,
    fontSize: 16,
    textAlign: "left",
  },
  summary: {
    margin: 16,
  },
  content: {
    marginBottom: 8,
  },
});

export default BlogDetail;
