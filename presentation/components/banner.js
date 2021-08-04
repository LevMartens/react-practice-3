import React, { Component, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Icon,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Banner(props) {
  const animated = props.visible
    ? new Animated.Value(0)
    : new Animated.Value(1);

  useEffect(() => {
    console.log(props.visible, "- Has changed");
    Animated.timing(animated, {
      toValue: props.visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [props.visible]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: -100,
        backgroundColor: "black",
        opacity: 0.7,
        height: 150,
        width: width,
        flexDirection: "row",
        transform: [
          {
            scaleY: animated.interpolate({
              inputRange: [0, 25, 50, 75, 100],
              outputRange: [0, 25, 50, 75, 100],
            }),
          },
        ],
      }}
    >
      <Image
        source={require("../../assets/inf2.gif")}
        style={styles.bannerImage}
      />

      <Text style={styles.bannerText}>Loading lines...</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bannerText: {
    fontSize: 14,
    fontFamily: "Evolventa",
    marginTop: 115,
    marginLeft: 20,
    color: "#ffffff",
  },
  bannerImage: {
    marginLeft: 15,
    marginTop: 118,
    width: 30,
    height: 15,
    resizeMode: "contain",
  },
});
