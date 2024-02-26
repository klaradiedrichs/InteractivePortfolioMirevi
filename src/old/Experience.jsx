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
  const map1 = useTexture("textures/anime_art_style_a_water_based_pokemon_like_environ.jpg");

  const [rotationAngle, setRotationAngle] = useState([0,0,0])
    const [scale, setScale] = useState([7.5,4,0])
    // const [position, setPosition] = useState[[]]
    
    const handleRotate =() =>{
        setRotationAngle([0, -0.2, 0]);
        setScale([9.5,5.1,0])
    }
    const handleScroll = () => {
        // Reset rotation and scale to default values
        setRotationAngle([0, 0, 0]);
        setScale([7.5,4,0])
    };

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


{/* ALTE SACHEN */}
{/* {active === 'otherScene' && (
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" transparent opacity={opacity} />
            </mesh>
        )}

        {/* Erstes Projekt */}
        {/* <Frame position={[0,2.5,-8]} name="Fraktale" color="white" active={active} setActive={setActive}>  */}
        {/* Hier können individuelle Objekte platziert werden */}
            {/* <mesh  position={[0,-2,0]}>
                <planeGeometry/>
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame> */}
        

        
    
        {/* First */}
        {/* <group>
            // if normalState: normale Plane mit textur anzeigen
            <mesh onClick={handleRotate} castShadow position={[0,2.8,-8]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
            <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
        </group>  */}


        

        {/* <TransformControls object={plane} mode="rotate"/> */}

        {/* <mesh ref={ plane } rotation={[0, -Math.PI / -3.2, 0]} scale={[130,1,0]} position={[10,0,-30]}>
            <boxGeometry/>
        </mesh> */}
        {/* Second Project */}
        {/* <group>
            <mesh onClick={handleRotate} castShadow position={[20,2.8,-48]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group> */}
        {/* Third Project */}
        {/* <group>
            <mesh onClick={handleRotate} castShadow position={[45,2.8,-88]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group> */}
        
        {/* Fourth Project */}
        {/* <group>
            <mesh onClick={handleRotate} castShadow position={[80,2.8,-128]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group> */}
        {/* Fifth */}
        {/* <group>
            <mesh onClick={handleRotate} castShadow position={[115,2.8,-168]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group> */}
        {/* <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}
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