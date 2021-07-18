import MapView, { Polyline, Marker, Circle } from "react-native-maps";

import React, { Component } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Icon,
} from "react-native";

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

export const lineMarkersHandler = (
  state = [
    <Marker key={Math.random()} coordinate={Carlton}>
      <Image
        source={require("../../../assets/nada.png")}
        style={{
          width: 40,
          height: 40,
        }}
        resizeMode="contain"
      />
    </Marker>,
  ],
  action
) => {
  switch (action.type) {
    case "GETLINEMARKERS":
      return action.lineMarkers;
    default:
      return state;
  }
};
