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
import { Polyline, Marker, Circle } from "react-native-maps";
//import { mdiNavigation } from "@mdi/js";
//import { getLines } from "../../domain/use_cases/get-lines"; //! create get lines in domain/use_cases/graphql

export class LinesNearby extends Component {
  componentDidMount() {
    //    getLines();
  }

  render() {
    return (
      <React.Fragment key={Math.random()}>
        {this.props.lineMarkers}
      </React.Fragment>
    );
  }
}

export class LineMarker extends Component {
  render() {
    return (
      <>
        <Marker></Marker>
        <Circle></Circle>
        <Polyline></Polyline>
      </>
    );
  }
}

export class NumberOfLinesMarker extends Component {
  render() {
    return (
      <Marker key={this.props.id} coordinate={this.props.coordinates}>
        <Image
          source={this.props.image}
          style={{
            width: 40,
            height: 40,
          }}
          resizeMode="contain"
        />
      </Marker>
    );
  }
}
