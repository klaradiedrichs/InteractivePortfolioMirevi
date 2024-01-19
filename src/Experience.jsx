import { Environment, useTexture, RoundedBox,MeshPortalMaterial, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'
import { useSpring } from 'react-spring';
import PlayerOld from './PlayerOld';
import * as THREE from "three";
import CameraControls from 'camera-controls';

// import Frame from './fFrame';
  
export default function Experience({ cameraRoad })
{
    // track if user is in World or not
    // by default: null -> in no world
    const [active,setActive] = useState(null)
    const textRef = useRef();

    const plane = useRef()

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

    // Add event listener for wheel event
    useEffect(() => {
        document.addEventListener('wheel', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);
    

    return (
        <>
        {/* <Stage adjustCamera={false}> */}
        <ambientLight intensity={0.5} />
        <Environment preset="night" background blur={0.4}></Environment>
        {active !== null && <OrbitControls />}
        <Frame name="Fraktale" color="#38adcf" texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        } active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
    
        {/* First */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[0,2.8,-8]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
            <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
        </group>


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
        <group>
            <mesh onClick={handleRotate} castShadow position={[80,2.8,-128]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* Fifth */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[115,2.8,-168]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}

        {/* Player / Camera Controller */}
        {/* disable when active === !null */}
        {active === null && <PlayerOld cameraRoad={cameraRoad} />}
        {/* </Stage> */}
        </>
        )
    
};

const Frame = ({children,name,active, setActive,...props}) => {
    
    const map = useTexture("textures/anime_art_style_a_water_based_pokemon_like_environ.jpg");

      return(
      <group {...props}>
        <Text font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
            {name}
        </Text>
        <RoundedBox onDoubleClick={() => setActive(active === name ? null : name)}
            args={[7.5,4,0.1]}>
            <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0 }>
                <ambientLight intensity={0.5} />
                <Environment preset="night" background blur={0.4}></Environment>
                {children}
                <mesh>
                    <sphereGeometry args={[5,60,60]} />
                    <meshStandardMaterial map={map} side={THREE.BackSide} />
                </mesh>
            </MeshPortalMaterial>
        </RoundedBox>
      </group>
      )
    
  };