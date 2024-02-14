import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture, Sparkles
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";

import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import PlayerNew from './PlayerNew';


export default function Experience({cameraRoad}) {
  const [active, setActive] = useState(null);
  // const [hovered, setHovered] = useState(null);
  // useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" background blur={0.6} />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <group>
            <Sparkles
                    size={ 10 }
                    scale={ [ 250, 25, 60 ] }
                    position={ [50, 5,-100] }
                    rotation={[0, -Math.PI / -3.2, 0]}
                    speed={ 0.9 }
                    count={ 250 }
            />
        </group>

      <Frame
        name="Fish King"
        color="#38adcf"
        position-x={-2.5}
        active={active}
        setActive={setActive}
      >
      </Frame>
      <Frame 
        position={[0,2.5,-8]} 
        name="Fraktale" 
        color="#38adcf" 
        active={active} 
        setActive={setActive}> 
      </Frame>
      {active === null && <PlayerNew cameraRoad={cameraRoad} />}

    </>
  );
};


const Frame = ({children,name,color,active,setActive,...props}) => {
  
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

  // const map = useTexture("textures/modern_buildings_2_2k.hdr");
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (hovered === true) {
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.4, delta);
    }
  });

  return (
    <group {...props}>

      {!clicked && 
      <>
        <Text 
          font="fonts/PlayfairDisplay-Regular.ttf" 
          fontSize={0.3} 
          position={[0, -2, 0.051]} 
          anchorY={"bottom"}>
          {name}
          <meshBasicMaterial color={color} toneMapped={false} />

        </Text>
        <mesh onClick={handleRoundedBoxDoubleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[0, 3, 0]}>
            <Button text="EXPLORE" color="grey" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>
        <mesh scale-x={8} scale-y={4.5}>
            <planeGeometry />
            <meshStandardMaterial color="#A1A391" />
        </mesh></>
      }

      {hovered &&}
      <RoundedBox
        args={[7.5,4,0.2]}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset"/>
          {children}
         
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};