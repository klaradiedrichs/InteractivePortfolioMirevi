
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

    
      if (active !== null) {
        scrollbar.setProperty('--scrollbar-width', '0px');
      }
      else if (cameraRoad === false || active !== null) {
        scrollbar.setProperty('--scrollbar-width', '0px');
        
      } 
      else if(scrollBarColor === true){
        scrollbar.setProperty('--thumbColor','#950abc')
      }
      else {
        scrollbar.removeProperty('--scrollbar-width');
        scrollbar.removeProperty('--thumbColor');
      }
    
  }, [active,scrollBarColor,cameraRoad]);


  return (
    <>
        <KeyboardControls map={ [
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
        { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
        { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    ] }>
        <Canvas shadows>
              {/* <Perf position='top-right'/> */}
              <ScrollControls enabled={active === null ? true : false} pages={10} damping={0.5 } >
                <Experience setBackToStart={setBackToStart} backToStart={backToStart}/>
              </ScrollControls>
              {/* <WallExp /> */}
              {/* <WDRScene /> */}
              {/* <Fraktale /> */}
              {/* <GenerationSpeaks/> */}
        </Canvas>
        <Overlay /> 

        </KeyboardControls>
    </>
  )
}

export default App
