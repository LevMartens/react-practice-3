import { ASPECT_RATIO } from "../resources/environment/dimensions";

export async function getLatLongDeltaBasedOn(distance) {
  const t = distance / 1000;
  const newLatDelta = t / 10 + 0.03;
  const newLongDelta = newLatDelta * ASPECT_RATIO;

  return { latitudeDelta: newLatDelta, longitudeDelta: newLongDelta };
}
