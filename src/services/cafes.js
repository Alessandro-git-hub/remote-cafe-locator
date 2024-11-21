import { supabase } from './supabase';

// Fetch approved cafés from Supabase
export const fetchApprovedCafes = async () => {
  const { data, error } = await supabase
    .from('cafes')
    .select('*')
    .eq('approved', true);

  if (error) {
    console.error('Error fetching cafés:', error);
    return [];
  }

  return data.map((cafe) => ({
    id: cafe.id,
    name: cafe.name,
    position: [cafe.latitude, cafe.longitude],
    address: cafe.address,
    amenities: cafe.amenities,
  }));
};

// Fetch nearby cafés (future implementation)
export const fetchNearbyCafes = async (latitude, longitude, radius) => {
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