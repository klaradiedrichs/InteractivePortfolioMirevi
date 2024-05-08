
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useState , useEffect} from 'react'
import './App.css'
import {Canvas, useThree, useFrame} from "@react-three/fiber";
import {KeyboardControls, Environment, PerspectiveCamera, ScrollControls} from "@react-three/drei";
import Overlay from './UI/Overlay';
import { Perf } from 'r3f-perf';
import Experience from './Road/Experience2';
import WallExp from './Walls/WallsExp';
import WDRScene from './wdr/WDRScene';
import GenerationSpeaks from './wdr/GenerationSpeaks';
import Fraktale from './Fraktale/Fraktale';
import {useStore} from './stores/useStore';
function App() {

  const [isScene1Visible, setScene1Visible] = useState(true);
  const [backToStart, setBackToStart] = useState(false);
  const active = useStore((state) => state.active);
  const scrollBarColor = useStore((state) => state.scrollBarColor);
  const cameraRoad = useStore((state) => state.cameraRoad);

  const handleStart = () => {
    setBackToStart(true);
  }

  useEffect(() => {
    const scrollbar = document.documentElement.style;

    const toggleScrollbarHeight = (isActive) => {
        if (isActive) {
          // scrollbar.setProperty('--scrollbar-width', '0px');
        
        }
        else if (cameraRoad == false) {
          scrollbar.setProperty('--scrollbar-width', '0px');
          
        } 
        else if(scrollBarColor === true){
          scrollbar.setProperty('--thumbColor','#950abc')
        }
        else {
          scrollbar.removeProperty('--scrollbar-width');
          scrollbar.removeProperty('--thumbColor');
        }
    }

    toggleScrollbarHeight(active);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'active') {
                toggleScrollbarHeight(mutation.target.getAttribute('active') !== null);
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [active,scrollBarColor]);


  return (
    <>
        <KeyboardControls map={ [
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
        { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
        { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    ] }>
        <Overlay backToStart={backToStart} /> 
        <Canvas shadows>
              {/* <Perf position='top-right'/> */}
              <ScrollControls pages={10} damping={0.5 } >
                <Experience setBackToStart={setBackToStart} backToStart={backToStart}/>
              </ScrollControls>
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
