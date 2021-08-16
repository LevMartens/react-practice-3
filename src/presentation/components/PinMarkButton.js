import { NavigationHelpersContext } from "@react-navigation/core";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  setPinStartingPoint,
  setPinEndPoint,
} from "../state-management/actions/actions";
import * as Font from "expo-font";

export class PinMarkButton extends Component {
  state = {
    //made true for test
    fontsLoaded: true,
  };

  async loadFonts() {
    await Font.loadAsync({
      Evolventa: require("../../../assets/fonts/Evolventa-Regular.otf"),
      EvolventaBold: require("../../../assets/fonts/Evolventa-Bold.otf"),

      Evolventa: {
        uri: require("../../../assets/fonts/Evolventa-Regular.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
      EvolventaBold: {
        uri: require("../../../assets/fonts/Evolventa-Bold.otf"),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    //this.loadFonts();
  }
  render() {
    const navigation = this.props.navigation;
    if (this.state.fontsLoaded) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.setPin == "Set starting point" &&
              this.props.setPinStartingPoint();
            this.props.setPin == "Set end point" && this.props.setPinEndPoint();

            this.props.setPin == "Done!" && navigation.navigate("Detail");
          }}
        >
          <Text style={styles.text}>{this.props.setPin}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
//'#484848'
//"#c84b31"
//'orange'
//"#fff5eb"
const styles = StyleSheet.create({
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
    bottom: 0,
    width: 400,
    height: 100,
    position: "absolute",
  },
  text: {
    paddingBottom: 20,
    color: "#fff5eb",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Evolventa",
  },
});

const mapStateToProps = (state) => {
  return {
    setPin: state.setPin,
  };
};

const mapDispatchToProps = () => {
  return {
    setPinStartingPoint: setPinStartingPoint,
    setPinEndPoint: setPinEndPoint,
  };
};
export default connect(mapStateToProps, mapDispatchToProps())(PinMarkButton);
