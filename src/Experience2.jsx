import { Environment, useTexture, Svg,Html, Center, Stage, Float, Text3D, Text, ContactShadows, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera} from '@react-three/drei'
import React, { useState, useEffect, useRef,useMemo } from "react";
import PlayerRoad from './PlayerRoad';
import * as THREE from "three";
import Frame from './Frame';
import WallExperience from './Walls/WallsExp';
import FraktaleSphere from './Fraktale/FraktaleSphere'
import Kin from './kin/kinScene';
import WDRScene from './wdr/WDRScene'
import { useStore } from './stores/useStore';
import TextComp from './TextComp';
import svg from '/mirevi_logo.svg';
import { act, useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 25000;

export default function Experience({ setBackToStart,backToStart, cameraRoad})
{
    // Curve Poins
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
        [
            // Start
            new THREE.Vector3(-35, 0, 70),
            // new THREE.Vector3(-20, 0, 58),
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
    
    const cameraRef = useRef();
    // Camera Position -> safe in useState to be able to change depending on CameraRoad
    const [initialYPos, setinitialYPos] = useState();
    const [initialZPos, setInitialZPos] = useState(1)
    const [initialXPos, setInitalXPos] = useState(0)
    // scrollPosition
    const [scrollOffset, setScrollOffset] = useState(0);
    const active = useStore((state) => state.active);
    const textYPos = 0.3;
    const textRef = useRef();

    const [opacity, setOpacity] = useState({ title1: 0.4, title2: 0.4,title3: 0.4,title4: 0.4,title5: 0.4,title6: 0.4,title7: 0.4});

    const titlePosition = {
        title1: new THREE.Vector3(0.7, textYPos, 22),
        title2: new THREE.Vector3(23,textYPos,-20),
        title3: new THREE.Vector3(-2,textYPos,-60),
        title4: new THREE.Vector3(31,textYPos,-100),
        title5: new THREE.Vector3(10,textYPos,-146),
        title6: new THREE.Vector3(40.5,textYPos,-191),
        title7: new THREE.Vector3(29,textYPos,-222),
    };

    // called when user scrolls  
    const handleWheel = (e) => {
        const delta = e.deltaY;
        const scrollSpeed = 0.5;
        // Update the scroll position based on the delta
        setScrollOffset((prevOffset) => prevOffset + delta * scrollSpeed);
    };

    // runs on every render or when cameraRoad changes
    useEffect(() => {
        
        if(cameraRoad && !backToStart){
        window.addEventListener("wheel", handleWheel);
        // go back to CameraRoad Position:
        setInitalXPos(-4);
        setInitialZPos(17);
        setinitialYPos(2)
        }
        else if(!cameraRoad){
        window.removeEventListener("wheel", handleWheel);
        }
        
        return () => {
        window.removeEventListener("wheel", handleWheel);
        };
        
    }, [cameraRoad, backToStart]);

    // runs every frame
    useFrame(() => {
        if(cameraRoad && !backToStart && active == null){

        // const cameraPos = cameraRef.current.position;
        // const range = 17;
        // Object.entries(titlePosition).forEach(([title, position]) => {
        //     const distance = cameraPos.distanceTo(position);
        //     let newOpacity;
        //     // Change opacity based on distance
        //     if (distance < range) {
        //         newOpacity = Math.min(opacity[title] + 0.05, 0.6); // Increase opacity up to 0.6 If camera is within range of title position
        //     } else {
        //         newOpacity = Math.max(opacity[title] - 0.05, 0); // Decrease opacity to 0 if camera is outside the range of title position
        //     }
        //     // Update opacity for the current title
        //     setOpacity((prevOpacity) => ({
        //         ...prevOpacity,
        //         [title]: newOpacity,
        //     }));
        // });
        // console.log("Pos X" + cameraRef.current.position.x)
        // move Camera on Curve Calculation:
        // Clamp the scroll offset to ensure it stays within the valid range of curve points
        const clampedScrollOffset = Math.max(0, Math.min(scrollOffset, linePoints.length - 1));
        // Find the current index of the point along the curve
        const curPointIndex = Math.round(clampedScrollOffset);
        // Calculate the interpolation factor between the current and next point
        const alpha = clampedScrollOffset - curPointIndex;
        
        // calculate current and next point on the curve
        const curPoint = linePoints[curPointIndex];
        const nextPoint = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
        // interpolate between current and next point for smooth movement
        const interpolatedPoint = new THREE.Vector3().lerpVectors(curPoint, nextPoint, alpha);
        // set camera position to the interpolated point on the curve 
        cameraRef.current.position.copy(interpolatedPoint);
        // Look at the next point on the curve
        const pointAhead = linePoints[Math.min(curPointIndex + 20, linePoints.length - 1)];
        cameraRef.current.lookAt(pointAhead);
        }
        else if(!cameraRoad){
        cameraRef.current.lookAt(0, 0, -90);
        setInitalXPos(97);
        setInitialZPos(44);
        setinitialYPos(41)
        }
        else if(backToStart){
        //find the first point
        const firstPoint = linePoints[0]
        cameraRef.current.position.copy(firstPoint)
        // setBackToStart(false)
        }
    });

    return (
    <>
        <Environment preset="dawn" background blur={0.6}></Environment>
        <group>
            <Sparkles size={ 15 } scale={ [ 250, 25, 60 ] } position={ [50, 5,-100] } rotation={[0, -Math.PI / -3.2, 0]} speed={ 0.9 } count={ 300 }/>
        </group>
        
        {/* Mirevi Start Logo */}
        {/* <TextComp name="MIREVI" position={[-27, 0.5, 65]} rotation={[0, -1, 0]}/> */}
        <Svg position={[-30, 0.5, 67]} rotation={[0, -1, 0]} scale={0.008} src={svg}/>
        
        {/* PROJEKTE */}

        {/* Erstes Projekt (Fraktale) */}
        <Frame position={[1,2,-5]} name="persona fractalis" color="#38adcf" img="/textures/testPoster.png" > 
            <FraktaleSphere />
            {/* <WDRScene /> */} 
        </Frame>
        <TextComp name="persona fractalis" position={titlePosition.title1} rotation={[0, 0, 0]}/>

        {/* Zweites Projekt (kin) */}
        <Frame position={[24,1.8,-43]} name="kin_" color="#38adcf" img="MIREVI_logo_transparent.png" > 
            <Kin />
        </Frame>
        <TextComp name="Kin" position={titlePosition.title2} rotation={[0, -0.2, 0]}/>
        
        {/* Drittes Projekt (Klima) */}
        <Frame position={[-2.5,1.8,-81]} name="WDR Klima" color="#38adcf" img="/textures/escaperoom.png" > 
            <WDRScene />
        </Frame>
        <TextComp name="WDR Klima" position={titlePosition.title3} rotation={[0, 0.1, 0]}/>
        
        {/* Viertes Projekt (Wall)  */}
        <Frame position={[31,1.8,-123]} name="Video Wall" color="#38adcf" img="/textures/escaperoom.png"> 
            <WallExperience/>
        </Frame>
        <TextComp name="Video Wall" position={titlePosition.title4} rotation={[0, -0.2, 0]} />
        
        {/* Fünftes Projekt (leer) */}
        <Frame position={[11,1.8,-170]} name="Fünf" color="#38adcf" img="/textures/escaperoom.png" > 
        </Frame>
        <TextComp name="Fünf" position={titlePosition.title5} rotation={[0, -0.2, 0]} />
        
        {/* Sechstes Projekt (leer) */}
        <Frame position={[41,1.8,-213]} name="Sechs" color="#38adcf" img="/textures/escaperoom.png"> 
        </Frame>
        <TextComp name="Sechs" position={titlePosition.title6} rotation={[0, -0.2, 0]} />
        
        {/* Siebtes Projekt (leer) */}
        <Frame position={[30,2.0,-248]} name="Sieben" color="#38adcf" img="/textures/escaperoom.png"> 
        </Frame>
        <TextComp name="Sieben" position={titlePosition.title7} rotation={[0, -0.2, 0]} />
        
        {!cameraRoad && active === null && <OrbitControls />}
        {/* Camera */}
        {active === null && 
        <>
            <PerspectiveCamera fov={35} near={0.4} far={cameraRoad ? 35 : 600} makeDefault ref={cameraRef} position={[initialXPos, initialYPos, initialZPos]} />
            <group position-y={-1.8}>
                <mesh>
                    <extrudeGeometry
                    args={[ shape, { steps: LINE_NB_POINTS, bevelEnabled: true, extrudePath: curve,curveSegments: 50, bevelThickness: 10 },]} />
                    <meshStandardMaterial color={"white"} opacity={0.2} transparent />
                </mesh>
            </group>
        </>
        }
        {/* Player muss immer aktiv sein, um nach Portal wieder an selbe Stelle zu gelangen */}
        {/* <PlayerRoad active={active} setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} /> */}
    </>
    )
};