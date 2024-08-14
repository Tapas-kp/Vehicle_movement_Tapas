import React, { useState } from "react";
import Map from "./components/Map.jsx";
import Routing from "./components/Routing.jsx";
import VehicleMarker from "./components/VehicleMarker.jsx";

const App = () => {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState([]);
  const [endAddress, setEndAddress] = useState("");

  return (
    <div>
      <Map setMap={setMap} />
      {map && (
        <>
          <Routing map={map} onRouteFound={setRoute} />
          <VehicleMarker map={map} route={route} setEndAddress={setEndAddress} />
        </>
      )}
      <p>End Address: {endAddress}</p>
    </div>
  );
};

export default App;
