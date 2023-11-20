import { useState } from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import Experience from './Experience';
import Ground from './Ground';
import Overlay from './Overlay';

function App() {

  const [cameraRoad, setCameraRoad] = useState(true);

  const handleToggleCameraRoad = () => {
    setCameraRoad((prev) => !prev);
  };

  return (
    <>
        <Canvas shadows>
          <Experience cameraRoad={cameraRoad}/>
        </Canvas>
        <Overlay cameraRoad={cameraRoad} onToggleCameraRoad={handleToggleCameraRoad}/>
        
    </>
      
  )
}

export default App