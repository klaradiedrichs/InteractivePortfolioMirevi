import { Environment, useTexture, RoundedBox,MeshPortalMaterial, useVideoTexture, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import Room from './old/Room';
import WallExperience from './Walls/WallExperience'
import FraktaleSphere from './Fraktale/FraktaleSphere'
import Kin from './kin/kinScene';
import Run from './kin/Run';
import Run2 from './kin/Run2';

export default function Experience({ setBackToStart,backToStart, cameraRoad })
{
    // track if user is in World or not
    // by default: null -> in no world
    const [active,setActive] = useState(null)

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
        <Frame position={[-1.3,1.8,-4]} name="eins" color="#38adcf" active={active} setActive={setActive}> 
            {/* <FraktaleSphere /> */}
            {/* <OrbitControls /> */}
            {/* <mesh position={[1.5,-2,4]}>
                <sphereGeometry args={[16,120,120]}/> */}
                {/* <meshStandardMaterial color="red" side={THREE.BackSide}/> */}
                {/* <VideoMaterial url="M09-1317.mp4" />
            </mesh> */}
            <FraktaleSphere />
            
        </Frame>
        <mesh>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="zwei" color="#38adcf"  active={active} setActive={setActive}> 
            <Kin />
            {/* <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh> */}
            {/* <Run />
            <Run2 /> */}
        </Frame>
        {/* Drittes Projekt (Klima) */}
        <Frame position={[-1,1.8,-84]} name="Drei" color="#38adcf" active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[38,1.8,-130]} name="vier" color="#38adcf" active={active} setActive={setActive}> 
            <WallExperience />
        </Frame>
        {/* FÜnftes Projekt (leer) */}
        <Frame position={[18,1.8,-177]} name="fünf" color="#38adcf" active={active} setActive={setActive}> 
            
        </Frame>
        {/* Sechstes Projekt (leer) */}
        <Frame position={[58.5,1.8,-215]} name="sechs" color="#38adcf" active={active} setActive={setActive}> 
            
        </Frame>
        {/* Siebtes Projekt (leer) */}
        <Frame position={[31,2.0,-249]} name="sieben" color="#38adcf" active={active} setActive={setActive}> 
            
        </Frame>

        {/* PLAYER  */}
        {active === null && <PlayerRoad setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} />}
        {/* <PlayerNew cameraRoad={cameraRoad} /> */}
        </>
        )
    
        function VideoMaterial({ url }) {
            const texture = useVideoTexture(url)
            return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.DoubleSide} />
          }
};
