import {
CameraControls,
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text,
    useCursor,
    useTexture,
  } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Frame = ({children,name,active,spherePos, setActive,...props}) => {
  
  const map = useTexture("textures/anime_art_style_a_water_based_pokemon_like_environ.jpg");
  // const spherePos = [position[0], position[1], position[2] + 0.1]; // Adjust the offset as needed

    return(
    <group {...props}>
      {/* Position abhängig von Framne */}
      <Text font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
          {name}
      </Text>
      
      <RoundedBox onDoubleClick={() => setActive(active === name ? null : name)}
          args={[8,4.5,0.1]}>
          <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0 }>
              <ambientLight intensity={0.5} />
              <Environment preset="night" background blur={0.4}></Environment>
              <mesh position={spherePos}>
                  <sphereGeometry args={[10,120,120]} />
                  <meshStandardMaterial map={map} side={THREE.BackSide} />
                  {children}
              </mesh>
          </MeshPortalMaterial>
      </RoundedBox>
    </group>
    )
  
};

  export default Frame; 
  