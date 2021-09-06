import React from "react";
import MapViewCreateLine from "../components/mapviews/map-view-create-line";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import StartButton from "../components/buttons/start-button";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { SCREEN_WIDTH } from "../../domain/resources/environment/dimensions";
import { getTheme } from "../theme/themes";

export default function DetailScreen({ navigation }) {
  const themedStyles = styles();
  const { markerRegionZoomedIn, isLoaded, rawLineData } = useSelector(
    (state) => state.selectedLineDraftHandler
  );

  const { distance, elevationPoints, title } = rawLineData;

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.text}> {"Line review"} </Text>
      {isLoaded == true ? (
        <Text style={themedStyles.text1}> {title} </Text>
      ) : (
        <ActivityIndicator
          animating={true}
          color={themedStyles.activityIndicator}
          size={"large"}
        />
      )}

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
            labels: [`Distance: ${distance}m`],
            legend: ["Elevation"],
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
        <Text style={themedStyles.text2}>{"Walk some other time"}</Text>
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
      backgroundColor: "#c84b31",
      top: 40,
      width: 250,
      height: 50,
      borderRadius: 16,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "#284538",
      flex: 1,
      flexDirection: "column",
      height: "100%",
    },

    text: {
      backgroundColor: "#e26a00",
      marginTop: 20,
      fontSize: 25,
      color: "#fff5eb",
      textAlign: "center",
      fontFamily: "Evolventa",
    },
    text1: {
      marginTop: 13,
      fontSize: 17,
      color: "#fff5eb",
      textAlign: "center",
      fontFamily: "Evolventa",
    },
    text2: {
      marginTop: 10,
      fontSize: 17,
      color: "#fff5eb",
      textAlign: "center",
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
