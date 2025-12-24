import { create } from "zustand";

const initialState = {
  bear: 0,
};

const useBearStore = create((set) => ({
  ...initialState,
  removeAllBears: () => set({ bear: 0 }),
  updateBears: (bearCount: number) => set({ bear: bearCount }),
}));
