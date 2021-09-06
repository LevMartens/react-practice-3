import React, { useEffect } from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";
//import * as Svg from "react-native-svg";
import {
  StyleSheet,
  // Text,
  // View,
  // Button,
  TouchableOpacity,
  Image,
  //Icon,
} from "react-native";
// import {
//   currentPositionUpdate,
//   mapPressedForFirstPin,
//   mapPressedForSecondPin,
//   mapPressedForThirdPin,
//   updateCurrentDirection,
//   updatePath,
// } from "../state-management/actions/actions";
// import { connect } from "react-redux";
// import StartRecordingButton from "./StartRecordingButton";
// import {
//   getCoordinatesBetween,
//   getDistanceBetween,
//   setOneMeterApart,
// } from "../../domain/generators/Calculations";
//import { getGeolocation } from "../../domain/resources/environment/getGeolocation";
import { getHeading } from "../../domain/resources/environment/getHeading";
//import { mdiNavigation } from "@mdi/js";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { followUserPosition } from "../../domain/use_cases/follow-user-position";
import { getPositionOnce } from "../../domain/resources/environment/get-position-once";

//TODO create button to start directions

export default function MapViewGPSLive() {
  useEffect(() => {
    followUserPosition();
    getPositionOnce(); //TODO this function bypasses use_cases
    getHeading(); //TODO this function bypasses use_cases
  }, []);
  const path = useSelector((state) => state.pathHandler);

  const {
    rawLineData: {
      startingCoordinates: { lat: pointALat, lng: pointALng },
      finishCoordinates: { lat: pointBLat, lng: pointBLng },
    },
  } = useSelector((state) => state.selectedLineDraftHandler);
  const liveCurrentPosition = useSelector(
    (state) => state.watchCurrentPosition
  );
  const pointA = {
    latitude: pointALat,
    longitude: pointALng,
  };

  const pointB = {
    latitude: pointBLat,
    longitude: pointBLng,
  };
  const liveDirection = useSelector((state) => state.watchDirection);

  const {
    latitude: aSingleCurrentPositionLatitude,
    longitude: aSingleCurrentPositionLongitude,
  } = useSelector((state) => state.aSingleCurrentPosition);

  return (
    <MapView
      onPress={(e) => {
        //this.props.mapPressedForThirdPin(e.nativeEvent.coordinate);
      }}
      style={styles.map}
      initialRegion={{
        latitude: aSingleCurrentPositionLatitude,
        longitude: aSingleCurrentPositionLongitude,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.001,
      }}
    >
      <Marker
        //draggable
        key={uuidv4()}
        coordinate={pointB}
        title={"Second Pin"}
        description={"End Point"}
      />
      <Marker
        key={uuidv4()}
        flat={true}
        coordinate={liveCurrentPosition}
        title={"You"}
      >
        <Image
          source={require("../../../assets/cursor4.png")}
          style={{
            width: 50,
            height: 50,
            transform: [
              {
                rotate: `${liveDirection}deg`,
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
        center={liveCurrentPosition}
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

      {path.map((x) => {
        const { id, path, pathColor } = x;

        return (
          <Polyline
            key={id}
            style={{
              position: "absolute",
            }}
            strokeWidth={3}
            coordinates={path}
            strokeColor={pathColor}
          />
        );
      })}

      <Marker
        key={uuidv4()}
        flat={true}
        coordinate={pointA}
        title={"Starting point"}
      >
        <Image
          source={require("../../../assets/start3.png")}
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

// export class GPSLiveMapView extends Component {
//   componentDidMount() {
//     // Starting point and end point
//     var pointA = {
//       latitude: this.props.mapPressHandlerFirstPin.latitude,
//       longitude: this.props.mapPressHandlerFirstPin.longitude,
//     };
//     var pointB = {
//       latitude: this.props.mapPressHandlerSecondPin.latitude,
//       longitude: this.props.mapPressHandlerSecondPin.longitude,
//     };

//     // Distance between Point A and Point B
//     var distance = getDistanceBetween(pointA, pointB);

//     // Percentage to split distance up in single meters, this is used to track how far the cursor travels from the line
//     var aMeter = setOneMeterApart(distance);
//     console.log("ameter" + aMeter);
//     getGeolocation(pointA, pointB, aMeter);
//     getHeading();
//   }

//   render() {
//     // Starting point and end point
//     var pointA = {
//       latitude: this.props.mapPressHandlerFirstPin.latitude,
//       longitude: this.props.mapPressHandlerFirstPin.longitude,
//     };
//     var pointB = {
//       latitude: this.props.mapPressHandlerSecondPin.latitude,
//       longitude: this.props.mapPressHandlerSecondPin.longitude,
//     };

//     return (
//       <MapView
//         onPress={(e) => {
//           this.props.mapPressedForThirdPin(e.nativeEvent.coordinate);
//         }}
//         style={styles.map}
//         initialRegion={{
//           latitude: this.props.mapPressHandlerFirstPin.latitude,
//           longitude: this.props.mapPressHandlerFirstPin.longitude,
//           latitudeDelta: 0.0002,
//           longitudeDelta: 0.001,
//         }}
//       >
//         <Marker
//           draggable
//           key={2}
//           coordinate={pointB}
//           title={"Second Pin"}
//           description={"End Point"}
//         />
//         <Marker
//           key={5}
//           flat={true}
//           coordinate={this.props.watchCurrentPosition}
//           title={"You"}
//         >
//           <Image
//             source={require("../../../assets/cursor4.png")}
//             style={{
//               width: 50,
//               height: 50,
//               transform: [
//                 {
//                   rotate: `${this.props.watchDirection}deg`,
//                 },
//               ],
//             }}
//             resizeMode="contain"
//           />
//         </Marker>
//         <Circle
//           zIndex={0}
//           strokeWidth={0.00001}
//           fillColor={"rgba(102, 178, 102, 0.3)"}
//           center={this.props.watchCurrentPosition}
//           radius={25}
//         ></Circle>
//         <Polyline
//           style={{
//             elevation: 5,
//             position: "absolute",
//             zIndex: 5,
//           }}
//           strokeWidth={4}
//           coordinates={[pointA, pointB]}
//           strokeColor={"#323232"}
//         />
//         {/* <Polyline
//           strokeWidth={3}
//           coordinates={this.props.updatePathReducer.path}
//           strokeColors={this.props.updatePathReducer.pathColors}
//         /> */}
//         <>{this.props.updatePathReducer.path}</>

//         {/* <Circle fillColor={"#000000"} center={pointA} radius={3}></Circle> */}
//         <Marker
//           key={6}
//           flat={true}
//           coordinate={pointA}
//           title={"Starting point"}
//         >
//           <Image
//             source={require("../../../assets/start3.png")}
//             style={{
//               width: 30,
//               height: 30,
//             }}
//             resizeMode="contain"
//           />
//         </Marker>
//       </MapView>
//     );
//   }
// }

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

// const mapStateToProps = (state) => {
//   return {
//     mapPressHandlerFirstPin: state.mapPressHandlerFirstPin,
//     mapPressHandlerSecondPin: state.mapPressHandlerSecondPin,
//     mapPressHandlerThirdPin: state.mapPressHandlerThirdPin,
//     watchCurrentPosition: state.watchCurrentPosition,
//     setPin: state.setPin,
//     watchDirection: state.watchDirection,
//     updatePathReducer: state.updatePathReducer,
//   };
// };

// const mapDispatchToProps = () => {
//   return {
//     mapPressedForFirstPin: mapPressedForFirstPin,
//     mapPressedForSecondPin: mapPressedForSecondPin,
//     mapPressedForThirdPin: mapPressedForThirdPin,
//     currentPositionUpdate: currentPositionUpdate,
//     updateCurrentDirection: updateCurrentDirection,
//     updatePath: updatePath,
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps())(GPSLiveMapView);
