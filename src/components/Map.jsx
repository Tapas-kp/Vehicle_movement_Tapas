import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ setMap }) => {
  useEffect(() => {
    const mapInstance = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance);
    
    return () => {
      mapInstance.remove();
    };
  }, [setMap]);

  return <div id="map" style={{ height: "100vh" }}></div>;
};

export default Map;
