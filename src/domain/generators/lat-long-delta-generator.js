import { ASPECT_RATIO } from "../resources/environment/dimensions";

export async function getLatLongDeltaBasedOn(distance) {
  const a = distance / 1000;
  const newLatDelta = a / 70;
  const newLongDelta = newLatDelta * ASPECT_RATIO;

  return { latitudeDelta: newLatDelta, longitudeDelta: newLongDelta };
}
