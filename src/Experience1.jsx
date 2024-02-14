import { Environment, useTexture, RoundedBox,MeshPortalMaterial, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'
import { useSpring } from 'react-spring';
import PlayerNew from './PlayerNew';
import * as THREE from "three";
import Frame from './Frame';

// import Frame from './fFrame';
  
export default function Experience({ setBackToStart,backToStart, cameraRoad })
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
    const map1 = useTexture("textures/anime_art_style_a_water_based_pokemon_like_environ.jpg");
    // const map = useTexture("textures/modern_buildings_2_2k.hdr");


    return (
        <>
        <ambientLight intensity={0.5} />
        <Environment preset="night" background blur={0.6}></Environment>
        {/* {active !== null && <CameraControls />} */}
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
{/* {active === 'otherScene' && (
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" transparent opacity={opacity} />
            </mesh>
        )}

        {/* Erstes Projekt */}
        <Frame position={[0,2.5,-8]} name="Fraktale" color="white" active={active} setActive={setActive}> 
        {/* Hier können individuelle Objekte platziert werden */}
            <mesh  position={[0,-2,0]}>
                <planeGeometry/>
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>

        <Frame position={[20,2.8,-48]} spherePos={[-20,0,48]} name="Fraktale" color="#38adcf"  active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>

        <Frame position={[45,2.8,-88]} spherePos={[-45,0,88]} name="Fraktale" color="#38adcf" active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
        <Frame position={[80,2.8,-128]} spherePos={[-80,0,128]} name="Fraktale" color="#38adcf" active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
    
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

        {/* PLAYER  */}
        {active === null && <PlayerNew setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} />}
        {/* <PlayerNew cameraRoad={cameraRoad} /> */}
        </>
        )
    
};
