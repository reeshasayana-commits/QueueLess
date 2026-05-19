// src/components/PlaceMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Spinner, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import './PlaceMap.css';
import { useMap } from 'react-leaflet';

// Fix for default marker icons in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const PlaceMap = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axiosInstance.get('/admin/places-with-queues');
        setPlaces(response.data);
      } catch (err) {
        setError('Failed to load places');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!places.length) return <Alert variant="info">No places found</Alert>;

  // Center map on first place or default to India
  const getSafeLatLng = (loc) => {
    if (!loc || !Array.isArray(loc) || loc.length < 2) return null;
    let lng = Number(loc[0]);
    let lat = Number(loc[1]);
    if (isNaN(lng) || isNaN(lat)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return null;
    }
    return [lat, lng];
  };

  const center = (places[0]?.location && getSafeLatLng(places[0].location)) || [20.5937, 78.9629];

  const getMarkerSize = (total) => {
    if (total === 0) return 8;
    if (total < 5) return 12;
    if (total < 15) return 18;
    return 24;
  };

  const getMarkerColor = (total) => {
    if (total === 0) return '#3388ff'; // blue
    if (total < 5) return '#2ecc71'; // green
    if (total < 15) return '#f1c40f'; // yellow
    return '#e74c3c'; // red
  };

  function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    // Small delay to allow the container to become visible
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}
  return (
    <Card className="mb-4 place-map-card">
      <Card.Header>Geographic Heat Map Queue Load</Card.Header>
      <Card.Body style={{ height: 500 }}>
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
          <MapResizeHandler />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {places.map((place) => {
            const latLng = getSafeLatLng(place.location);
            return latLng && (
              <CircleMarker
                key={place.id}
                center={latLng}
                radius={getMarkerSize(place.totalActiveTokens)}
                fillColor={getMarkerColor(place.totalActiveTokens)}
                color="#000"
                weight={1}
                opacity={1}
                fillOpacity={0.6}
              >
                <Popup>
                  <strong>{place.name}</strong><br />
                  {place.address}<br />
                  <span style={{ color: '#27ae60' }}>Waiting: {place.waitingTokens}</span><br />
                  <span style={{ color: '#2980b9' }}>In Service: {place.inServiceTokens}</span><br />
                  <strong>Total: {place.totalActiveTokens}</strong>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </Card.Body>
    </Card>
  );
};

export default PlaceMap;