import React, { Component } from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
//import * as Svg from "react-native-svg";
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
import {
  currentPositionUpdate,
  mapPressedForFirstPin,
  mapPressedForSecondPin,
  mapPressedForThirdPin,
  updateCurrentDirection,
  updatePath,
  updateCurrentPositionOnce,
} from "../state-management/actions/actions";
import { connect } from "react-redux";
import StartRecordingButton from "./StartRecordingButton";
import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../Core/Calculations";
import { getGeolocation } from "../../domain/use_cases/getGeolocation";
import { getHeading } from "../../domain/use_cases/getHeading";
import { watchPositionForeground } from "../../domain/use_cases/watch-position-foreground";
import { getPositionOnce } from "../../domain/use_cases/get-position-once";
//import { mdiNavigation } from "@mdi/js";
import { getLines } from "../../domain/use_cases/get-lines";

export class LinesNearby extends Component {
  componentDidMount() {
    getLines();
  }

  render() {
    return <>{"Array of lines (2x marker + 1 polyline)"}</>;
  }
}

// export class Line extends Component {

//   render() {
//     return ();
//   }
// }
