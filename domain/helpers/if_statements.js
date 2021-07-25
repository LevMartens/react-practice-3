export async function convertZoomLvlToJumpsFor(region, zoomLevel) {
  if (region === "REGION_VISIBLE_ON_SCREEN") {
    if (zoomLevel > 12.8698) {
      console.log("AAA");
      return 1;
    }
    if (zoomLevel < 12.8698 && zoomLevel > 12.6769) {
      console.log("BBB");
      return 1;
    }
    if (zoomLevel < 12.6769 && zoomLevel > 12.4) {
      console.log("CCC");
      return 2;
    }
    if (zoomLevel < 12.4 && zoomLevel > 10) {
      console.log("DDD");

      return 20;
    }
    if (zoomLevel < 10 && zoomLevel > 7.5) {
      console.log("EEE");
      return 40;
    }
    // Level 2 pluscodes
    if (zoomLevel < 7.5 && zoomLevel > 6.5) {
      console.log("FFF");
      return 1;
    }
    if (zoomLevel < 6.5 && zoomLevel > 5.5) {
      console.log("GGG");
      return 3;
    }
    if (zoomLevel < 5.5 && zoomLevel > 4) {
      console.log("HHH");
      return 5;
    }
    if (zoomLevel < 4) {
      console.log("III");
      return 10;
    }
  }

  if (region === "REGION_TO_MERGE") {
    if (zoomLevel < 10.5 && zoomLevel > 10) {
      console.log("JJJ");
      return 1;
    }
    if (zoomLevel < 10 && zoomLevel > 9) {
      console.log("KKK");
      return 2;
    }
    if (zoomLevel < 9 && zoomLevel > 8) {
      console.log("LLL");
      return 3;
    }
    if (zoomLevel < 8) {
      console.log("MMM");
      return 5;
    }
    // Level 2 pluscodes
    if (zoomLevel < 7 && zoomLevel > 5) {
      console.log("NNN");
      return 1;
    }
    if (zoomLevel < 5) {
      console.log("OOO");
      return 3;
    }
  }
}
