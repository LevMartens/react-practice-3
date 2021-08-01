import * as SecureStore from "expo-secure-store";

import React, { Component } from "react";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log("NO api key found " + JSON.stringify(result));
  }
}

export async function getPluscodeFromCoordinates(coordinates) {
  const apiKey = await getValueFor("google-API-key");
  const response = await fetch(
    `https://plus.codes/api?address=${coordinates}&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );
  const json = await response.json();

  if (json.plus_code.global_code != null) {
    console.log("Pluscode data is successfully fetched ");
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

  if (json.plus_code.geometry.location.lng != null) {
    console.log("Pluscode data is successfully fetched");
  }
  return json.plus_code.geometry.location;
}

// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }
