import { StyleSheet } from "react-native";

const colors = {
  primary_900: "#010A13",
  primary_800: "#252D32",
  primary_700: "#424950",
};

const themeStyles = StyleSheet.create({
  text_header_size: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text_subheader: {
    color: "#d8d8d8",
    fontSize: 16,
  },
  text_body_size: {
    fontSize: 12,
  },
  text_color_primary: {
    color: "#ffffff",
  },
  text_color_secondary: {
    color: "#d8d8d8",
  },
  color_surface: {
    color: colors.primary_800,
  },
  color_divider: {
    color: colors.primary_700,
  },
});

export { themeStyles, colors };
