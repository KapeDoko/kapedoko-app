// composites/useCafes.ts
export const useCafes = () => {
  const fetchNearbyCafes = async (lat: number, lng: number) => {
    // Queries OSM for 'amenity=cafe' within 3000 meters
    const query = `
      [out:json];
      node["amenity"~"cafe|coffee_shop"](around:3000, ${lat}, ${lng});
      out body;
    `;
    
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    
    const data = await response.json();
    return data.elements; // Returns list of cafes with tags (name, etc)
  };

  return { fetchNearbyCafes };
}