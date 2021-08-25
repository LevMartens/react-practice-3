import { getElevation } from "./src/domain/resources/api/get-elevation";
const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

export let arr = [];
export async function gt() {
  const t = await getElevation(Melbourne, Carlton);

  let ar = [];
  t.map((x) => {
    console.log(" A " + x.elevation);
    const r = x.elevation.toFixed(1);
    console.log(" B " + r);
    ar.push(r);
  });
  console.log(" C " + ar);
  arr = ar;
  console.log("L " + arr);
}
