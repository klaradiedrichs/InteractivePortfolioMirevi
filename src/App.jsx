
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useState , useEffect} from 'react'
import './App.css'
import {Canvas, useThree, useFrame} from "@react-three/fiber";
import {KeyboardControls, Environment, PerspectiveCamera} from "@react-three/drei";
import Overlay from './UI/Overlay';
import { Perf } from 'r3f-perf';
import Experience from './Road/Experience2';
import WallExp from './Walls/WallsExp';
import WDRScene from './wdr/WDRScene';
import GenerationSpeaks from './wdr/GenerationSpeaks';
import Fraktale from './Fraktale/Fraktale';
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
        <KeyboardControls map={ [
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
        { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
        { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    ] }>
        <Overlay cameraRoad={cameraRoad} onToggleCameraRoad={handleToggleCameraRoad} backToStart={backToStart} handleStart={handleStart}/> 
        <Canvas shadows>
              {/* <Perf position='top-right'/> */}
              <Experience setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad}/>
              {/* <WallExp /> */}
              {/* <WDRScene /> */}
              {/* <Fraktale /> */}
              {/* <GenerationSpeaks/> */}
        </Canvas>
        </KeyboardControls>
    </>
  )
}

export default App



// function Scene() {
//   const cameraRef = useRef();
 

//   return (
//     <>
//       <ambientLight intensity={0.6} />
//       <hemisphereLight args={[0xffffbb, 0x080820, 0.7]} />

//       <spotLight position={[4, 7, 23]} intensity={0.5} />
//       <spotLight position={[4, 7, -23]} intensity={0.5} />

//       <mesh>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshLambertMaterial color={0x00ff00} />
//       </mesh>
//       <Run />
//         <Runback />

//       <OrbitControls ref={cameraRef} />
//       <PerspectiveCamera ref={cameraRef} fov={45} near={0.1} far={10000} />
//     </>

//   );
// }

// function App() {
//   return (
//     <Canvas
//       style={{ background: 'transparent' }}
//       camera={{ position: [-1.57, -1.95, 1.64], fov: 45 }}
//     >
//       <Scene />
//     </Canvas>
//   );
// }

// export default App;
