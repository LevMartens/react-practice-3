import React from "react";
import renderer from "react-test-renderer";
import { createLineDraft } from "../create-line-draft";
import { API, graphqlOperation } from "aws-amplify";
import { deleteLineDrafts } from "../../../mutations";

test("if line draft is created correctly", async () => {
  const Melbourne = {
    latitude: -37.840935,
    longitude: 144.946457,
  };

  const Carlton = {
    latitude: -37.794932,
    longitude: 144.973475,
  };

  const lineDraft = await createLineDraft(Melbourne, Carlton, "Test Title");

  const {
    id,
    isLoaded,
    rawLineData,
    imageSelected,
    image,
    markerCoordinates,
    markerRegion,
    markerRegionZoomedIn,
  } = lineDraft;
  console.log("TEST: gtr " + id);
  expect(id).not.toBeNull();
  expect(id).not.toBeUndefined();

  API.graphql(
    graphqlOperation(deleteLineDrafts, {
      input: id,
    })
  );
});
