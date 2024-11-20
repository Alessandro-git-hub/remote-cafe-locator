import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import SearchBar from './SearchBar';
import cafes from '../data/cafes';

const getDynamicIcon = (iconUrl, zoomLevel) => {
  const size = zoomLevel * 3;
  return L.icon({
    iconUrl,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const PanToLocation = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  return null;
};

const fetchNearbyCafes = async (latitude, longitude, radius) => {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const query = `
    [out:json];
    (
      node["amenity"="cafe"](around:${radius},${latitude},${longitude});
    );
    out body;
  `;

  try {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      body: query,
    });

    const data = await response.json();
    return data.elements.map((element) => ({
      id: element.id,
      name: element.tags.name || 'Unknown Café',
      position: [element.lat, element.lon],
      tags: element.tags,
    }));
  } catch (error) {
    console.error('Error fetching nearby cafés:', error);
    return [];
  }
};


const MapView = () => {
  const [mapCenter, setMapCenter] = useState([39.474551, -0.375458]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = [latitude, longitude];
          setUserLocation(coords);
          setMapCenter(coords);
          fetchNearbyCafes(latitude, longitude, 1000).then(setCafes);
        },
        (error) => {
          console.error('Error detecting location:', error);
        }
      );
    }
  }, []);

  // Fetch cafés whenever the map center changes
  useEffect(() => {
    const [lat, lon] = mapCenter;
    fetchNearbyCafes(lat, lon, 1000).then(setCafes);
  }, [mapCenter]);

  // Detect zoom changes
  const MapEventHandler = () => {
    useMapEvents({
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
      },
    });
    return null;
  };

  const handleSearch = (coords, placeName) => {
    setMapCenter(coords);
    setSearchedPlace(placeName);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <SearchBar onSearch={handleSearch} />
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: '100%', height: '100%' }}>
      <MapEventHandler />
        <PanToLocation center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={getDynamicIcon('../../../public/icons/you-are-here.png', zoomLevel)}
          >
            <Popup>You are here!</Popup>
          </Marker>
        )}
        {searchedPlace && (
        <Marker 
          position={mapCenter}
          icon={getDynamicIcon('../../../public/icons/location.png', zoomLevel)}
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
              Rating: {cafe.rating} ⭐️
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;