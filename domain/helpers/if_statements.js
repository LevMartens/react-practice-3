export async function getZoomLevelRules(zoomLevel) {
  if (zoomLevel >= 11.5) {
    return {
      jumps: 3,
      minDistanceToContinue: 5000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 11.5 && zoomLevel >= 11) {
    return {
      jumps: 4,
      minDistanceToContinue: 10000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 11 && zoomLevel >= 10.4) {
    return {
      jumps: 10,
      minDistanceToContinue: 20000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 10.4 && zoomLevel >= 9.5) {
    return {
      jumps: 20,
      minDistanceToContinue: 30000,
      zoomedOutToFar: false,
    };
  }
  if (zoomLevel < 9.5) {
    return {
      jumps: 30,
      minDistanceToContinue: 35000,
      zoomedOutToFar: true,
    };
  }
}
