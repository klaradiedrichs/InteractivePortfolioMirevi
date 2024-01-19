import { useState } from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sparkles, Stage} from "@react-three/drei";
import Experience from './Experience';
import Ground from './Ground';
import Overlay from './Overlay';
import Room from './Room';

function App() {

  const [cameraRoad, setCameraRoad] = useState(true);

  const handleToggleCameraRoad = () => {
    setCameraRoad((prev) => !prev);
  };

  return (
    <>
        <Canvas shadows>
             <Experience cameraRoad={cameraRoad}/>
            {/* <ambientLight intensity={0.5} /> */}
            {/* <Room cameraRoad={cameraRoad}/> */}
        </Canvas>
        <Overlay cameraRoad={cameraRoad} onToggleCameraRoad={handleToggleCameraRoad}/>
        
    </>
      
  )
}

export default App