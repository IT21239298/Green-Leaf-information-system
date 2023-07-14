import { useEffect, useState } from "react";

const useGeoLocation = (frequency = 10000) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    let watcher = null;

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      watcher = navigator.geolocation.watchPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: frequency,
      });
    }

    return () => {
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [frequency]);

  return location;
};

export default useGeoLocation;
