import { useState , useEffect} from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sparkles, Stage} from "@react-three/drei";
import Ground from './Ground';
import Overlay from './Overlay';
import Room from './Room';
import { useSpring, a } from '@react-spring/three';
import { Perf } from 'r3f-perf';
import Experience from './Experience1';

function App() {

  const [cameraRoad, setCameraRoad] = useState(true);
  const [isScene1Visible, setScene1Visible] = useState(true);
  const [backToStart, setBackToStart] = useState(false)

  const handleToggleCameraRoad = () => {
    setCameraRoad((prev) => !prev);
  };
  const handleButtonClick = () => {
    setScene1Visible(!isScene1Visible);
  };
  

  const handleStart = () => {
    setBackToStart(true);
  }

  return (
    <>
        <Canvas shadows>
        <Perf position='top-right'/>
             <Experience setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad}/>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <Room cameraRoad={cameraRoad}/> */}
        </Canvas>
        <Overlay cameraRoad={cameraRoad}  onToggleCameraRoad={handleToggleCameraRoad} backToStart={backToStart} handleStart={handleStart}/>
        
    </>
      
  )
}

export default App