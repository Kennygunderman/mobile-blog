import React from "react";
import Moment from "moment";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { themeStyles } from "../resources/theme";

const stripHTML = (htmlStr) => {
  return htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
};

const blogItem = (props) => {
  return (
    <View
      elevation={4}
      style={[
        styles.container,
        {
          borderWidth: props.featured ? 0 : 1,
          borderColor: themeStyles.color_divider.color,
        },
      ]}
    >
      <ImageBackground source={props.image} style={styles.image}>
        <Ripple
          onPress={() => props.onPressed(props.id, props.title)}
          rippleColor={themeStyles.text_color_primary.color}
        >
          <View
            style={[
              styles.overlay,
              {
                backgroundColor: props.featured
                  ? "#000000a0"
                  : themeStyles.color_surface.color,
              },
            ]}
          >
            <Text
              style={[
                styles.header_alignment,
                themeStyles.text_header_size,
                themeStyles.text_color_primary,
              ]}
            >
              {props.title}
            </Text>
            {props.featured ? null : (
              <Text style={[styles.date_alignment, themeStyles.text_subheader]}>
                {Moment(props.date).format("MMM. D, YYYY")}
              </Text>
            )}
            {props.summary ? (
              <Text
                style={[
                  styles.body_text_alignment,
                  themeStyles.text_color_primary,
                  themeStyles.text_body_size,
                ]}
                numberOfLines={2}
              >
                {stripHTML(props.summary)}
              </Text>
            ) : null}
          </View>
        </Ripple>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginStart: 16,
    marginEnd: 16,
    marginBottom: 8,
    marginTop: 8,
    overflow: "hidden",
    height: 200,
    borderRadius: 5,
    shadowColor: "black",
  },
  overlay: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header_alignment: {
    margin: 16,
    textAlign: "left",
  },
  date_alignment: {
    marginLeft: 16,
    textAlign: "left",
  },

  body_text_alignment: {
    margin: 16,
    textAlign: "left",
  },
});

export default blogItem;
