import {
CameraControls,
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text, Stage,
    useCursor,
    useTexture, OrbitControls, Html, useVideoTexture
  } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useStore } from './stores/useStore';

import * as THREE from "three";

const Frame = ({children,name,color,spherePos,...props}) => {

  const setActive = useStore((state) => state.setActive);
  const setClickedFrame = useStore((state) => state.setClickedFrame);
  const active = useStore((state) => state.active);
  const clickedFrame = useStore((state) => state.clickedFrame);
  

  const [hovered,setHovered] = useState(false)
  // const [clicked, setClicked] = useState(false)

  // enter Portal: 
  const handleRoundedBoxDoubleClick = () => {
    setClickedFrame(name);
    setActive(active === name ? null : name);
  };

  const handleBackClick = () => {
    setHovered(false);
    setClicked(false);
    setActive(null);
  };

  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (hovered === true) {
      easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.4, delta);
      }
  });
  return( 
    <group {...props}>
      {/* Position relative zu Frame */}
      {/* Titel */}
      {/* 
      Plane die am Anfang angezeigt wird
      muss als texture Übergabeparameter bekommen (in Experience)
       */}
       
      {active === null && 
        <>
        {/* Infos */}
        <group position={[0,0,0.02]}>
          {/* <mesh scale={[2,4,0]} position-z={-0.01}>
            <planeGeometry/>
            <meshBasicMaterial color={"white"} opacity={0.2} transparent/>
          </mesh> */}
          {/*Titel  */}
          {/* <Text font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.3} position={[-0.4,0.8,0]}>
            {name}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text> */}
          {/* Jahr */}
          <Text fontSize={0.3} position={[-4.2, 3.55, 0]} anchorX={1}>
            {name}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text>

          {/* <Text fontSize={0.3} position={[-5.5,3,0]}>
            {name}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text>   */}
        </group>
        
        
        {/* Buttons */}
        <mesh onClick={handleRoundedBoxDoubleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} anchorY="bottom" position={[0, -3.8, 0]}>
            <Button text="EXPLORE" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>
        {/* Fenster für Poster: */}
        <RoundedBox onPointerOver={() => setHovered(false)} args={[11,6.7,0.2]} radius={0.2}>
          {/* hier wird Video Texture sein */}
          <meshPhongMaterial color="#DDBAC7" />
        </RoundedBox>
        </>
      }

      {/* Fenster für Portal: */}
      {hovered && (
      <>
      
      <RoundedBox
        args={[9.5, 5.5, 0.2]} position-z={0.1}>
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={0.5} />
          {/* <Environment preset="dawn" background blur={0.5}></Environment> */}
          {/*Individuelle Objekte */}
          {children}
        </MeshPortalMaterial>
      </RoundedBox>
      </>
      )}
    </group>
    )
  
};


  export default Frame; 
  