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

export async function getZoomLevelRules(zoomLevel) {
  if (zoomLevel >= 11.5) {
    return {
      minDistanceToContinue: 5000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 11.5 && zoomLevel >= 11) {
    return {
      minDistanceToContinue: 10000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 11 && zoomLevel >= 10.4) {
    return {
      minDistanceToContinue: 20000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 10.4 && zoomLevel >= 9.5) {
    return {
      minDistanceToContinue: 30000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 9.5) {
    return {
      minDistanceToContinue: 35000,
      zoomedOutToFar: true,
    };
  }
}
