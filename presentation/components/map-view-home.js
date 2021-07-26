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
  Dimensions,
  Animated,
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
import { debounce, throttle } from "lodash";
import { lineMarkersHandler } from "../state-management/reducers/line-marker-handler";
//import Animated from "react-native-reanimated";
//import { mdiNavigation } from "@mdi/js";

const callabonna = {
  latitude: -29.991626,
  longitude: 140.00131,
};

const positionHasChanged = throttle(function (region, t15, mapView) {
  getLineMarkers(region, t15, mapView);
}, 3500);

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var mapView = {};

export class MapViewHome extends Component {
  componentDidMount() {
    getPositionOnce();
    watchPositionForeground();
    getHeading();
  }

  render() {
    return this.props.aSingleCurrentPosition.isLoaded == true ? (
      <MapView
        ref={(ref) => (mapView = ref)}
        showsUserLocation={false}
        liteMode={true}
        style={styles.map}
        onRegionChangeComplete={(region) => {
          var t15 = performance.now();
          positionHasChanged(region, t15, mapView);
        }}
        initialRegion={{
          latitude: this.props.aSingleCurrentPosition.latitude,
          longitude: this.props.aSingleCurrentPosition.longitude,
          latitudeDelta: LATITUDE_DELTA, //1.2, //0.4
          longitudeDelta: LONGITUDE_DELTA, //0.001,
        }}
      >
        {this.props.lineMarkersHandler.map((marker) => {
          if (marker.isLoaded === true) {
            return (
              <Marker
                key={Math.random()}
                tracksViewChanges={false}
                zIndex={Math.random()}
                tracksInfoWindowChanges={false}
                coordinate={marker.coordinates}
                onPress={() =>
                  mapView.animateToRegion(marker.markerRegion, 1000)
                }
              >
                <Image
                  source={marker.image}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
              </Marker>
            );
          }
        })}

        <Marker
          key={905}
          onPress={() => animate()}
          flat={true}
          coordinate={{
            latitude: this.props.aSingleCurrentPosition.latitude + 0.54,
            longitude: this.props.aSingleCurrentPosition.longitude + 0.4,
          }}
          title={"You"}
        ></Marker>
        <Marker
          key={906}
          flat={true}
          coordinate={{
            latitude: this.props.aSingleCurrentPosition.latitude - 0.54,
            longitude: this.props.aSingleCurrentPosition.longitude - 0.4,
          }}
          title={"You"}
        ></Marker>
        <Marker
          key={907}
          flat={true}
          coordinate={{
            latitude: this.props.aSingleCurrentPosition.latitude + 0.54,
            longitude: this.props.aSingleCurrentPosition.longitude - 0.4,
          }}
          title={"You"}
        ></Marker>
        <Marker
          key={908}
          flat={true}
          coordinate={{
            latitude: this.props.aSingleCurrentPosition.latitude - 0.54,
            longitude: this.props.aSingleCurrentPosition.longitude + 0.4,
          }}
          title={"You"}
        ></Marker>
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
