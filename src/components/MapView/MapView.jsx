import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../services/supabase';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import SearchBar from '../SearchBar/SearchBar';
import cafes from '../../data/cafes';
import PanToLocation from '../PanToLocation';
import MapEventHandler from '../MapEventHandler';
import { getDynamicIcon } from '../../helpers/iconHelper';
import { fetchApprovedCafes } from '../../services/cafes';


const MapView = () => {
  const [mapCenter, setMapCenter] = useState([39.474551, -0.375458]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(16);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = [latitude, longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          // fetchNearbyCafes(latitude, longitude, 1000).then(setCafes);
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    }
  }, []);

  // // Fetch cafés whenever the map center changes
  // useEffect(() => {
  //   const [lat, lon] = mapCenter;
  //   fetchNearbyCafes(lat, lon, 1000).then(setCafes);
  // }, [mapCenter]);

  // Fetch cafés from the database on load
  useEffect(() => {
    const loadCafes = async () => {
      const approvedCafes = await fetchApprovedCafes();
      setCafes(approvedCafes);
    };

    loadCafes();
  }, []);

  const handleSearch = (coords, placeName) => {
    setMapCenter(coords);
    setSearchedPlace(placeName);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <SearchBar onSearch={handleSearch} />
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: '100%', height: '100%' }}>
      <MapEventHandler setZoomLevel={setZoomLevel} />
        <PanToLocation center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={getDynamicIcon('/icons/you-are-here.png', zoomLevel)}
          >
            <Popup>You are here!</Popup>
          </Marker>
        )}
        {searchedPlace && (
        <Marker 
          position={mapCenter}
          icon={getDynamicIcon('/icons/location.png', zoomLevel)}
        >
          <Popup>
            {searchedPlace ? `Searched Location: ${searchedPlace}` : 'You are here!'}
          </Popup>
        </Marker>
        )}
        {cafes.map((cafe) => (
          <Marker 
            key={cafe.id} 
            position={cafe.position} 
            icon={getDynamicIcon('../../../public/icons/coffee.png', zoomLevel)}
          >
            <Popup>
              <strong>{cafe.name}</strong>
              <br />
              {cafe.tags?.addr || 'No address available'}
              <br />
              Amenities: {cafe.amenities?.wifi ? 'Wi-Fi' : 'No Wi-Fi'}
              <br />
              Rating: {cafe.rating} ⭐️
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;