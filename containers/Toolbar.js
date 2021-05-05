import * as React from "react";
import { Appbar } from "react-native-paper";

//account & login
const toolbar = () => (
  <Appbar.Header>
    <Appbar.Content title="Blog" />
    <Appbar.Action icon="account" onPress={() => console.log("Pressed")} />
  </Appbar.Header>
);

export default toolbar;
