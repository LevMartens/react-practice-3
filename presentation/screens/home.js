import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapViewHome from "../components/map-view-home";
import { useSelector } from "react-redux";
import Banner from "../components/banner";
import { getTheme } from "../theme/themes";
import Modal from "react-native-modalbox";

export default function Home({ navigation }) {
  const { visible, message } = useSelector((state) => state.bannerHandler);
  const themedStyles = styles();
  const sheetRef = useRef();

  return (
    <View style={themedStyles.container}>
      <Modal
        style={themedStyles.modal}
        animationDuration={0}
        swipeThreshold={300}
        ref={sheetRef}
        isOpen={true}
        backdrop={false}
        swipeToClose={true}
        // onClosingState={this.onClosingState}
      >
        <Text>Basic modal</Text>
      </Modal>
      <MapViewHome></MapViewHome>

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
    wrapper: {
      paddingTop: 50,
      flex: 1,
    },

    modal: {
      marginTop: 200,
      borderRadius: 5,
      height: 430,
      backgroundColor: "#3B5998",
      justifyContent: "center",
      alignItems: "center",
    },

    modal2: {
      marginTop: 400,
      height: 230,
      backgroundColor: "#3B5998",
    },
  });
};
