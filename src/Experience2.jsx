import { Environment, useTexture, Html, Stage, Float, Text, ContactShadows, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera} from '@react-three/drei'
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

        {/* Erstes Projekt (Fraktale) */}
        <Frame position={[-1.3,1.8,-4]} name="fraktale" color="#38adcf" > 
            <FraktaleSphere />
            {/* <WDRScene /> */} 
        </Frame>
        <Text position={[-1.3,0.5,34]} font="fonts/PlayfairDisplay-Regular.ttf" fontSize={1}>
            Fraktale
            <meshBasicMaterial color="black" opacity={0.3} toneMapped={false} />
        </Text>
        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="Kin" color="#38adcf"  > 
            <Kin />
        </Frame>
        <Text position={[23,0.3,-17]} font="fonts/PlayfairDisplay-Regular.ttf" fontSize={1}>
            Kin
            <meshBasicMaterial color="black" opacity={0.2} toneMapped={false} />
        </Text>
        {/* Drittes Projekt (Klima) */}
        <Frame position={[-1,1.8,-84]} name="WDR Klima" color="#38adcf" > 
            <WDRScene />
        </Frame>
        <Text position={[-1,0.4,-55]} font="fonts/PlayfairDisplay-Regular.ttf" fontSize={1}>
            WDR Klima
            <meshBasicMaterial color="black" opacity={0.2} toneMapped={false} />
        </Text>
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[39,1.8,-132]} name="WallExperience" color="#38adcf" > 
            <WallExperience/>
        </Frame>
        <Text position={[39,0.3,-110]} font="fonts/PlayfairDisplay-Regular.ttf" fontSize={1}>
            Video Wall
            <meshBasicMaterial color="black" opacity={0.2} toneMapped={false} />
        </Text>
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
