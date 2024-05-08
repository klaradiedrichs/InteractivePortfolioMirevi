// useStore.js
import create from 'zustand';

const useStore = create((set) => ({
  cameraRoad: true,
  setCameraRoad: (cameraRoad) => set({cameraRoad}),
  clickedSpecificPoint: false,
  setClickedSpecificPoint: (clickedSpecificPoint) => set({clickedSpecificPoint}),
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
  scrollBarColor: false,
  setScrollBarColor: (scrollBarColor) => set({scrollBarColor})
}));

export { useStore };