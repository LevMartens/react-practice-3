import React, { useEffect } from "react";
import { StyleSheet, Text, Image, Animated, Dimensions } from "react-native";
import { getTheme } from "../theme/themes";
import infinityActivityIndicator from "../../assets/inf2.gif";

export default function Banner(props) {
  const themedStyle = styles();

  const animated = props.visible
    ? new Animated.Value(0)
    : new Animated.Value(1);

  useEffect(() => {
    Animated.timing(animated, {
      toValue: props.visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [props.visible]);

  return (
    <Animated.View
      style={[
        themedStyle.animatedView,
        {
          transform: [
            {
              scaleY: animated.interpolate({
                inputRange: [0, 25, 50, 75, 100],
                outputRange: [0, 25, 50, 75, 100],
              }),
            },
          ],
        },
      ]}
    >
      <Image
        source={infinityActivityIndicator}
        style={themedStyle.bannerImage}
      />

      <Text style={themedStyle.bannerText}>{props.bannerText}</Text>
    </Animated.View>
  );
}

const styles = () => {
  const { width } = Dimensions.get("window");
  const theme = getTheme();
  return StyleSheet.create({
    animatedView: {
      position: "absolute",
      top: -100,
      backgroundColor: theme.bannerBackgroundColor,
      opacity: 0.7,
      height: 150,
      width: width,
      flexDirection: "row",
    },
    bannerText: {
      fontSize: 14,
      fontFamily: theme.fontFamily,
      marginTop: 115,
      marginLeft: 20,
      color: theme.bannerTextColor,
    },
    bannerImage: {
      marginLeft: 15,
      marginTop: 118,
      width: 30,
      height: 15,
      resizeMode: "contain",
    },
  });
};
