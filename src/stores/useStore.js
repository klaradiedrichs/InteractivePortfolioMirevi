// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  active: null,
  clickedFrame: null,
  hovered: false,
  setHovered: (hovered) => set({ hovered }),
  setClickedFrame: (frame) => set({ clickedFrame: frame }),
  setActive: (active) => set({ active }),
}));

export { useStore };