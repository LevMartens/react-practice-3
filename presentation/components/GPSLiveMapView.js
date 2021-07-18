import React, { Component } from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
//import * as Svg from "react-native-svg";
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
} from "../state-management/actions/actions";
import { connect } from "react-redux";
import StartRecordingButton from "../components/StartRecordingButton";
import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../domain/generators/Calculations";
import { getGeolocation } from "../../domain/use_cases/environment/getGeolocation";
import { getHeading } from "../../domain/use_cases/environment/getHeading";
//import { mdiNavigation } from "@mdi/js";

export class GPSLiveMapView extends Component {
  componentDidMount() {
    // Starting point and end point
    var pointA = {
      latitude: this.props.mapPressHandlerFirstPin.latitude,
      longitude: this.props.mapPressHandlerFirstPin.longitude,
    };
    var pointB = {
      latitude: this.props.mapPressHandlerSecondPin.latitude,
      longitude: this.props.mapPressHandlerSecondPin.longitude,
    };

    // Distance between Point A and Point B
    var distance = getDistanceBetween(pointA, pointB);

    // Percentage to split distance up in single meters, this is used to track how far the cursor travels from the line
    var aMeter = setOneMeterApart(distance);
    console.log("ameter" + aMeter);
    getGeolocation(pointA, pointB, aMeter);
    getHeading();
  }

  render() {
    // Starting point and end point
    var pointA = {
      latitude: this.props.mapPressHandlerFirstPin.latitude,
      longitude: this.props.mapPressHandlerFirstPin.longitude,
    };
    var pointB = {
      latitude: this.props.mapPressHandlerSecondPin.latitude,
      longitude: this.props.mapPressHandlerSecondPin.longitude,
    };

    return (
      <MapView
        onPress={(e) => {
          this.props.mapPressedForThirdPin(e.nativeEvent.coordinate);
        }}
        style={styles.map}
        initialRegion={{
          latitude: this.props.mapPressHandlerFirstPin.latitude,
          longitude: this.props.mapPressHandlerFirstPin.longitude,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          draggable
          key={2}
          coordinate={pointB}
          title={"Second Pin"}
          description={"End Point"}
        />
        <Marker
          key={5}
          flat={true}
          coordinate={this.props.watchCurrentPosition}
          title={"You"}
        >
          <Image
            source={require("../../assets/cursor4.png")}
            style={{
              width: 50,
              height: 50,
              transform: [
                {
                  rotate: `${this.props.watchDirection}deg`,
                },
              ],
            }}
            resizeMode="contain"
          />
        </Marker>
        <Circle
          zIndex={0}
          strokeWidth={0.00001}
          fillColor={"rgba(102, 178, 102, 0.3)"}
          center={this.props.watchCurrentPosition}
          radius={25}
        ></Circle>
        <Polyline
          style={{
            elevation: 5,
            position: "absolute",
            zIndex: 5,
          }}
          strokeWidth={4}
          coordinates={[pointA, pointB]}
          strokeColor={"#323232"}
        />
        {/* <Polyline
          strokeWidth={3}
          coordinates={this.props.updatePathReducer.path}
          strokeColors={this.props.updatePathReducer.pathColors}
        /> */}
        <>{this.props.updatePathReducer.path}</>

        {/* <Circle fillColor={"#000000"} center={pointA} radius={3}></Circle> */}
        <Marker
          key={6}
          flat={true}
          coordinate={pointA}
          title={"Starting point"}
        >
          <Image
            source={require("../../assets/start3.png")}
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    );
  }
}

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
    mapPressHandlerThirdPin: state.mapPressHandlerThirdPin,
    watchCurrentPosition: state.watchCurrentPosition,
    setPin: state.setPin,
    watchDirection: state.watchDirection,
    updatePathReducer: state.updatePathReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    mapPressedForFirstPin: mapPressedForFirstPin,
    mapPressedForSecondPin: mapPressedForSecondPin,
    mapPressedForThirdPin: mapPressedForThirdPin,
    currentPositionUpdate: currentPositionUpdate,
    updateCurrentDirection: updateCurrentDirection,
    updatePath: updatePath,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(GPSLiveMapView);
