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
  sendLineMarkers,
} from "../state-management/actions/actions";
import { connect } from "react-redux";
import StartRecordingButton from "../components/StartRecordingButton";
import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../domain/generators/Calculations";
import { getGeolocation } from "../../domain/resources/environment/getGeolocation";
import { getPluscode } from "../../domain/resources/api/get-pluscode";
import { getHeading } from "../../domain/resources/environment/getHeading";
import { watchPositionForeground } from "../../domain/resources/environment/watch-position-foreground";
import { getPositionOnce } from "../../domain/resources/environment/get-position-once";
import { getLineMarkers } from "../../domain/use_cases/get-line-markers";
import { LinesNearby } from "../components/lines-nearby";
import { debounce } from "lodash";
import { lineMarkersHandler } from "../state-management/reducers/line-marker-handler";
//import { mdiNavigation } from "@mdi/js";

const callabonna = {
  latitude: -29.991626,
  longitude: 140.00131,
};

export class MapViewHome extends Component {
  componentDidMount() {
    getPositionOnce();
    watchPositionForeground();
    getHeading();
  }

  changeRegion = debounce(async (region) => {
    getLineMarkers(region);
  }, 1000);

  render() {
    return this.props.aSingleCurrentPosition.isLoaded == true ? (
      <MapView
        onPress={(e) => {}}
        style={styles.map}
        onRegionChangeComplete={(region) => {
          this.changeRegion(region);
        }}
        initialRegion={{
          latitude: callabonna.latitude, //this.props.aSingleCurrentPosition.latitude,
          longitude: callabonna.longitude, //this.props.aSingleCurrentPosition.longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.001,
        }}
      >
        <React.Fragment key={Math.random()}>
          {this.props.lineMarkersHandler}
        </React.Fragment>

        {/* <LinesNearby lineMarkers={this.props.lineMarkersHandler}></LinesNearby> */}
        <Marker
          key={5}
          flat={true}
          coordinate={this.props.watchCurrentPosition}
          title={"You"}
        >
          <Image
            source={require("../../assets/cursor4.png")}
            style={{
              width: 40,
              height: 40,
              transform: [
                {
                  rotate: `${this.props.watchDirection}deg`,
                },
              ],
            }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    ) : (
      <View style={{ justifyContent: "center" }}>
        <ActivityIndicator animating={true} color={"#c84b31"} size={"large"} />
      </View>
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
    lineMarkersHandler: state.lineMarkersHandler,
    mapPressHandlerFirstPin: state.mapPressHandlerFirstPin,
    mapPressHandlerSecondPin: state.mapPressHandlerSecondPin,
    mapPressHandlerThirdPin: state.mapPressHandlerThirdPin,
    watchCurrentPosition: state.watchCurrentPosition,
    setPin: state.setPin,
    watchDirection: state.watchDirection,
    updatePathReducer: state.updatePathReducer,
    aSingleCurrentPosition: state.aSingleCurrentPosition,
  };
};

const mapDispatchToProps = () => {
  return {
    sendLineMarkers: sendLineMarkers,
    mapPressedForFirstPin: mapPressedForFirstPin,
    mapPressedForSecondPin: mapPressedForSecondPin,
    mapPressedForThirdPin: mapPressedForThirdPin,
    currentPositionUpdate: currentPositionUpdate,
    updateCurrentDirection: updateCurrentDirection,
    updatePath: updatePath,
    updateCurrentPositionOnce: updateCurrentPositionOnce,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(MapViewHome);
