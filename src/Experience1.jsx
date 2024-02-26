import { Environment, useTexture, RoundedBox,MeshPortalMaterial, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import Room from './old/Room';
import WallExperience from './Walls/WallExperience'
  
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
        <Frame position={[-1.3,2.0,-6]} name="eins" color="#38adcf" active={active} setActive={setActive}> 
            <WallExperience />
        </Frame>
        {/* Zweites Projekt (_kin) */}
        <Frame position={[21,2.0,-48]} name="zwei" color="#38adcf"  active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
        {/* Drittes Projekt (Klima) */}
        <Frame position={[6,2.0,-88]} name="Drei" color="#38adcf" active={active} setActive={setActive}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[35,2.0,-132]} name="vier" color="#38adcf" active={active} setActive={setActive}> 
            <WallExperience />
        </Frame>

        {/* PLAYER  */}
        {active === null && <PlayerRoad setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} />}
        {/* <PlayerNew cameraRoad={cameraRoad} /> */}
        </>
        )
    
};
