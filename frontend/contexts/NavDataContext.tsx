'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Area {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  logo?: string;
}

interface NavData {
  areas: Area[];
  developers: Developer[];
  loading: boolean;
}

const NavDataContext = createContext<NavData>({
  areas: [],
  developers: [],
  loading: true,
});

export function NavDataProvider({ children }: { children: ReactNode }) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNavData() {
      try {
        // Fetch areas and developers in parallel
        const [areasRes, developersRes] = await Promise.all([
          fetch(`${API_URL}/api/areas`),
          fetch(`${API_URL}/api/developers`),
        ]);

        if (areasRes.ok) {
          const areasData = await areasRes.json();
          if (areasData.success && areasData.data) {
            // Get top 5 areas for navbar (you can adjust the limit)
            setAreas(areasData.data.slice(0, 5));
          }
        }

        if (developersRes.ok) {
          const developersData = await developersRes.json();
          if (developersData.success && developersData.data) {
            // Get top 4 developers for navbar
            setDevelopers(developersData.data.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching nav data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNavData();
  }, []);

  return (
    <NavDataContext.Provider value={{ areas, developers, loading }}>
      {children}
    </NavDataContext.Provider>
  );
}

export function useNavData() {
  return useContext(NavDataContext);
}
