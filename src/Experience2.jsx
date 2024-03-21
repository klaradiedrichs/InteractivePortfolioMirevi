import { Environment, useTexture, Svg,Html, Stage, Float, Text, ContactShadows, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import WallExperience from './Walls/WallsExp';
import FraktaleSphere from './Fraktale/FraktaleSphere'
import Kin from './kin/kinScene';
import WDRScene from './wdr/WDRScene'
import { useStore } from './stores/useStore';
import TextComp from './TextComp';
import Logo from './Logo';
import svg from '../public/mirevi_logo.svg';

export default function Experience({ setBackToStart,backToStart, cameraRoad})
{
    // track if user is in World or not
    // by default: null -> in no world
    // when active !== null -> PlayerRoad muss anders sein CHECK
    // const [active,setActive] = useState(null)
    const setActive = useStore((state) => state.setActive);
    const active = useStore((state) => state.active);
    const texture = useTexture('MIREVI_logo_transparent.png')
    return (
        <>
        <Environment preset="dawn" background blur={0.6}></Environment>

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

        {/* PROJEKTE */}
        {/* Mirevi Start Logo */}
        {/* <TextComp name="MIREVI" position={[-27, 0.5, 65]} rotation={[0, -1, 0]}/> */}
        {/* <mesh position={[-27, 0.5, 65]} scale={[6,2,0]} rotation={[0, -1, 0]}>
            <planeGeometry />
            <meshBasicMaterial transparent map={texture} />
        </mesh> */}
        {/* <Logo /> */}
        <Svg
        fillMaterial={{
        wireframe: false
        }}
        position={[-26, 0.4, 65]}
        rotation={[0, -1, 0]}
        scale={0.007}
        // src="https://threejs.org/examples/models/svg/tiger.svg"
        src={svg}
        strokeMaterial={{
        wireframe: false
        }}
        />
        {/* Erstes Projekt (Fraktale) */}
        <Frame position={[-1.3,1.8,-4]} name="fraktale" color="#38adcf" > 
            <FraktaleSphere />
            {/* <WDRScene /> */} 
        </Frame>
        <TextComp name="fraktale" position={[-1.3,0.5,34]} rotation={[0, 0, 0]}/>
        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="Kin" color="#38adcf"  > 
            <Kin />
        </Frame>
        <TextComp name="Kin" position={[23,0.3,-17]} rotation={[0, -0.5, 0]}/>
        {/* Drittes Projekt (Klima) */}
        <Frame position={[-1,1.8,-84]} name="WDR Klima" color="#38adcf" > 
            <WDRScene />
        </Frame>
        <TextComp name="WDR Klima" position={[-1,0.4,-57]} rotation={[0, 0.5, 0]}/>
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[39,1.8,-132]} name="WallExperience" color="#38adcf" > 
            <WallExperience/>
        </Frame>
        <TextComp name="Video Wall" position={[39,0.3,-110]} rotation={[0, -0.2, 0]} />
        {/* Fünftes Projekt (leer) */}
        <Frame position={[18,1.8,-174]} name="fünf" color="#38adcf"  > 
            
        </Frame>
        {/* Sechstes Projekt (leer) */}
        <Frame position={[58.5,1.8,-215]} name="sechs" color="#38adcf" > 
            
        </Frame>
        {/* Siebtes Projekt (leer) */}
        <Frame position={[31,2.0,-249]} name="sieben" color="#38adcf" > 
            
        </Frame>

        {/* PLAYER  */}
        {/* Player muss immer aktiv sein, um nach Portal wieder an selbe Stelle zu gelangen */}
        <PlayerRoad active={active} setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} />
        </>
        )
    
};
