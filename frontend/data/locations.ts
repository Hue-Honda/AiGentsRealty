// UAE Locations Database
// Organized by city with neighborhoods/areas and popular buildings

export interface Location {
  name: string;
  type: 'neighborhood' | 'building' | 'community';
  city: string;
  slug?: string;
}

export const uaeLocations: Record<string, Location[]> = {
  'Dubai': [
    // Premium Areas
    { name: 'Downtown Dubai', type: 'neighborhood', city: 'Dubai', slug: 'downtown-dubai' },
    { name: 'Dubai Marina', type: 'neighborhood', city: 'Dubai', slug: 'dubai-marina' },
    { name: 'Palm Jumeirah', type: 'neighborhood', city: 'Dubai', slug: 'palm-jumeirah' },
    { name: 'Business Bay', type: 'neighborhood', city: 'Dubai', slug: 'business-bay' },
    { name: 'DIFC', type: 'neighborhood', city: 'Dubai', slug: 'difc' },
    { name: 'Jumeirah Beach Residence (JBR)', type: 'neighborhood', city: 'Dubai', slug: 'jbr' },
    { name: 'Bluewaters Island', type: 'neighborhood', city: 'Dubai', slug: 'bluewaters' },
    { name: 'City Walk', type: 'neighborhood', city: 'Dubai', slug: 'city-walk' },

    // Popular Communities
    { name: 'Jumeirah Village Circle (JVC)', type: 'community', city: 'Dubai', slug: 'jvc' },
    { name: 'Jumeirah Village Triangle (JVT)', type: 'community', city: 'Dubai', slug: 'jvt' },
    { name: 'Dubai Hills Estate', type: 'community', city: 'Dubai', slug: 'dubai-hills' },
    { name: 'Arabian Ranches', type: 'community', city: 'Dubai', slug: 'arabian-ranches' },
    { name: 'Arabian Ranches 2', type: 'community', city: 'Dubai', slug: 'arabian-ranches-2' },
    { name: 'Arabian Ranches 3', type: 'community', city: 'Dubai', slug: 'arabian-ranches-3' },
    { name: 'Emirates Hills', type: 'community', city: 'Dubai', slug: 'emirates-hills' },
    { name: 'The Springs', type: 'community', city: 'Dubai', slug: 'the-springs' },
    { name: 'The Meadows', type: 'community', city: 'Dubai', slug: 'the-meadows' },
    { name: 'The Lakes', type: 'community', city: 'Dubai', slug: 'the-lakes' },
    { name: 'Damac Hills', type: 'community', city: 'Dubai', slug: 'damac-hills' },
    { name: 'Damac Hills 2', type: 'community', city: 'Dubai', slug: 'damac-hills-2' },
    { name: 'Town Square', type: 'community', city: 'Dubai', slug: 'town-square' },
    { name: 'Dubai South', type: 'community', city: 'Dubai', slug: 'dubai-south' },
    { name: 'MBR City', type: 'community', city: 'Dubai', slug: 'mbr-city' },
    { name: 'Meydan', type: 'community', city: 'Dubai', slug: 'meydan' },
    { name: 'Tilal Al Ghaf', type: 'community', city: 'Dubai', slug: 'tilal-al-ghaf' },

    // Established Areas
    { name: 'Al Barsha', type: 'neighborhood', city: 'Dubai', slug: 'al-barsha' },
    { name: 'Al Quoz', type: 'neighborhood', city: 'Dubai', slug: 'al-quoz' },
    { name: 'Jumeirah', type: 'neighborhood', city: 'Dubai', slug: 'jumeirah' },
    { name: 'Umm Suqeim', type: 'neighborhood', city: 'Dubai', slug: 'umm-suqeim' },
    { name: 'Al Sufouh', type: 'neighborhood', city: 'Dubai', slug: 'al-sufouh' },
    { name: 'Tecom', type: 'neighborhood', city: 'Dubai', slug: 'tecom' },
    { name: 'Barsha Heights', type: 'neighborhood', city: 'Dubai', slug: 'barsha-heights' },
    { name: 'Discovery Gardens', type: 'neighborhood', city: 'Dubai', slug: 'discovery-gardens' },
    { name: 'International City', type: 'neighborhood', city: 'Dubai', slug: 'international-city' },
    { name: 'Dubai Sports City', type: 'neighborhood', city: 'Dubai', slug: 'sports-city' },
    { name: 'Motor City', type: 'neighborhood', city: 'Dubai', slug: 'motor-city' },
    { name: 'Dubai Silicon Oasis', type: 'neighborhood', city: 'Dubai', slug: 'silicon-oasis' },
    { name: 'Academic City', type: 'neighborhood', city: 'Dubai', slug: 'academic-city' },
    { name: 'Dubai Production City', type: 'neighborhood', city: 'Dubai', slug: 'production-city' },
    { name: 'Dubai Investment Park', type: 'neighborhood', city: 'Dubai', slug: 'dip' },
    { name: 'Jebel Ali', type: 'neighborhood', city: 'Dubai', slug: 'jebel-ali' },
    { name: 'Al Furjan', type: 'neighborhood', city: 'Dubai', slug: 'al-furjan' },
    { name: 'Mudon', type: 'community', city: 'Dubai', slug: 'mudon' },
    { name: 'Remraam', type: 'community', city: 'Dubai', slug: 'remraam' },
    { name: 'Liwan', type: 'community', city: 'Dubai', slug: 'liwan' },

    // Creek & Old Dubai
    { name: 'Dubai Creek Harbour', type: 'neighborhood', city: 'Dubai', slug: 'creek-harbour' },
    { name: 'Deira', type: 'neighborhood', city: 'Dubai', slug: 'deira' },
    { name: 'Bur Dubai', type: 'neighborhood', city: 'Dubai', slug: 'bur-dubai' },
    { name: 'Al Karama', type: 'neighborhood', city: 'Dubai', slug: 'al-karama' },
    { name: 'Oud Metha', type: 'neighborhood', city: 'Dubai', slug: 'oud-metha' },
    { name: 'Al Garhoud', type: 'neighborhood', city: 'Dubai', slug: 'al-garhoud' },
    { name: 'Festival City', type: 'neighborhood', city: 'Dubai', slug: 'festival-city' },

    // Iconic Buildings (Downtown)
    { name: 'Burj Khalifa', type: 'building', city: 'Dubai' },
    { name: 'Address Downtown', type: 'building', city: 'Dubai' },
    { name: 'Address Boulevard', type: 'building', city: 'Dubai' },
    { name: 'Address Sky View', type: 'building', city: 'Dubai' },
    { name: 'The Address Residences', type: 'building', city: 'Dubai' },
    { name: 'Burj Vista', type: 'building', city: 'Dubai' },
    { name: 'Opera Grand', type: 'building', city: 'Dubai' },
    { name: 'Act One Act Two', type: 'building', city: 'Dubai' },
    { name: 'Boulevard Heights', type: 'building', city: 'Dubai' },
    { name: 'The Residences', type: 'building', city: 'Dubai' },

    // Marina Buildings
    { name: 'Cayan Tower', type: 'building', city: 'Dubai' },
    { name: 'Marina Gate', type: 'building', city: 'Dubai' },
    { name: 'Damac Heights', type: 'building', city: 'Dubai' },
    { name: 'Princess Tower', type: 'building', city: 'Dubai' },
    { name: '23 Marina', type: 'building', city: 'Dubai' },
    { name: 'Elite Residence', type: 'building', city: 'Dubai' },
    { name: 'Botanica Tower', type: 'building', city: 'Dubai' },

    // New Developments
    { name: 'Emaar Beachfront', type: 'neighborhood', city: 'Dubai', slug: 'emaar-beachfront' },
    { name: 'Port de La Mer', type: 'neighborhood', city: 'Dubai', slug: 'port-de-la-mer' },
    { name: 'La Mer', type: 'neighborhood', city: 'Dubai', slug: 'la-mer' },
    { name: 'Madinat Jumeirah Living', type: 'neighborhood', city: 'Dubai', slug: 'madinat-jumeirah-living' },
    { name: 'The Valley', type: 'community', city: 'Dubai', slug: 'the-valley' },
    { name: 'Rashid Yachts & Marina', type: 'neighborhood', city: 'Dubai', slug: 'rashid-marina' },
    { name: 'Dubai Islands', type: 'neighborhood', city: 'Dubai', slug: 'dubai-islands' },
    { name: 'The Oasis', type: 'community', city: 'Dubai', slug: 'the-oasis' },
  ],

  'Abu Dhabi': [
    { name: 'Yas Island', type: 'neighborhood', city: 'Abu Dhabi', slug: 'yas-island' },
    { name: 'Saadiyat Island', type: 'neighborhood', city: 'Abu Dhabi', slug: 'saadiyat-island' },
    { name: 'Al Reem Island', type: 'neighborhood', city: 'Abu Dhabi', slug: 'al-reem-island' },
    { name: 'Al Raha Beach', type: 'neighborhood', city: 'Abu Dhabi', slug: 'al-raha-beach' },
    { name: 'Corniche', type: 'neighborhood', city: 'Abu Dhabi', slug: 'corniche' },
    { name: 'Al Maryah Island', type: 'neighborhood', city: 'Abu Dhabi', slug: 'al-maryah-island' },
    { name: 'Khalifa City', type: 'neighborhood', city: 'Abu Dhabi', slug: 'khalifa-city' },
    { name: 'Mohamed Bin Zayed City', type: 'neighborhood', city: 'Abu Dhabi', slug: 'mbz-city' },
    { name: 'Al Reef', type: 'community', city: 'Abu Dhabi', slug: 'al-reef' },
    { name: 'Al Ghadeer', type: 'community', city: 'Abu Dhabi', slug: 'al-ghadeer' },
    { name: 'Masdar City', type: 'neighborhood', city: 'Abu Dhabi', slug: 'masdar-city' },
    { name: 'Al Shamkha', type: 'neighborhood', city: 'Abu Dhabi', slug: 'al-shamkha' },
    { name: 'Tourist Club Area', type: 'neighborhood', city: 'Abu Dhabi', slug: 'tourist-club' },
    { name: 'Al Bateen', type: 'neighborhood', city: 'Abu Dhabi', slug: 'al-bateen' },
    { name: 'Marina Village', type: 'neighborhood', city: 'Abu Dhabi', slug: 'marina-village' },
    { name: 'Hudayriyat Island', type: 'neighborhood', city: 'Abu Dhabi', slug: 'hudayriyat-island' },
  ],

  'Sharjah': [
    { name: 'Al Majaz', type: 'neighborhood', city: 'Sharjah', slug: 'al-majaz' },
    { name: 'Al Khan', type: 'neighborhood', city: 'Sharjah', slug: 'al-khan' },
    { name: 'Al Nahda', type: 'neighborhood', city: 'Sharjah', slug: 'al-nahda-sharjah' },
    { name: 'Al Taawun', type: 'neighborhood', city: 'Sharjah', slug: 'al-taawun' },
    { name: 'Muwaileh', type: 'neighborhood', city: 'Sharjah', slug: 'muwaileh' },
    { name: 'Al Mamzar', type: 'neighborhood', city: 'Sharjah', slug: 'al-mamzar-sharjah' },
    { name: 'Sharjah Waterfront City', type: 'community', city: 'Sharjah', slug: 'waterfront-city' },
    { name: 'Aljada', type: 'community', city: 'Sharjah', slug: 'aljada' },
    { name: 'Tilal City', type: 'community', city: 'Sharjah', slug: 'tilal-city' },
  ],

  'Ras al Khaimah': [
    { name: 'Al Hamra Village', type: 'community', city: 'Ras al Khaimah', slug: 'al-hamra-village' },
    { name: 'Mina Al Arab', type: 'community', city: 'Ras al Khaimah', slug: 'mina-al-arab' },
    { name: 'Al Marjan Island', type: 'neighborhood', city: 'Ras al Khaimah', slug: 'al-marjan-island' },
    { name: 'Julphar Towers', type: 'neighborhood', city: 'Ras al Khaimah', slug: 'julphar' },
    { name: 'Wynn Resort', type: 'neighborhood', city: 'Ras al Khaimah', slug: 'wynn-resort' },
  ],

  'Ajman': [
    { name: 'Al Nuaimia', type: 'neighborhood', city: 'Ajman', slug: 'al-nuaimia' },
    { name: 'Al Rashidiya', type: 'neighborhood', city: 'Ajman', slug: 'al-rashidiya-ajman' },
    { name: 'Ajman Downtown', type: 'neighborhood', city: 'Ajman', slug: 'ajman-downtown' },
    { name: 'Emirates City', type: 'community', city: 'Ajman', slug: 'emirates-city' },
    { name: 'Al Zorah', type: 'community', city: 'Ajman', slug: 'al-zorah' },
  ],

  'Fujairah': [
    { name: 'Fujairah City', type: 'neighborhood', city: 'Fujairah', slug: 'fujairah-city' },
    { name: 'Dibba', type: 'neighborhood', city: 'Fujairah', slug: 'dibba' },
    { name: 'Al Aqah', type: 'neighborhood', city: 'Fujairah', slug: 'al-aqah' },
  ],

  'Umm al Quwain': [
    { name: 'Umm Al Quwain Marina', type: 'neighborhood', city: 'Umm al Quwain', slug: 'uaq-marina' },
    { name: 'Al Salamah', type: 'neighborhood', city: 'Umm al Quwain', slug: 'al-salamah' },
  ],

  'Al Ain': [
    { name: 'Al Jimi', type: 'neighborhood', city: 'Al Ain', slug: 'al-jimi' },
    { name: 'Al Mutarad', type: 'neighborhood', city: 'Al Ain', slug: 'al-mutarad' },
    { name: 'Al Towayya', type: 'neighborhood', city: 'Al Ain', slug: 'al-towayya' },
    { name: 'Falaj Hazzaa', type: 'neighborhood', city: 'Al Ain', slug: 'falaj-hazzaa' },
    { name: 'Al Bateen', type: 'neighborhood', city: 'Al Ain', slug: 'al-bateen-alain' },
  ],
};

