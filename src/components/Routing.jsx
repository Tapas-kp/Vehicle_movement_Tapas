import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const Routing = ({ map, onRouteFound }) => {
  useEffect(() => {
    if (!map) return;

    const start = L.latLng(51.505, -0.09);
    const end = L.latLng(51.52, -0.12);

    const control = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: true,
      createMarker: () => null, // Hide default markers
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
      },
      altLineOptions: null, // Disable alternative route
    }).addTo(map);

    control.on("routesfound", (e) => {
      onRouteFound(e.routes[0].coordinates);
    });

    return () => map.removeControl(control);
  }, [map, onRouteFound]);

  return null;
};

export default Routing;
