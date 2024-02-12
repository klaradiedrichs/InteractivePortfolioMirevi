import {
CameraControls,
    Environment,
    MeshPortalMaterial,
    RoundedBox,
    Text,
    useCursor,
    useTexture, OrbitControls
  } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Frame = ({children,name,active,spherePos, setActive,...props}) => {
  
  // const map = useTexture("textures/modern_buildings_2_2k.hdr");
  // const spherePos = [position[0], position[1], position[2] + 0.1]; // Adjust the offset as needed
  const [hovered,setHovered] = useState(false)

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
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <planeGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

       {/* 
       wird angezeigt/gerendert, onHover (oder andere Option -> onClick etc ...)  
       */}
      {hovered && 
      <RoundedBox onDoubleClick={() => setActive(active === name ? null : name)}
          args={[8,4.5,0.1]}>
          
          <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0 }>
              <ambientLight intensity={0.5} />
              <Environment files="./modern_buildings_2_2k.hdr" background ></Environment>
          </MeshPortalMaterial>
      </RoundedBox>
      }
    </group>
    )
  
};

  export default Frame; 
  