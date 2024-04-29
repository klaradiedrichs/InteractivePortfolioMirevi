// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  active: null,
  clickedFrame: null,
  hovered: null,
  setHovered: (hovered) => set({ hovered }),
  
  idleVideo: true,
  setIdleVideo: (idleVideo) => set({ idleVideo }),
  setClickedFrame: (frame) => set({ clickedFrame: frame }),
  setActive: (active) => set({ active }),
 
  gameScene: false,
  setGameScene: (gameScene) => set({ gameScene }),
  generationSpeaks: false,
  setGenerationSpeaks: (generationSpeaks) => set({ generationSpeaks }),
  
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));

export { useStore };