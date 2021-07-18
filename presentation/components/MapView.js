import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import SnackBar from "react-native-snackbar-component";
import {
  mapPressedForFirstPin,
  mapPressedForSecondPin,
} from "../state-management/actions/actions";
import { connect } from "react-redux";
import * as Font from "expo-font";
import { getCoordinatesBetween } from "../../domain/generators/Calculations";

export class MapViewComponent extends Component {
  render() {
    const Melbourne = {
      latitude: -37.840935,
      longitude: 144.946457,
    };

    const Carlton = {
      latitude: -37.794932,
      longitude: 144.973475,
    };

    return (
      <MapView
        onPress={(e) => {
          this.props.setPin == "Set starting point" &&
            this.props.mapPressedForFirstPin(e.nativeEvent.coordinate);
          this.props.setPin == "Set end point" &&
            this.props.mapPressedForSecondPin(e.nativeEvent.coordinate);
        }}
        style={styles.map}
        initialRegion={{
          latitude: getCoordinatesBetween(
            this.props.mapPressHandlerFirstPin,
            this.props.mapPressHandlerSecondPin,
            0.5
          ).latitude,
          longitude: getCoordinatesBetween(
            this.props.mapPressHandlerFirstPin,
            this.props.mapPressHandlerSecondPin,
            0.5
          ).longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          key={2}
          zIndex={1000}
          style={{ zIndex: 1000 }}
          centerOffset={{ x: 0, y: -12 }}
          coordinate={this.props.mapPressHandlerSecondPin}
          title={"Finish"}
          description={"The end point of your straight line"}
          pinColor={"#3a6351"}
        >
          <Image
            source={
              this.props.setPin == "Set end point"
                ? require("../../assets/marker7.png")
                : require("../../assets/marker6.png")
            }
            style={{
              zIndex: 1000,
              width: 60,
              height: 60,
            }}
            resizeMode="contain"
          />
        </Marker>

        <Marker
          draggable
          centerOffset={{ x: 0, y: -12 }}
          key={1}
          zIndex={10000}
          style={{ zIndex: 10000 }}
          coordinate={this.props.mapPressHandlerFirstPin}
          title={"Start"}
          description={"The starting point of your straight line"}
          pinColor={"#3a6351"}
        >
          <Image
            source={
              this.props.setPin == "Set starting point"
                ? require("../../assets/marker8.png")
                : require("../../assets/marker5.png")
            }
            style={{
              zIndex: 1000,
              width: 60,
              height: 60,
            }}
            resizeMode="contain"
          />
        </Marker>

        <Polyline
          strokeColor={"#323232"}
          strokeWidth={3}
          coordinates={[
            this.props.mapPressHandlerFirstPin,
            this.props.mapPressHandlerSecondPin,
          ]}
        />
      </MapView>
    );
  }
}
//#223B30"
const styles = StyleSheet.create({
  textView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0A1D37",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#d8b384",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: "#c84b31",
    width: 200,
    height: 50,
    position: "absolute",
  },
  text: {
    color: "#fff5eb",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    mapPressHandlerFirstPin: state.mapPressHandlerFirstPin,
    mapPressHandlerSecondPin: state.mapPressHandlerSecondPin,
    setPin: state.setPin,
  };
};

const mapDispatchToProps = () => {
  return {
    mapPressedForFirstPin: mapPressedForFirstPin,
    mapPressedForSecondPin: mapPressedForSecondPin,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(MapViewComponent);
