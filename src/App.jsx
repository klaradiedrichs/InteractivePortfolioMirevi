import { useState } from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sparkles, Stage} from "@react-three/drei";
import Experience from './Experience';
import Ground from './Ground';
import Overlay from './Overlay';
import Room from './Room';
import { useSpring, a } from '@react-spring/three';
import { Perf } from 'r3f-perf';

function App() {

  const [cameraRoad, setCameraRoad] = useState(true);
  const [isScene1Visible, setScene1Visible] = useState(true);

  const handleToggleCameraRoad = () => {
    setCameraRoad((prev) => !prev);
  };
  const handleButtonClick = () => {
    setScene1Visible(!isScene1Visible);
  };
  
  return (
    <>
        <Canvas shadows>
        <Perf position='top-right'/>
             <Experience cameraRoad={cameraRoad}/>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <Room cameraRoad={cameraRoad}/> */}
        </Canvas>
        <Overlay cameraRoad={cameraRoad} onToggleCameraRoad={handleToggleCameraRoad}/>
        
    </>
      
  )
}

export default App