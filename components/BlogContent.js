import Moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import HTML from "react-native-render-html";
import { themeStyles } from "../resources/theme";

const blogContent = (props) => {
  return (
    <View>
      <Text
        style={[
          {
            marginTop: 16,
            marginStart: 16,
            fontSize: 16,
            textAlign: "left",
          },
          themeStyles.text_subheader,
        ]}
      >
        {Moment(props.date).format("MMM. D, YYYY")}
      </Text>
      <View style={{ marginStart: 16, marginEnd: 16, marginTop: 8 }}>
        <HTML
          tagsStyles={{
            p: { color: "#ffffff", marginBottom: 16 },
            ul: { color: "#ffffff" },
            li: { color: "#ffffff" },
            div: { color: "#ffffff" },
          }}
          source={{ html: props.htmlContent }}
        />
      </View>
    </View>
  );
};

export default blogContent;
