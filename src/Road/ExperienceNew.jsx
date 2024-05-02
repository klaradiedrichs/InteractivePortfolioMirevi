import { Environment, useTexture, Svg,Html, useScroll, Center, Stage, Float, Text3D, Text, ContactShadows, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera, RoundedBox} from '@react-three/drei'
import React, { useState, useEffect, useRef,useMemo } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import WallExperience from '../Walls/WallsExp';
import FraktaleSphere from '../Fraktale/FraktaleSphere'
import Fraktale from '../Fraktale/Fraktale'
import Kin from '../kin/kinScene';
import WDRScene from '../wdr/WDRScene'
import { useStore } from '../stores/useStore';
import TextComp from './TextComp';
import svg from '/mouseIcon.svg';
import { act, useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'

const LINE_NB_POINTS = 25000;

export default function Experience()
{
    // Curve Poins
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
        [
            // Start
            new THREE.Vector3(-26, 0, 68.5),
            // // new THREE.Vector3(-20, 0, 58),
            new THREE.Vector3(-2, 0, 50),
            // Viewpoint1
            new THREE.Vector3(1, 0, 5),
            // Wendepunkt
            new THREE.Vector3(20, 0, -10),
            // Viewpoint 2
            new THREE.Vector3(22, 0, -32),
            // Drehung 2
            new THREE.Vector3(3, 0, -42),
            // Weg
            // Viewpoint 3
            new THREE.Vector3(-2, 0, -62),
            // Drehung 3
            new THREE.Vector3(2, 0, -76),
            new THREE.Vector3(24, 0, -85),
            new THREE.Vector3(30, 0, -95),
            // VP 4
            new THREE.Vector3(29, 0, -112),
            new THREE.Vector3(13, 0, -131),
            // new THREE.Vector3(21, 0, -138),
            new THREE.Vector3(12, 0, -162),
            // new THREE.Vector3(25, 0, -168),
            new THREE.Vector3(35, 0, -178),
            // VP 6
            new THREE.Vector3(40, 0, -198),
            // Weg 7
            new THREE.Vector3(30, 0, -216),
            new THREE.Vector3(32, 0, -240),
            new THREE.Vector3(54, 0, -249),
            new THREE.Vector3(57, 0, -269),
            ], false, "catmullrom", 0.5 );
    }, []);
    
    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
      }, [curve]);
        
    const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
    }, [curve]);
    
    const cameraGroup = useRef();
    // Camera Position -> safe in useState to be able to change depending on CameraRoad
    
    const scroll = useScroll();
 
    // runs every frame
    useFrame((_state, delta) => {

        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        );

        const curPoint = linePoints[curPointIndex]
        cameraGroup.current.position.lerp(curPoint, delta * 24);

    });

    return (
    <>
        <Environment preset="dawn" background blur={0.35}></Environment>

        {/* Erstes Projekt (Fraktale) */}
        <Frame position={[1, 2, -5]} name="persona fractalis" color="#38adcf" img="/poster/fraktalePoster3.png" portalImg="/poster/fraktalePortal.png" show={true} > 
            {/* <FraktaleSphere /> */}
            <Fraktale />
        </Frame>

        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="kin_" color="#38adcf" img="/poster/kinPoster3.png" portalImg="/poster/kinPortal.png" show={true} > 
            <Kin />
        </Frame>
        
        {/* Camera */}
        <>
        <group ref={cameraGroup}>
            <PerspectiveCamera fov={55} near={0.4} far={35} makeDefault />
            </group>
            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                    args={[ shape, { steps: LINE_NB_POINTS, bevelEnabled: true, extrudePath: curve,curveSegments: 50, bevelThickness: 10 },]} />
                    <meshStandardMaterial color={"white"} opacity={0.2} transparent />
                </mesh>
            </group>
        </>
        
        {/* Player muss immer aktiv sein, um nach Portal wieder an selbe Stelle zu gelangen */}
        {/* <PlayerRoad active={active} setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} /> */}
    </>
    )
};