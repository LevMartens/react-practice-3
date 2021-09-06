import { apiKey } from "../../../../api-key";

export async function getPluscodeFromCoordinates(coordinates) {
  const response = await fetch(
    `https://plus.codes/api?address=${coordinates}&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );

  const {
    plus_code: { global_code },
  } = await response.json();

  if (global_code == null) {
    console.log(
      "ERROR: Something went wrong fetching pluscodes with coordinates. source: get-pluscode.js"
    );
  }
  return global_code;
}

export async function getCoordinesFromPluscode(pluscode) {
  const response = await fetch(
    `https://plus.codes/api?address=${pluscode}&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );
  const {
    plus_code: {
      geometry: { location },
    },
  } = await response.json();
  const { lng: latitude } = location;

  if (latitude == null) {
    console.log(
      "ERROR: Something went wrong fetching pluscodes with coordinates. source: get-pluscode.js"
    );
  }
  return location;
}
