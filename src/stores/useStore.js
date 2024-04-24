// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  active: null,
  clickedFrame: null,
  hovered: null,
  setHovered: (hovered) => set({ hovered }),
  setClickedFrame: (frame) => set({ clickedFrame: frame }),
  setActive: (active) => set({ active }),
  wdrExperienceScene: false,
  setWdrExperienceScene: (wdrExperienceScene) => set({ wdrExperienceScene }), // fixed
  gameScene: false,
  setGameScene: (gameScene) => set({ gameScene }),
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));

export { useStore };