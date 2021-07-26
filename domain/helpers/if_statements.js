export async function convertZoomLvlToJumpsFor(region, zoomLevel) {
  if (region === "REGION_VISIBLE_ON_SCREEN") {
    if (zoomLevel > 12.8698) {
      return 1;
    }
    if (zoomLevel < 12.8698 && zoomLevel > 12.6769) {
      return 1;
    }
    if (zoomLevel < 12.6769 && zoomLevel > 12.4) {
      return 2;
    }
    if (zoomLevel < 12.4 && zoomLevel > 10) {
      return 20;
    }
    if (zoomLevel < 10 && zoomLevel > 7.5) {
      return 40;
    }
    // Level 2 pluscodes
    if (zoomLevel < 7.5 && zoomLevel > 6.5) {
      return 1;
    }
    if (zoomLevel < 6.5 && zoomLevel > 5.5) {
      return 3;
    }
    if (zoomLevel < 5.5 && zoomLevel > 4) {
      return 5;
    }
    if (zoomLevel < 4) {
      return 10;
    }
  }

  if (region === "REGION_TO_MERGE") {
    if (zoomLevel < 10.5 && zoomLevel > 10) {
      return 1;
    }
    if (zoomLevel < 10 && zoomLevel > 9) {
      return 2;
    }
    if (zoomLevel < 9 && zoomLevel > 8) {
      return 3;
    }
    if (zoomLevel < 8) {
      return 5;
    }
    // Level 2 pluscodes
    if (zoomLevel < 7 && zoomLevel > 5) {
      return 1;
    }
    if (zoomLevel < 5) {
      return 3;
    }
  }
}
