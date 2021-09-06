import { watchPosition } from "../resources/environment/watch-position";
import { v4 as uuidv4 } from "uuid";
import store from "../../presentation/state-management/store/store";
import {
  currentPositionUpdate,
  updatePath,
} from "../../presentation/state-management/actions/actions";
import { getDistanceBetween } from "../generators/distance-generator";
import { meterFractionGenerator } from "../generators/meter-fraction-generator";
import { getCoordinatesBetween } from "../generators/coordinates-generator";

export async function startProducingPath(startingPoint, endPoint, distance) {
  const pointA = startingPoint;
  const pointB = endPoint;
  const totalDistance = distance;
  const aMeter = await meterFractionGenerator(distance); // The fraction of the distance that represends a meter
  let persistentPathArray = [];

  const callback = async (location) => {
    const {
      coords: { latitude, longitude },
    } = location;

    const currentPosition = {
      latitude: latitude,
      longitude: longitude,
    };

    const distanceToEndPoint = await getDistanceBetween(
      currentPosition,
      pointB
    );
    const measureRegion = totalDistance - distanceToEndPoint;

    let isWithin20m = false;

    for (
      let i = -15 + measureRegion;
      i < 15 + measureRegion && isWithin20m === false;
      i++
    ) {
      const measurePoint = await getCoordinatesBetween(
        pointA,
        pointB,
        aMeter * i
      );

      const distanceBetweenMeasurePointAndCursor = await getDistanceBetween(
        measurePoint,
        currentPosition
      );

      if (distanceBetweenMeasurePointAndCursor > 20) {
        isWithin20m = false;
      }

      if (distanceBetweenMeasurePointAndCursor <= 20) {
        isWithin20m = true;
      }
    }

    let pathColor = "FFFFFF";

    if (isWithin20m === false) {
      pathColor = "#BE0000"; // Red
    }

    if (isWithin20m === true) {
      pathColor = "#29BB89"; // Green
    }
    let pathArray = [];

    pathArray = persistentPathArray.slice();

    const lastPosition =
      pathArray.length != 0 ? pathArray[pathArray.length - 1].path[1] : pointA;

    pathArray = pathArray.concat([
      {
        id: uuidv4(),
        path: [lastPosition, currentPosition],
        pathColor: pathColor,
      },
    ]);

    persistentPathArray = pathArray.slice();

    store.dispatch(currentPositionUpdate(currentPosition));
    store.dispatch(updatePath(pathArray));
  };

  watchPosition(callback);
}
