import  { useEffect } from "react";
import L from "leaflet";


const VehicleMarker = ({ map, route, setEndAddress }) => {
  useEffect(() => {
    if (!map || route.length === 0) return;

    const vehicleIcon = L.icon({
      iconUrl: "car.png", 
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker(route[0], { icon: vehicleIcon }).addTo(map);
    const coveredPath = L.polyline([], { color: "red", weight: 3 }).addTo(map);
    let tooltip;
    let i = 0;

    function animateMarker() {
      if (i >= route.length) {
        const end = route[route.length - 1];
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${end.lat}&lon=${end.lng}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.display_name) {
              setEndAddress(data.display_name);

              if (tooltip) marker.unbindTooltip();
              marker.bindTooltip(data.display_name, {
                permanent: false,
                direction: "top",
                offset: [0, -16],
              });
            }
          })
          .catch((error) => console.error("Error fetching address:", error));
        return;
      }

      marker.setLatLng(route[i]);
      map.panTo(route[i]);
      coveredPath.addLatLng(route[i]);

      if (!tooltip) {
        tooltip = marker.bindTooltip(
          `Lat: ${route[i].lat.toFixed(5)}, Lng: ${route[i].lng.toFixed(5)}`,
          {
            permanent: false,
            direction: "top",
            offset: [0, -16],
          }
        );
      } else {
        tooltip.setTooltipContent(
          `Lat: ${route[i].lat.toFixed(5)}, Lng: ${route[i].lng.toFixed(5)}`
        );
      }

      i++;
      setTimeout(animateMarker, 40);
    }

    animateMarker();

    return () => {
      map.removeLayer(marker);
      map.removeLayer(coveredPath);
    };
  }, [map, route, setEndAddress]);

  return null;
};

export default VehicleMarker;
