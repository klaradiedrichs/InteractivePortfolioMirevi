import React, { useEffect, useRef, useState } from 'react';
import { Text, Environment, OrbitControls,RoundedBox, useTexture, Sparkles, useGLTF, Html ,PerspectiveCamera} from '@react-three/drei';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Button } from "r3dy";
import { useSpring, animated } from '@react-spring/three'
import { useStore } from '../stores/useStore';

import VirtualGame from './VirtualGame';
import GenerationSpeaks from './GenerationSpeaks';
import useGameStore from './useGameStore';
export default function Experience() {
 
    // loaded wird true, wenn Component geladen wurde (für Animation der Erde)
    const [loaded, setLoaded] = useState(false);
    const setVirtualGame = useStore((state) => state.setGameScene);
    const virtualGame = useStore((state) => state.gameScene);
    const setGenerationSpeaks = useStore((state) => state.setGenerationSpeaks);
    const generationSpeaks = useStore((state) => state.generationSpeaks);
    const start = useGameStore((state) => state.start);
    const setStart = useGameStore((state) => state.setStart);
    
    const { scene } = useGLTF('/earthNew.glb');
    const active = useStore((state) => state.active);

    const handleGame = () => {
        setVirtualGame(true)
    }
    const handleBegegnung = () => {
        setGenerationSpeaks(true)
    }

    const getRandomIndex = (max) => Math.floor(Math.random() * max);
    const getRandomPosition = (min, max) => Math.random() * (max - min) + min;
    const [earthRotation, setEarthRotation] = useState({ x: 0, y: -3.5 , z: 0 });
    
    const { scale: earth } = useSpring({ 
        scale: loaded ? 0.16 : 11,
    });
    const { opacity: buttons } = useSpring({ 
        opacity: loaded ? 1 : 0,
        delay: loaded ? 800 : 0
    });
    const { opacity: title } = useSpring({ 
        opacity: loaded ? 1 : 0,
        delay: loaded ? 700 : 0
    });

    useEffect(() => {
        // Reset the store when the virtualGame state changes
        if(!virtualGame) {
            useGameStore.setState({
                start: false,
                score: 0,

            })
        }

            useGameStore.setState({
                
                trashPositions: Array.from({length: 8}, () => ({
                    x: getRandomPosition(50, -5),
                    y: getRandomPosition(5, -1),
                    z: getRandomPosition(8,-6),

                })),
                
                tirePositions: Array.from({length: 10}, () => ({
                    x: getRandomPosition(60, 7),
                    y: getRandomPosition(4, -1),
                    z: getRandomPosition(6,-5),
                })),
                cupPositions: Array.from({length: 8}, () => ({
                    x: getRandomPosition(65, 0),
                    y: getRandomPosition(3.5, -1),
                    z: getRandomPosition(8,-5),
                })),
                collectors: [],
                // timeLeft: 30,
                
            });
        

        
        // Animate the Earth model scale when the component mounts
        setLoaded(true)
        
    }, [virtualGame, start]);

    useFrame(() => {
        setEarthRotation((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 0.0016, // Increase z position by 0.1 on each frame
        }));     
      });  

  return (
    <>
        {!virtualGame && !generationSpeaks && (
        <>
        {/* <Environment preset='night' background blur={0.5} /> */}
        <PerspectiveCamera makeDefault fov={48} position={[0,-0.3,7]} far={1000}/>
        {active !== null && <OrbitControls enablePan={false} enableRotate={false} target={[0, -0.5, -5]} /> }
        <color attach="background" args={['#101010']} />
        <ambientLight intensity={0.7}/>
        <group>
            <Sparkles size={ 10 } scale={ [ 50, 30, 40 ] } position={ [0, 0,-5] } speed={ 0.1 } count={ 120 }/>
        </group>

        {/* Main Scene  */}
        
        <group>
        <animated.primitive rotation={[earthRotation.x, earthRotation.y, earthRotation.z]} position={[0, 0, -3]} scale={earth} object={scene} />
        </group>
        <Text lineHeight={1.2} textAlign="center" fontSize={0.28} position={[0,-0.5,1.1]}>
            {`Die Erde ist in Gefahr!\nErlebe warum`}
            <animated.meshBasicMaterial color="white" opacity={title} transparent />
        </Text>
        
        {/* Virtuelle Begegnung */}
        <group position={[-2.7,-1.9,1]}>
            <RoundedBox onClick={handleBegegnung} position={[0,-0.5,0]} args={[3.5,0.5,0]}>
                <animated.meshPhongMaterial opacity={buttons} transparent color="#73F4B4" />
                <Text anchorX="center" anchorY="middle" position-z={0.01} fontSize={0.25} color="black">
                    Virtuelle Begegnung starten
                    <animated.meshBasicMaterial color="black" opacity={buttons} transparent />
                </Text>
            </RoundedBox>
            <Text textAlign="center" fontSize={0.15}>
                {`Erlebe, was die Generation\nKlimawandel bewegt`}
                <animated.meshBasicMaterial color="white" opacity={buttons} transparent />
            </Text> 
        </group>
        {/*  Game */}
        <group position={[2.7,-1.9,1]}>
            <RoundedBox onClick={handleGame} position={[0,-0.5,0]} args={[3.5,0.5,0]}>
                <animated.meshPhongMaterial opacity={buttons} transparent color="#73F4B4" />                
                <Text anchorX="center" anchorY="middle" position-z={0.01} fontSize={0.25} color="black">
                    Virtuelles Game starten
                    <animated.meshBasicMaterial color="black" opacity={buttons} transparent />
                </Text>
            </RoundedBox>
            <Text textAlign="center" fontSize={0.2}>
                {`Erlebe die Bedrohung\nunserer Meere`}
                <animated.meshBasicMaterial color="white" opacity={buttons} transparent />
            </Text> 
        </group>
        </>
        )}

        {virtualGame && (
        <VirtualGame />
        )}
        {generationSpeaks &&(
        <GenerationSpeaks />
        )}
    </>
  );
}