import React from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import { useEffect } from "react";
import axios from "axios";

const LiveLocation = () => {
  const { loaded, coordinates, error } = useGeoLocation();
  useEffect(() => {
    console.log(coordinates);

    if (coordinates.lat !== "" && coordinates.lng !== "")
      axios.post(
        "https://6444192390738aa7c07f095c.mockapi.io/api/locations",
        coordinates
      );
  }, [coordinates]);

  return (
    <div>
      <div>Loaded: {loaded.toString()}</div>
      <div>coordinates: {JSON.stringify(coordinates)}</div>
      <div>errors: {error}</div>
    </div>
  );
};

export default LiveLocation;
