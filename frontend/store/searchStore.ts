import { create } from 'zustand';

interface SearchStore {
  pendingQuery: string | null;
  setPendingQuery: (query: string | null) => void;
  clearPendingQuery: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  pendingQuery: null,
  setPendingQuery: (query) => set({ pendingQuery: query }),
  clearPendingQuery: () => set({ pendingQuery: null }),
}));
