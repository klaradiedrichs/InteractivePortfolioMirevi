import { create } from "zustand";

// const getRandomPosition = (min, max) => Math.random() * (max - min) + min;

const useGameStore = create((set) => ({

  shipPosition: { position: {}, rotation: {} },
  trashPositions:[],  
  tirePositions: [], 
  cupPositions: [],
  // Position eines Objektes zum Einfangen
  collectors: [],
  score: 0,
  timeLeft: 30,
  start: false,

  setStart: (start) => set({start}),
  setShipPosition: (newPosition) => set({ shipPosition: newPosition }),
  
  setTrashPositions: (newPositions) => set({ trashPositions: newPositions }),
  setTirePositions: (newPositions) => set({ tirePositions: newPositions }),
  setCupPositions: (newPositions) => set({ cupPositions: newPositions }),
  
  setCollectors: (newPositions) => set({ collectors: newPositions }),
  setScore: (newScore) => set({ score: newScore }),
  setTimeLeft: (setTimeLeft) => set({ score: setTimeLeft }),
}))

export default useGameStore;

