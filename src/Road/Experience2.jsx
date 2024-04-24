import { Environment, useTexture, Svg,Html, Center, Stage, Float, Text3D, Text, ContactShadows, MeshReflectorMaterial, Sparkles, OrbitControls, CameraControls, PerspectiveCamera, RoundedBox} from '@react-three/drei'
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

export default function Experience({ setBackToStart,backToStart, cameraRoad})
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
    
    const logo = useTexture("logoNew.png")
    const cameraRef = useRef();
    // Camera Position -> safe in useState to be able to change depending on CameraRoad
    const [initialYPos, setinitialYPos] = useState();
    const [initialZPos, setInitialZPos] = useState(1)
    const [initialXPos, setInitalXPos] = useState(0)
    const [linkHovered, setLinkHovered] = useState(false);
    // scrollPosition
    const [scrollOffset, setScrollOffset] = useState(0);
    const active = useStore((state) => state.active);
    const loaded = useStore((state) => state.loaded);
    const setLoaded = useStore((state) => state.setLoaded);
    
    const textYPos = 0.3;
    const textRef = useRef();
    // const [loaded, setLoaded] = useState(false);
    const [start, setStart] = useState(false);

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

    const framePosition = {
        frame1: new THREE.Vector3(1, 2, -5),
        frame2: new THREE.Vector3(24, 1.8, -43),
        frame3: new THREE.Vector3(-2.5, 1.8, -81), 
        frame4: new THREE.Vector3(31, 1.8, -123),
        frame5: new THREE.Vector3(11, 1.8, -170), 
        frame6: new THREE.Vector3(41, 1.8, -213),
        frame7: new THREE.Vector3(30, 2.0, -248), 
        // Add more frames as needed
      };
    
    const closeToFrame = {
        frame1: false,
        frame2: false,
        frame3: false,
        frame4: false,
        frame5: false,
        frame6: false,
        frame7: false,
        // Add more planes as needed
      };

    const [showInformation, setShowInformation] = useState(closeToFrame); // State to track video playing status for each plane


    // called when user scrolls  
    const handleWheel = (e) => {
        const delta = e.deltaY;
        const scrollSpeed = 0.5;
        // Update the scroll position based on the delta
        setScrollOffset((prevOffset) => prevOffset + delta * scrollSpeed);
        setLoaded(false)
    };

    // runs on every render or when cameraRoad changes
    useEffect(() => {
        setLoaded(true);

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

    const toggleShow = (frame) => {
        setShowInformation((prevState) => ({
          ...prevState,
          [frame]: !prevState[frame],
        }));
      };

      const openLink = () => {
        window.open("https://mirevi.de/", "_blank"); // Open the link in a new tab

      }
    // runs every frame
    useFrame(() => {
        if(active === null ) {
        if(cameraRoad && !backToStart){

        const cameraPos = cameraRef.current.position;
        const range = 25;
        Object.entries(showInformation).forEach(([frame, show]) => {
            const distance = cameraPos.distanceTo(framePosition[frame]);

            if (distance <= range && !show) {
                toggleShow(frame)
            } else if (distance > range && show) {
                toggleShow(frame)
            }
            
        });

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
        if (curPointIndex === 0) {
            setLoaded(true);
        }
        else{
            setLoaded(false);
        }
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
    }
    });

    const {scale} = useSpring({ 
        scale: loaded ? 0.0015 : 0,
    })
    const { opacity: textFadeIn } = useSpring({ 
        opacity: loaded ? 1 : 0,
        // immediate: boxactive
      });
    
    return (
    <>
        <Environment preset="dawn" background blur={0.35}></Environment>
        <group>
            <Sparkles size={ 15 } scale={ [ 250, 25, 60 ] } position={ [50, 5,-100] } rotation={[0, -Math.PI / -3.2, 0]} speed={ 0.9 } count={ 300 }/>
        </group>
        {/* Mirevi Start Logo */}
        {/* <TextComp name="MIREVI" position={[-27, 0.5, 65]} rotation={[0, -1, 0]}/> */}
        {/* <animated.group scale={2.15} position={[-20, 0.8, 64]} rotation={[0, -0.9, 0]}>
            
            <RoundedBox scale={1} args={[2.3, 1.6, 0.1]} radius={0.06}>
                <meshPhongMaterial color="#7e7e7e" opacity={0.3} transparent />
                <group position={[0,0.4,0.1]}>
                <Text scale={0.6} position={[0,-0.56,0]} color="white" font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.1}>
                ... an immersive web exhibiton to get insights about MIREVI Projects
                <meshStandardMaterial color="white" emissive="white" toneMapped={false} />
                </Text>
                <Text scale={0.45} position={[0,-0.68,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                    Learn more about mirevi
                    <meshBasicMaterial color="white" toneMapped={false} />
                </Text>
                <Text scale={0.32} position={[0,-1.7,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                    Scroll to start exploring
                    <meshStandardMaterial color="white" toneMapped={false} />
                </Text>
                <Svg position={[0,-0.9,0]} scale={0.0015} src={svg}/>
                <mesh position={[-0.07,-0.15,0]} scale={[1.15,0.65,0]}>
                    <planeGeometry />
                    <meshBasicMaterial map={logo} opacity={0.8} transparent toneMapped={false} side={THREE.DoubleSide}/>
                </mesh>
                </group>
                
            </RoundedBox>
        </animated.group> */}
        <animated.group scale={2.15} position={[-20, 0.8, 64]} rotation={[0, -0.9, 0]}>
            <Text scale={0.6} position={[0,-0.57,0]} color="white" font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.1}>
                ... an immersive web exhibiton to get insights about MIREVI projects
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            
            <Text scale={0.45} position={[-0.1,-0.68,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                Learn more about 
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            <Text onPointerOver={() => setLinkHovered(true)} onPointerOut={() => setLinkHovered(false)} onClick={openLink} scale={0.45} position={[0.215,-0.68,0]} color={linkHovered? "black" : "white"} font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                mirevi.de
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            <Text scale={0.32} position={[0,-1.28,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                Scroll to start exploring
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />            
            </Text>
            {loaded && (
            <Svg position={[0,-1.34,0]} scale={0.0015} src={svg}>
                <meshStandardMaterial color="black" />
            </Svg>
            )}
            <mesh position={[-0.07,-0.15,0]} scale={[1.2,0.7,0]}>
                <planeGeometry />
                <animated.meshBasicMaterial map={logo} opacity={textFadeIn} transparent toneMapped={false} side={THREE.DoubleSide}/>
            </mesh>
            {/* <mesh scale={[0.2,0.3,0]}>
                <planeGeometry />
                <meshBasicMaterial map={mouse} opacity={0.8} transparent toneMapped={false} side={THREE.DoubleSide}/>
            </mesh> */}
            {/* <RoundedBox args={[1.9, 1.3, 1]} radius={0.02} position={[0.45,-0.4,-1]}>
                <meshStandardMaterial  color="#7e7e7e" opacity={0.2} transparent />
            </RoundedBox> */}
        </animated.group>
        {/* PROJEKTE */}

      
        {/* Erstes Projekt (Fraktale) */}
        <Frame position={framePosition.frame1} name="persona fractalis" color="#38adcf" img="/poster/fraktalePosterNew.png" portalImg="/poster/fraktalePortal.png" show={showInformation['frame1']} > 
            {/* <FraktaleSphere /> */}
            <Fraktale />
            {/* <WDRScene /> */}
        </Frame>
        <TextComp name="persona fractalis" position={titlePosition.title1} rotation={[0, 0, 0]}/>

        {/* Zweites Projekt (kin) */}
        <Frame position={framePosition.frame2} name="kin_" color="#38adcf" img="/poster/kinPosterNew.png" portalImg="/poster/kinPortal.png" show={showInformation['frame2']} > 
            <Kin />
        </Frame>
        <TextComp name="Kin" position={titlePosition.title2} rotation={[0, -0.2, 0]}/>
        
        {/* Drittes Projekt (Klima) */}
        <Frame position={framePosition.frame3} name="WDR Klima" color="#38adcf" img="/poster/wdrPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame3']} > 
            <WDRScene />
        </Frame>
        <TextComp name="WDR Klima" position={titlePosition.title3} rotation={[0, 0.1, 0]}/>
        
        {/* Viertes Projekt (Wall)  */}
        <Frame position={framePosition.frame4} name="Video Wall" color="#38adcf" img="/poster/videowallPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame4']}> 
            <WallExperience/>
        </Frame>
        <TextComp name="Video Wall" position={titlePosition.title4} rotation={[0, -0.2, 0]} />
        
        {/* Fünftes Projekt (leer) */}
        <Frame position={framePosition.frame5} name="Fünf" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame5']} > 
        </Frame>
        <TextComp name="Fünf" position={titlePosition.title5} rotation={[0, -0.2, 0]} />
        
        {/* Sechstes Projekt (leer) */}
        <Frame position={framePosition.frame6} name="Sechs" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame6']}> 
        </Frame>
        <TextComp name="Sechs" position={titlePosition.title6} rotation={[0, -0.2, 0]} />
        
        {/* Siebtes Projekt (leer) */}
        <Frame position={framePosition.frame7} name="Sieben" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame7']}> 
        </Frame>
        <TextComp name="Sieben" position={titlePosition.title7} rotation={[0, -0.2, 0]} />
        
        {!cameraRoad && active === null && <OrbitControls />}
        {/* Camera */}
        {active === null && 
        <>
            <PerspectiveCamera fov={35} near={0.4} far={cameraRoad ? 35 : 600} makeDefault ref={cameraRef} position={[initialXPos, initialYPos, initialZPos]} />
            <group position-y={-2}>
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