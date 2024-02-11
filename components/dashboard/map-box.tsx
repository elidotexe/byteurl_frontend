"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxComponent = ({ locations }: { locations: string[] }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.1278, 51.3909],
      zoom: 6,
      attributionControl: false,
    });

    const getCoordinates = (location: string) => {
      const [latitude, longitude] = location.split(",").map(Number);
      return [longitude, latitude];
    };

    const addMarkersToMap = async () => {
      for (const location of locations) {
        const coordinates = getCoordinates(location);
        if (coordinates) {
          new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
        }
      }
    };

    addMarkersToMap();

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-screen" />;
};

export default MapBoxComponent;
