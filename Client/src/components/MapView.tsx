import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Use CDN images so Vite doesn't need special loaders
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

type Props = {
  center?: [number, number];
  zoom?: number;
  markers?: { id: string; position: [number, number]; label?: string }[];
};

const MapView: React.FC<Props> = ({ center = [11.0168, 76.9558], zoom = 12, markers = [] }) => {
  return (
    <div className="card h-[75vh]">
      <MapContainer center={center} zoom={zoom} className="h-full rounded-xl z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position} icon={defaultIcon}>
            {m.label && <Popup>{m.label}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
