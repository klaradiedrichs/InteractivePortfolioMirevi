import { useState , useEffect} from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sparkles, Stage, KeyboardControls,PointerLockControls, Environment} from "@react-three/drei";
import Ground from './Ground';
import Overlay from './Overlay';
import Room from './old/Room';
import { useSpring, a } from '@react-spring/three';
import { Perf } from 'r3f-perf';
import Experience from './Experience1';
import DemoWall from './Walls/DemoWall';
import WallExperience from './Walls/WallExperience';
import { CuboidCollider,Debug,Physics,RigidBody} from "@react-three/rapier";
import { PlayerTest } from './Walls/PlayerTest';
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
        <Canvas shadows camera={{ fov: 45 }}>
              {/* <Perf position='top-right'/> */}
              <Experience setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad}/>
              {/* <ambientLight intensity={0.5} /> */}
              {/* <Room cameraRoad={cameraRoad}/> */}
        </Canvas>
        </KeyboardControls>
        <Overlay cameraRoad={cameraRoad}  onToggleCameraRoad={handleToggleCameraRoad} backToStart={backToStart} handleStart={handleStart}/>
        
    </>
      
  )
}

export default App