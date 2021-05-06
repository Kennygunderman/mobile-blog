import Moment from "moment";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { themeStyles } from "../resources/theme";

const comment = (props) => {
  const imageWidth = 50;
  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 8,
        marginStart: 16,
        marginEnd: 16,
        flexDirection: "row",
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 25 }}
        style={{
          width: imageWidth,
          height: 50,
          borderRadius: 5,
          resizeMode: "cover",
          justifyContent: "center",
        }}
        source={{
          uri: props.profilePhotoUrl,
        }}
      />
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              { marginEnd: 8, marginStart: 8 },
              themeStyles.text_small_size,
              themeStyles.text_color_primary,
            ]}
          >
            {props.displayName}
          </Text>
          <Text
            style={[
              themeStyles.text_small_size,
              themeStyles.text_color_secondary,
            ]}
          >
            {Moment(props.date).format("MMM. D, YYYY")}
          </Text>
        </View>
        <Text
          style={[
            { marginStart: 8, marginTop: 4, paddingEnd: imageWidth },
            themeStyles.text_body_size,
            themeStyles.text_color_primary,
          ]}
        >
          {props.comment}
        </Text>
      </View>
    </View>
  );
};

export default comment;
