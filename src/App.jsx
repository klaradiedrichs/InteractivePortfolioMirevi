import { useState } from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import Experience from './Experience';
import Ground from './Ground';

function App() {
  const [count, setCount] = useState(0)

  return (
// tailwind css usage
    <div className={'absolute w-full h-screen p-0 top-0 left-0'}> 
      <div className={'h-full p-0 '}>
      <div className={"text-white text-4xl italic font-light z-40 p-1"}>MIREVI - Mixed Reality & Visualization </div>
        <Canvas shadows >
            <Experience />
        </Canvas>
      </div>
    </div>
  )
}

export default App