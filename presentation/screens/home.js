import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import MapViewHome from "../components/map-view-home";
//import { Snackbar, Banner, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../components/banner";

export default function Home({ navigation }) {
  const visible = useSelector((state) => state.snackbarHandler);

  console.log("visible " + visible);

  return (
    <View style={styles.container}>
      <MapViewHome></MapViewHome>
      <Banner visible={visible}></Banner>

      {/* <Banner
        visible={visible}
        style={styles.banner}
        //contentStyle={styles.bannerContent}
        actions={[
          {
            label: "",
            onPress: () => {},
          },
          {
            label: "",
            onPress: () => {},
          },
        ]}
        icon={({ size }) => (
          <Image
            source={require("../../assets/inf2.gif")}
            style={{
              width: 35,
              height: 20,
            }}
          />
        )}
      >
        <Text style={styles.bannerText}>Loading lines...</Text>
      </Banner> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#d8b384",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  snackbar: {
    zIndex: 99,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 500,
    backgroundColor: "#c84b31",
    width: 200,
    height: 50,
    position: "absolute",
  },
  h: {
    height: 65,
    width: "100%",
    backgroundColor: "#000000",
    opacity: 0.7,
  },

  banner: {
    //...StyleSheet.absoluteFillObject,
    //paddingTop: 0,
    //marginTop: 0,
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.7,
    //height: 65,
  },
  bannerContent: {
    //...StyleSheet.absoluteFillObject,
    paddingTop: 0,
    marginTop: 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000",
    opacity: 0.7,
    height: 65,
  },
  bannerText: {
    fontSize: 14,
    fontFamily: "Evolventa",
    paddingTop: 50,
    marginTop: 50,
    paddingBottom: 10,
    marginBottom: 10,
    //textAlign: "center",
    color: "#ffffff",
  },
});
