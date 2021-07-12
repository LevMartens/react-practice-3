import * as SecureStore from "expo-secure-store";

import React, { Component } from "react";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("api key " + result);
    return result;
  } else {
    console.log("NO api key found");
  }
}
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function getPluscode() {
  save("google-api-key", "...");

  const apiKey = await getValueFor("google-api-key");
  const response = await fetch(
    // Make this YOUR URL
    `https://plus.codes/api?address=4QFFFFFF%2BFF&ekey=${apiKey}&email=lmartens_43@hotmail.com`,
    {}
  );
  const json = await response.json();
  console.log("PLUS CODE COORD  " + JSON.stringify(json));
}
