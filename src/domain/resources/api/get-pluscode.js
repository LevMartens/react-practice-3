import * as SecureStore from "expo-secure-store";

import React, { Component } from "react";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log(
      "ERROR: No api key found " +
        JSON.stringify(result) +
        ". source: get-pluscode.js"
    );
  }
}

export async function getPluscodeFromCoordinates(coordinates) {
  //save("google-API-key", "AIzaSyC9cUphfk3J0J49xMlj22QA3qAK9CUQ_U8");
  const apiKey = await getValueFor("google-API-key");
  const response = await fetch(
    `https://plus.codes/api?address=${coordinates}&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );
  const json = await response.json();

  if (json.plus_code.global_code == null) {
    console.log(
      "ERROR: Something went wrong fetching pluscodes with coordinates. source: get-pluscode.js"
    );
  }
  return json.plus_code.global_code;
}

export async function getCoordinesFromPluscode(pluscode) {
  const apiKey = await getValueFor("google-API-key");
  const response = await fetch(
    // Make this YOUR URL
    `https://plus.codes/api?address=${pluscode}&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );
  const json = await response.json();

  if (json.plus_code.geometry.location.lng == null) {
    console.log(
      "ERROR: Something went wrong fetching pluscodes with coordinates. source: get-pluscode.js"
    );
  }
  return json.plus_code.geometry.location;
}

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
