import React, { useEffect, useState } from "react";
import MapView from "../../components/MapView";
import { staffApi } from "../../api/staffApi";
import type { Report } from "../../types";

const StaffMapView: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    staffApi.myReports().then(setReports).catch(console.error);
  }, []);

  const markers = reports.map((r) => ({
    id: r.id,
    position: [r.locationCoords.lat, r.locationCoords.lng] as [number, number],
    label: `${r.type} • ${r.status}`
  }));

  return <MapView center={[11.0168, 76.9558]} zoom={12} markers={markers} />;
};

export default StaffMapView;
