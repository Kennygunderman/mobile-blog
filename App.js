import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Blog from "./containers/Blog";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import BlogDetail from "./containers/BlogDetail";
import { themeStyles } from "./resources/theme";

const Stack = createStackNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: "rgb(1, 10, 19)",
    background: "rgb(37, 45, 50)",
    primary: "rgb(255, 255, 255)",
  },
};

export default function App() {
  console.log(theme.colors);
  return (
    <View style={{ flex: 1, backgroundColor: themeStyles.color_surface.color }}>
      <StatusBar backgroundColor="#010A13" barStyle="light-content" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Blog" component={Blog} />
          <Stack.Screen name="Detail" component={BlogDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
