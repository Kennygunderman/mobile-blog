import React, { Component } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { addComment } from "../data/Repo";
import { StackActions } from "@react-navigation/native";

class LeaveComment extends Component {
  state = {
    currentUser: null,
    postId: "",
    commentText: "",
  };

  componentDidMount() {
    this.setState({
      postId: this.props.route.params.postId,
      currentUser: auth().currentUser,
    });
    this.props.navigation.setOptions({
      title: "Leave a Comment",
    });
  }

  leaveComment = () => {
    const comment = {
      text: this.state.commentText,
      postId: this.state.postId,
      userUid: this.state.currentUser.uid,
      userProfileUrl: this.state.currentUser.photoURL,
      userDisplayName: this.state.currentUser.displayName,
    };

    addComment(comment, () => {
      this.props.navigation.dispatch(StackActions.pop(1));
    });
  };

  render() {
    const name = this.state.currentUser
      ? this.state.currentUser.displayName
      : "";
    return (
      <View>
        <TextInput
          onChangeText={(text) => {
            this.setState({ commentText: text });
          }}
          returnKeyType={"done"}
          underlineColor={"#ffffff"}
          theme={{
            colors: {
              background: "rgb(37, 45, 50)",
              placeholder: "#424950",
              accent: "rgb(255, 255, 255)",
              text: "rgb(255, 255, 255)",
              primary: "rgb(255, 255, 255)",
            },
          }}
          label={`Leave a comment as ${name}...`}
        />
        <View style={{ alignItems: "flex-end" }}>
          <Button
            style={{
              borderColor: "#ffffff",
              marginTop: 16,
              marginEnd: 16,
              width: 150,
              marginBottom: 24,
            }}
            dark={true}
            theme={{
              colors: {
                text: "rgb(255, 255, 255)",
                primary: "rgb(255, 255, 255)",
              },
            }}
            mode="outlined"
            onPress={() => {
              this.leaveComment();
            }}
          >
            Comment
          </Button>
        </View>
      </View>
    );
  }
}

export default LeaveComment;
