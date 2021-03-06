import React, { Component } from "react";
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BlogItem from "../components/BlogItem";
import { themeStyles } from "../resources/theme";
import Comment from "../components/Comment";
import BlogContent from "../components/BlogContent";
import { authUser } from "../auth/Auth";

import {
  fetchBlogPost,
  subscribeBlogPosts,
  subscribeComments,
} from "../data/Repo";
import { FAB } from "react-native-paper";
import LeaveComment from "./LeaveComment";

class BlogDetail extends Component {
  state = {
    content: {
      header: null,
      summaryContent: null,
      comments: null,
      otherPosts: null,
    },
    isLoading: true,
    error: false,
  };

  itemType = {
    HEADER: "header",
    CONTENT: "content",
    COMMENT: "comment",
    NO_COMMENTS: "no_coments",
    LEAVE_COMMENT: "leave_comment",
    OTHER_POSTS: "other_posts",
  };

  componentDidMount() {
    const id = this.props.route.params.id;
    this.props.navigation.setOptions({
      title: this.props.route.params.title.slice(0, 5),
    });

    fetchBlogPost(id, (currentPost) => {
      //set header section
      let headerSection = {
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
      };

      //set summary section
      let summaryContentSection = {
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
      };

      this.setState((prevState) => {
        const updatedContent = prevState.content;
        updatedContent.header = headerSection;
        updatedContent.summaryContent = summaryContentSection;
        return {
          ...prevState,
          isLoading: false,
          content: updatedContent,
        };
      });

      this.unsubscribeComments = subscribeComments(
        currentPost.id,
        (comments) => {
          comments.forEach((comment) => {
            comment.itemType = this.itemType.COMMENT;
          });

          if (comments.length == 0) {
            comments.push({ itemType: this.itemType.NO_COMMENTS });
          }

          const commentsSection = {
            title: "Comments",
            data: comments,
          };
          this.setState((prevState) => {
            const updatedContent = prevState.content;
            updatedContent.comments = commentsSection;
            return {
              ...prevState,
              content: updatedContent,
            };
          });
        }
      );

      this.unsubscribeBlogPosts = subscribeBlogPosts(
        [currentPost.id],
        (posts) => {
          posts.forEach((post) => {
            post.featured = false;
            post.itemType = this.itemType.OTHER_POSTS;
          });

          const otherPostsSection = {
            title: "Other Posts",
            data: posts,
          };
          this.setState((prevState) => {
            const updatedContent = prevState.content;
            updatedContent.otherPosts = otherPostsSection;
            return {
              ...prevState,
              content: updatedContent,
            };
          });
        }
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribeComments ?? this.unsubscribeComments();
    this.unsubscribeBlogPosts ?? this.unsubscribeBlogPosts();
  }

  renderContent = ({ item }) => {
    switch (item.itemType) {
      case this.itemType.COMMENT:
        return (
          <Comment
            comment={item.comment}
            date={item.date}
            displayName={item.displayName}
            profilePhotoUrl={item.profilePhotoUrl}
          />
        );

      case this.itemType.NO_COMMENTS:
        return (
          <Text
            style={[
              themeStyles.text_color_primary,
              themeStyles.text_body_size,
              { margin: 16 },
            ]}
          >
            No comments yet
          </Text>
        );

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
        return <BlogContent date={item.date} htmlContent={item.summary} />;
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

  constructSections() {
    content = this.state.content;
    return [
      content.header ?? { data: [] },
      content.summaryContent ?? { data: [] },
      content.comments ?? { data: [] },
      content.otherPosts ?? { data: [] },
    ];
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <SectionList
          sections={this.constructSections()}
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

        <FAB
          icon="lead-pencil"
          style={{
            margin: 24,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            //verify user is authenticated before leaving a comment
            authUser()
              .then((user) => {
                this.props.navigation.push("LeaveComment", {
                  postId: this.props.route.params.id,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        ></FAB>
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
});

export default BlogDetail;
