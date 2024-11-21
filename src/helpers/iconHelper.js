import L from 'leaflet';

export const getDynamicIcon = (iconUrl, zoomLevel) => {
  const baseSize = 5;
  const size = baseSize + zoomLevel * 2
  return L.icon({
    iconUrl,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size / 2],
  });
};
