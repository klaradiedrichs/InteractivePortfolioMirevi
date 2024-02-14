import {
CameraControls,
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text, Stage,
    useCursor,
    useTexture, OrbitControls, Html
  } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";

const Frame = ({children,name,color, active,spherePos, setActive,...props}) => {
  
  // const map = useTexture("textures/modern_buildings_2_2k.hdr");
  // const spherePos = [position[0], position[1], position[2] + 0.1]; // Adjust the offset as needed
  const [hovered,setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleRoundedBoxDoubleClick = () => {
    setClicked(true)
    setActive(active === name ? null : name);
  };
  const handleBackClick = () => {
    setClicked(true)
    setActive(active === name ? null : name);
  };
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (hovered === true) {
      easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.25, delta);
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
       
      {!clicked && 
        <>
        {/* Titel */}
        <Text font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.3} position={[0, -2, 0.21]} anchorY={"bottom"}>
          {name}
          <meshBasicMaterial color={color} toneMapped={false} />
        </Text>
        {/* Buttons */}
        <mesh onClick={handleRoundedBoxDoubleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[0, 3, 0]}>
            <Button text="EXPLORE" color="grey" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>
        {/* Fenster für Video: */}
        <RoundedBox args={[8,4.5,0.2]} radius={0.2}>
          {/* hier wird Video Texture sein */}
          <meshPhongMaterial color="#DDBAC7" />
        </RoundedBox>
        </>
      }

      {/* Fenster für Portal: */}
      {hovered && 
      <RoundedBox 
          args={[7,3.5,0.2]} position-z={0.1}>
          <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
              <ambientLight intensity={0.5} />
              <OrbitControls />
              <Environment preset="sunset" background blur={0.5}></Environment>
              {/* <Html onClick={handleBackClick}>Back</Html> */}
              {/*Individuelle Objekte */}
              {children}
          </MeshPortalMaterial>
      </RoundedBox>
      }
    </group>
    )
  
};

  export default Frame; 
  