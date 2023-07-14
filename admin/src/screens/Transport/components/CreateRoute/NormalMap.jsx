import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const Map = ({ height, width, coordinates, setCoorinates }) => {
  const truckLocation = [81.06236022126376, 6.977761787380842];
  const warehouseLocation = truckLocation;
  const lastAtRestaurant = 0;
  let keepTrack = [];
  const pointHopper = {};

  const map = useRef(null);
  const mapContainer = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoibXNtb3ZpZWNsaXBzIiwiYSI6ImNsZWdyeTc1YzA3NjIzdG1ydGt0OXhqeGoifQ.bka91gSkRcIKvxSrhD7UVQ";

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/msmovieclips/clegvszzf002o01pgf0i6rtai",
      center: [81.06255194277624, 6.978028076955467],
      pitch: 40,
      zoom: 17,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const warehouse = turf.featureCollection([turf.point(warehouseLocation)]);
    // Create an empty GeoJSON feature collection for drop off locations
    const dropoffs = turf.featureCollection([]);
    // Create an empty GeoJSON feature collection, which will be used as the data source for the route before users add any new data
    const nothing = turf.featureCollection([]);

    map.current.on("load", async () => {
      const marker = document.createElement("div");
      marker.classList = "marker";
      marker.style.width = "20px";
      marker.style.height = "20px";
      marker.style.border = "2px solid #fff";
      marker.style.borderRadius = "50%";
      marker.style.background = "#3887be";

      const popup = new mapboxgl.Popup({ offset: 25 }).setText("Factory");

      new mapboxgl.Marker(marker)
        .setLngLat(warehouseLocation)
        .setPopup(popup)
        .addTo(map.current);

      // Create a circle layer
      map.current.addLayer({
        id: "warehouse",
        type: "circle",
        source: {
          data: warehouse,
          type: "geojson",
        },
        paint: {
          "circle-radius": 20,
          "circle-color": "white",
          "circle-stroke-color": "#3887be",
          "circle-stroke-width": 3,
        },
      });

      map.current.addSource("route", {
        type: "geojson",
        data: nothing,
      });

      map.current.addLayer(
        {
          id: "routeline-active",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "red",
            "line-width": ["interpolate", ["linear"], ["zoom"], 12, 3, 22, 12],
          },
        },
        "waterway-label"
      );

      map.current.addLayer(
        {
          id: "routearrows",
          type: "symbol",
          source: "route",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160,
            ],
            "text-keep-upright": false,
          },
          paint: {
            "text-color": "red",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3,
          },
        },
        "waterway-label"
      );
      // Listen for a click on the map
      await map.current.on("click", addWaypoints);
      // addWaypoints();

      return () => {
        map.current.remove();
      };
    });

    async function addWaypoints(event) {
      // When the map is clicked, add a new drop off point
      // and update the `dropoffs-symbol` layer
      await newDropoff(coordinates[coordinates.length - 1]);

      updateDropoffs(dropoffs);
    }

    async function newDropoff(coordinate) {
      // Store the clicked point as a new GeoJSON feature with
      // two properties: `orderTime` and `key`
      const pt = turf.point([coordinate.lng, coordinate.lat], {
        orderTime: Date.now(),
        key: Math.random(),
      });
      dropoffs.features.push(pt);
      // console.log(JSON.stringify(dropoffs));
      pointHopper[pt.properties.key] = pt;

      // Make a request to the Optimization API
      // console.log(typeof assembleQueryURL());
      const query = await fetch(assembleQueryURL(), { method: "GET" });
      const response = await query.json();
      console.log(JSON.stringify(response.trips[0].geometry.coordinates));

      setCoorinates(JSON.stringify(response.trips[0].geometry.coordinates));

      // Create an alert for any requests that return an error
      if (response.code !== "Ok") {
        const handleMessage =
          response.code === "InvalidInput"
            ? "Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors"
            : "Try a different point.";
        alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
        // Remove invalid point
        dropoffs.features.pop();
        delete pointHopper[pt.properties.key];
        return;
      }

      // Create a GeoJSON feature collection
      const routeGeoJSON = turf.featureCollection([
        turf.feature(response.trips[0].geometry),
      ]);

      // Update the `route` source by getting the route source
      // and setting the data equal to routeGeoJSON
      map.current.getSource("route").setData(routeGeoJSON);
    }

    function updateDropoffs(geojson) {
      map.current.getSource("dropoffs-symbol").setData(geojson);
    }

    // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
    function assembleQueryURL() {
      // Store the location of the truck in a variable called coordinates
      const coordinates = [truckLocation];
      const distributions = [];
      let restaurantIndex;
      keepTrack = [truckLocation];

      // Create an array of GeoJSON feature collections for each point
      const restJobs = Object.keys(pointHopper).map((key) => pointHopper[key]);

      // If there are actually orders from this restaurant
      if (restJobs.length > 0) {
        // Check to see if the request was made after visiting the restaurant
        const needToPickUp =
          restJobs.filter((d) => d.properties.orderTime > lastAtRestaurant)
            .length > 0;

        // If the request was made after picking up from the restaurant,
        // Add the restaurant as an additional stop
        if (needToPickUp) {
          restaurantIndex = coordinates.length;
          // Add the restaurant as a coordinate
          coordinates.push(warehouseLocation);
          // push the restaurant itself into the array
          keepTrack.push(pointHopper.warehouse);
        }

        for (const job of restJobs) {
          // Add dropoff to list
          keepTrack.push(job);
          coordinates.push(job.geometry.coordinates);
          // if order not yet picked up, add a reroute
          if (needToPickUp && job.properties.orderTime > lastAtRestaurant) {
            distributions.push(`${restaurantIndex},${coordinates.length - 1}`);
          }
        }
      }

      // Set the profile to `driving`
      // Coordinates will include the current location of the truck,
      return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
        ";"
      )}?distributions=${distributions.join(
        ";"
      )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
        mapboxgl.accessToken
      }`;
    }
  }, [coordinates]);

  return <div ref={mapContainer} style={{ height: height, width: width }} />;
};

export default Map;
