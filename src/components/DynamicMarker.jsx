import { Marker, Popup } from 'react-leaflet';
import { getDynamicIcon } from '../helpers/iconHelper';

const DynamicMarker = ({ cafe, zoomLevel, iconUrl }) => {
  return (
    <Marker position={cafe.position} icon={getDynamicIcon(iconUrl, zoomLevel)}>
      <Popup>
        <strong>{cafe.name}</strong>
        <br />
        {cafe.address}
        <br />
        Amenities: {cafe.amenities?.wifi ? 'Wi-Fi' : 'No Wi-Fi'}
      </Popup>
    </Marker>
  );
};

export default DynamicMarker;
