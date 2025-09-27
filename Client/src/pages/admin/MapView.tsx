import React, { useEffect, useState } from "react";
import MapView from "../../components/MapView";
import { adminApi } from "../../api/adminApi";
import type { Report } from "../../types";

const AdminMapView: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    adminApi.listReports().then(setReports).catch(console.error);
  }, []);

  const markers = reports.map((r) => ({
    id: r.id,
    position: [r.locationCoords.lat, r.locationCoords.lng] as [number, number],
    label: `${r.type} • ${r.status}`
  }));

  return <MapView center={[11.0168, 76.9558]} zoom={12} markers={markers} />;
};

export default AdminMapView;
