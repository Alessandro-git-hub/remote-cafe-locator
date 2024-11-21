import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const PanToLocation = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);

  return null;
};

export default PanToLocation;
