import { useState } from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import Experience from './Experience';
import Ground from './Ground';
import Overlay from './Overlay';

function App() {
  const [count, setCount] = useState(0)

  return (
// tailwind css usage
    <>
        <Canvas shadows>
          <Experience />
        </Canvas>
        <Overlay />
        
    </>
      
  )
}

export default App