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
    {
      isLoaded: false,
    },
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

export const bannerHandler = (
  state = {
    visible: false,
    message: "Bonjorno",
  },

  action
) => {
  switch (action.type) {
    case "OPENBANNER":
      return action.event;
    default:
      return state;
  }
};

export const selectedMarkerHandler = (
  state = {
    id: 0,
    isLoaded: false,
  },

  action
) => {
  switch (action.type) {
    case "SELECTMARKER":
      return action.event;
    default:
      return state;
  }
};
