import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  return (
    <MapContainer
      className="w-[100%] h-[40rem]"
      center={[12.505, -10.09]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://127.0.0.1:8000/tiles/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