// Get all locations for a specific city or all cities
export function getLocations(city?: string): Location[] {
  if (!city || city === 'All Cities (UAE)') {
    return Object.values(uaeLocations).flat();
  }
  return uaeLocations[city] || [];
}

// Search locations with fuzzy matching
export function searchLocations(query: string, city?: string, limit: number = 10): Location[] {
  const locations = getLocations(city);
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return [];

  // Score-based matching
  const scored = locations.map(loc => {
    const name = loc.name.toLowerCase();
    let score = 0;

    // Exact match
    if (name === searchTerm) score = 100;
    // Starts with
    else if (name.startsWith(searchTerm)) score = 80;
    // Word starts with
    else if (name.split(' ').some(word => word.startsWith(searchTerm))) score = 60;
    // Contains
    else if (name.includes(searchTerm)) score = 40;
    // Fuzzy - contains all characters in order
    else {
      let searchIdx = 0;
      for (const char of name) {
        if (char === searchTerm[searchIdx]) {
          searchIdx++;
          if (searchIdx === searchTerm.length) {
            score = 20;
            break;
          }
        }
      }
    }

    // Boost neighborhoods over buildings
    if (loc.type === 'neighborhood') score += 5;
    if (loc.type === 'community') score += 3;

    return { location: loc, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.location);
}

// Get popular locations for a city (for suggestions)
export function getPopularLocations(city: string, limit: number = 6): Location[] {
  const popularByCity: Record<string, string[]> = {
    'Dubai': ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay', 'JVC', 'Dubai Hills Estate'],
    'Abu Dhabi': ['Yas Island', 'Saadiyat Island', 'Al Reem Island', 'Al Raha Beach', 'Corniche', 'Khalifa City'],
    'Sharjah': ['Al Majaz', 'Al Khan', 'Al Nahda', 'Aljada', 'Muwaileh', 'Sharjah Waterfront City'],
    'Ras al Khaimah': ['Al Marjan Island', 'Al Hamra Village', 'Mina Al Arab', 'Wynn Resort'],
    'Ajman': ['Al Nuaimia', 'Ajman Downtown', 'Al Zorah', 'Emirates City'],
  };

  const popular = popularByCity[city] || [];
  const locations = getLocations(city);

  return popular
    .map(name => locations.find(l => l.name.includes(name)))
    .filter((l): l is Location => l !== undefined)
    .slice(0, limit);
}
