
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useState , useEffect} from 'react'
import './App.css'
import {Canvas} from "@react-three/fiber";
import {KeyboardControls, ScrollControls, Preload} from "@react-three/drei";
import Overlay from './UI/Overlay';
import Experience from './Road/Experience2';
import {useStore} from './stores/useStore';
function App() {

  const [backToStart, setBackToStart] = useState(false);
  const active = useStore((state) => state.active);
  const scrollBarColor = useStore((state) => state.scrollBarColor);
  const cameraRoad = useStore((state) => state.cameraRoad);

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
              <ScrollControls enabled={active === null ? true : false} pages={10} damping={0.5 } >
                <Experience setBackToStart={setBackToStart} backToStart={backToStart}/>
              </ScrollControls>
              <Preload all />

        </Canvas>
        <Overlay /> 

        </KeyboardControls>
    </>
  )
}

export default App


