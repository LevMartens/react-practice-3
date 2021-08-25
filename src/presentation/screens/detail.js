import React from "react";
import MapViewCreateLine from "../components/map-view-create-line";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StartButton from "../components/StartButton";
import { useSelector } from "react-redux";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { SCREEN_WIDTH } from "../../domain/resources/environment/dimensions";

export default function DetailScreen({ navigation }) {
  const themedStyles = styles();
  const { markerRegionZoomedIn, isLoaded, rawLineData } = useSelector(
    (state) => state.selectedMarkerHandler
  );

  const { distance, elevationPoints } = rawLineData;

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.text}> {"Review"} </Text>
      <View style={themedStyles.mapView}>
        {isLoaded == true ? (
          <MapViewCreateLine initialRegion={markerRegionZoomedIn}>
            {" "}
          </MapViewCreateLine>
        ) : (
          <ActivityIndicator
            animating={true}
            color={themedStyles.activityIndicator}
            size={"large"}
          />
        )}
      </View>

      {isLoaded == true ? (
        <LineChart
          data={{
            labels: ["Elevation"],
            legend: [`Distance: ${distance}m`],
            datasets: [
              {
                data: elevationPoints,
              },
            ],
          }}
          width={SCREEN_WIDTH - 40}
          height={180}
          yAxisSuffix="m"
          yAxisInterval={1}
          chartConfig={themedStyles.chartConfig}
          bezier
          style={themedStyles.chartLayout}
        />
      ) : (
        <ActivityIndicator
          animating={true}
          color={themedStyles.activityIndicator}
          size={"large"}
        />
      )}

      <TouchableOpacity style={themedStyles.button} onPress={() => {}}>
        <Text style={themedStyles.text1}>{"Save Draft"}</Text>
      </TouchableOpacity>
      <StartButton navigation={navigation}></StartButton>
    </View>
  );
}
const styles = () => {
  const theme = getTheme();
  return {
    chartLayout: {
      justifyContent: "center",
      alignItems: "center",

      marginHorizontal: 20,

      borderRadius: 16,
    },
    chartConfig: {
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    },
    activityIndicator: {
      color: theme.buttonColor,
    },
    mapView: {
      marginTop: 20,
      marginBottom: 20,
      flexDirection: "row",
      alignSelf: "center",
      width: SCREEN_WIDTH - 40,
      height: 180,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: "#FF616D",
    },
    button: {
      flexDirection: "row",
      justifyContent: "center",

      alignSelf: "center",
      //marginTop: 20,
      backgroundColor: "#c84b31",
      //right: 20,
      top: 40,
      //bottom: 20,
      width: 250,
      height: 50,
      borderRadius: 16,
      //position: "absolute",
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      //marginTop: 0,
      backgroundColor: "#284538",
      flex: 1,
      flexDirection: "column",
      height: "100%",
    },

    text: {
      backgroundColor: "#e26a00",
      marginTop: 20,
      // marginBottom: 0,
      // paddingBottom: 0,
      fontSize: 25,
      color: "#fff5eb",
      textAlign: "center",
      fontFamily: "Evolventa",
    },
    text1: {
      //paddingBottom: 50,
      //marginLeft: 20,
      marginTop: 13,
      fontSize: 17,
      color: "#fff5eb",
      textAlign: "center",
      fontFamily: "Evolventa",
    },
    text2: {
      marginLeft: 15,
      marginTop: 40,
      fontSize: 20,
      color: "#fff5eb",
      textAlign: "left",
      fontFamily: "Evolventa",
    },
    text3: {
      marginLeft: 15,
      marginTop: 20,
      fontSize: 20,
      color: "#fff5eb",
      textAlign: "left",
      fontFamily: "Evolventa",
    },
  };
};
