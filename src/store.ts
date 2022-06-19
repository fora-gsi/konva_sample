import create from "zustand";

type AppState = {
  width: number;
  height: number;
  setSize: (width: number, height: number) => void;

  imageWidth: number;
  imageHeight: number;
  setImageSize: (size: { width: number; height: number }) => void;

  scale: number;
  setScale: (scale: number) => void;

  isDrawing: boolean;
  toggleIsDrawing: () => void;

  regions: [];
  setRegions: (regions: any) => void;

  selectedRegionId: string | null;
  selectRegion: (selectedRegionId: string) => void;

  brightness: number;
  setBrightness: (brightness: number) => void;
};

export const useStore = create<AppState>((set) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: (width, height) => set({ width, height }),
  imageWidth: 100,
  imageHeight: 100,
  setImageSize: (size) =>
    set(() => ({ imageWidth: size.width, imageHeight: size.height })),
  scale: 1,
  setScale: (scale) => set({ scale }),
  isDrawing: false,
  toggleIsDrawing: () => set((state) => ({ isDrawing: !state.isDrawing })),

  regions: [],
  setRegions: (regions) => set((state) => ({ regions })),

  selectedRegionId: null,
  selectRegion: (selectedRegionId) => ({ selectedRegionId }),

  brightness: 0,
  setBrightness: (brightness) => set({ brightness }),
}));
