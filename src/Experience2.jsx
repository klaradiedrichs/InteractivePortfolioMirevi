import { Environment, useTexture, RoundedBox,MeshPortalMaterial, useVideoTexture, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import WallExperience from './Walls/WallsExp';
import FraktaleSphere from './Fraktale/FraktaleSphere'
import Kin from './kin/kinScene';
import WDRScene from './wdr/WDRScene'
import { useStore } from './stores/useStore';

export default function Experience({ setBackToStart,backToStart, cameraRoad})
{
    // track if user is in World or not
    // by default: null -> in no world
    // when active !== null -> PlayerRoad muss anders sein CHECK
    // const [active,setActive] = useState(null)
    const setActive = useStore((state) => state.setActive);
    const active = useStore((state) => state.active);

    return (
        <>
        <Environment preset="night" background blur={0.6}></Environment>
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

        {/* Erstes Projekt (Fraktale) */}
        <Frame position={[-1.3,1.8,-4]} name="eins" color="#38adcf" > 
            <FraktaleSphere />
        </Frame>
        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="zwei" color="#38adcf"  > 
            <Kin />
        </Frame>
        {/* Drittes Projekt (Klima) */}
        <Frame position={[-1,1.8,-84]} name="Drei" color="#38adcf" > 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
            <WDRScene />
        </Frame>
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[39,1.8,-132]} name="WallExperience" color="#38adcf" > 
            <WallExperience/>
        </Frame>
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
