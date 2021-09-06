import React from "react";
import { StyleSheet, View } from "react-native";
import MapViewExplore from "../components/mapviews/map-view-explore";
import { useSelector } from "react-redux";
import Banner from "../components/banner";
import { getTheme } from "../theme/themes";

export default function Home({ navigation }) {
  const { visible, message } = useSelector((state) => state.bannerHandler);
  const themedStyles = styles();

  return (
    <View style={themedStyles.container}>
      <MapViewExplore></MapViewExplore>
      <Banner visible={visible} bannerText={message}></Banner>
    </View>
  );
}
const styles = () => {
  const theme = getTheme();
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.containerBackgroundColor,
      flex: 1,
      flexDirection: "column",
      height: "100%",
    },
  });
};
