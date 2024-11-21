import { useMapEvents } from 'react-leaflet';

const MapEventHandler = ({ setZoomLevel }) => {
  useMapEvents({
    zoomend: (e) => {
      setZoomLevel(e.target.getZoom());
    },
  });
  return null;
};


export default MapEventHandler;
