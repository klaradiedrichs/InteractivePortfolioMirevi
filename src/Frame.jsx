import {
CameraControls,
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text,
    useCursor,
    useTexture, OrbitControls, Html
  } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Frame = ({children,name,active,spherePos, setActive,...props}) => {
  
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

  return( 
    <group {...props}>
      {/* Position abhängig von Framne */}
      <Text font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
          {name}
      </Text>
      {/* 
      Plane die am Anfang angezeigt wird
      muss als texture Übergabeparameter bekommen (in Experience)
       */}
       
      {!clicked && 
      <mesh scale-x={8} scale-y={4.5} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <planeGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      }

       {/* 
       wird angezeigt/gerendert, onHover (oder andere Option -> onClick etc ...)  
       */}
      {hovered && 
      <RoundedBox onDoubleClick={handleRoundedBoxDoubleClick}
          args={[8,4.5,0.1]}>
          
          <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0 }>
              <ambientLight intensity={0.5} />
              <OrbitControls />
              <Environment files="./modern_buildings_2_2k.hdr" background ></Environment>
              {/* <Html onClick={handleBackClick}>Back</Html> */}
          </MeshPortalMaterial>
      </RoundedBox>
      }
    </group>
    )
  
};

  export default Frame; 
  