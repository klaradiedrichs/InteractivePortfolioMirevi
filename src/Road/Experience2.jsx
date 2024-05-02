import { Environment, useTexture, Svg, Text, Sparkles, OrbitControls, PerspectiveCamera, useScroll} from '@react-three/drei'
import React, { useState, useEffect, useRef,useMemo } from "react";
import * as THREE from "three";
import Frame from './Frame';
import WallExperience from '../Walls/WallsExp';
import Fraktale from '../Fraktale/Fraktale'
import Kin from '../kin/kinScene';
import WDRScene from '../wdr/WDRScene'
import { useStore } from '../stores/useStore';
import TextComp from './TextComp';
import svg from '/mouseIcon.svg';
import { act, useFrame } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'

const LINE_NB_POINTS = 20000;

export default function Experience({ setBackToStart,backToStart})
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
    const cameraOverview = useRef();
    const cameraGroup = useRef();
    // Camera Position -> safe in useState to be able to change depending on CameraRoad
    const [initialYPos, setinitialYPos] = useState(0);
    const [initialZPos, setInitialZPos] = useState(68.5)
    const [initialXPos, setInitalXPos] = useState(-26)
    const [linkHovered, setLinkHovered] = useState(false);

    const [showInfo1, setShowInfo1] = useState(false);
    const [showInfo2, setShowInfo2] = useState(false);
    const [showInfo3, setShowInfo3] = useState(false);
    const [showInfo4, setShowInfo4] = useState(false);

    // scrollPosition
    const [scrollOffset, setScrollOffset] = useState(0);
    const active = useStore((state) => state.active);

    // für Start Screen Anzeige
    const loaded = useStore((state) => state.loaded);
    const setLoaded = useStore((state) => state.setLoaded);
    const scroll = useScroll();
    const cameraRoad = useStore((state) => state.cameraRoad);
    const setCameraRoad = useStore((state) => state.setCameraRoad);

    const textYPos = 0.3;
    // const [loaded, setLoaded] = useState(false);
    
    const titlePosition = {
        title1: new THREE.Vector3(0.9, textYPos, 20),
        title2: new THREE.Vector3(24,textYPos,-21),
        title3: new THREE.Vector3(-3,textYPos,-60),
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

    const [showInformation, setShowInformation] = useState(true); // State to track video playing status for each plane

    // called when user scrolls  
    const handleWheel = (e) => {
        // const delta = e.deltaY;
        // const scrollSpeed = 0.5;
        // // Update the scroll position based on the delta
        // setScrollOffset((prevOffset) => prevOffset + delta * scrollSpeed);
        // setLoaded(false)
    };

    // runs on every render or when cameraRoad changes
    useEffect(() => {
        setLoaded(true);

        if(cameraRoad && !backToStart){                   
        // window.addEventListener("wheel", handleWheel);
        // go back to CameraRoad Position:
        // setinitialYPos(0);
        setShowInformation(true);

        }
        else if(!cameraRoad){
        // window.removeEventListener("wheel", handleWheel);
        // setShowInformation(false);
        // setinitialYPos(1);

        }
        
        return () => {
        // window.removeEventListener("wheel", handleWheel);
        };
        
    }, [cameraRoad, backToStart]);

      const openLink = () => {
        window.open("https://mirevi.de/", "_blank"); // Open the link in a new tab

      }

      useFrame((_state, delta) => {
        if (active === null) {
            if (cameraRoad) {
                const cameraPos = cameraRef.current.position;
    
                // Get an array of all frame positions
                const allFramePositions = Object.values(framePosition);
                // Calculate distances to all frame positions
                const distances = allFramePositions.map(framePos => cameraPos.distanceTo(framePos));
    
                const range = 23;
    
                // if (distances.some(distance => distance <= range)) {
                //     setShowInformation(true);
                // } else if (distances.some(distance => distance >= range)) {
                //     setShowInformation(false);
                // }
    
                const curPointIndex = Math.min(
                    Math.round(scroll.offset * linePoints.length),
                    linePoints.length - 1
                );
    
                const curPoint = linePoints[curPointIndex]
                const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
                const xDisplacement = (pointAhead.x - curPoint.x) * 80;
                const angleRotation = (xDisplacement < 0 ? 1 : -1) * Math.min(Math.abs(xDisplacement), Math.PI / 3);
    
                const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(
                        cameraRef.current.rotation.x,
                        angleRotation,
                        cameraRef.current.rotation.z
                    )
                );
                cameraRef.current.quaternion.slerp(targetCameraQuaternion, delta * 1);
                cameraRef.current.position.lerp(curPoint, delta * 24);

            } else if(!cameraRoad) {
                cameraOverview.current.lookAt(0, 0, -90);
                setInitalXPos(97);
                setInitialZPos(44);
                setinitialYPos(1);
            }
        }
    });
    
    

    const {scale} = useSpring({ 
        scale: loaded ? 0.0015 : 0,
    })
    const { opacity: textFadeIn } = useSpring({ 
        opacity: loaded ? 1 : 0,
        delay: loaded ? 1000 : 0
      });
    
    return (
    <>
        <Environment preset="dawn" background blur={0.35}></Environment>
        <group>
            <Sparkles size={ 15 } scale={ [ 250, 25, 60 ] } position={ [50, 5,-100] } rotation={[0, -Math.PI / -3.2, 0]} speed={ 0.9 } count={ 300 }/>
        </group>

        {/* Mirevi Start Logo */}

        <animated.group scale={2.15} position={[-19.85, 0.9, 65]} rotation={[0, -1.05, 0]}>
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
        </animated.group>
        {/* PROJEKTE */}
        {/* Erstes Projekt (Fraktale) */}
        <Frame position={framePosition.frame1} name="persona fractalis" color="#38adcf" img="/poster/fraktalePoster3.png" portalImg="/poster/fraktalePortal.png" show={showInformation} > 
            <Fraktale />
        </Frame>
        <TextComp name="persona fractalis" position={titlePosition.title1} rotation={[0, 0, 0]}/>

        {/* Zweites Projekt (kin) */}
        <Frame position={framePosition.frame2} name="kin_" color="#38adcf" img="/poster/kinPoster3.png" portalImg="/poster/kinPortal.png" show={showInformation} > 
            <Kin />
        </Frame>
        <TextComp name="kin_" position={titlePosition.title2} rotation={[0, 0, 0]}/>
        
        {/* Drittes Projekt (Klima) */}
        <Frame position={framePosition.frame3} name="WDR Klima" color="#38adcf" img="/poster/wdrPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation} > 
            <WDRScene />
        </Frame>
        <TextComp name="WDR Klima" position={titlePosition.title3} rotation={[0, 0.1, 0]}/>
        
        {/* Viertes Projekt (Wall)  */}
        <Frame position={framePosition.frame4} name="Video Wall" color="#38adcf" img="/poster/videowallPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation}> 
            <WallExperience/>
        </Frame>
        <TextComp name="Video Wall" position={titlePosition.title4} rotation={[0, -0.2, 0]} />
        
        {/* Fünftes Projekt (leer) */}
        {/* <Frame position={framePosition.frame5} name="Fünf" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame5']} > 
        </Frame>
        <TextComp name="Fünf" position={titlePosition.title5} rotation={[0, -0.2, 0]} />
         */}
        {/* Sechstes Projekt (leer) */}
        {/* <Frame position={framePosition.frame6} name="Sechs" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame6']}> 
        </Frame>
        <TextComp name="Sechs" position={titlePosition.title6} rotation={[0, -0.2, 0]} />
         */}
        {/* Siebtes Projekt (leer) */}
        {/* <Frame position={framePosition.frame7} name="Sieben" color="#38adcf" img="/textures/escaperoom.png" portalImg="/poster/wdrPortal2.png" show={showInformation['frame7']}> 
        </Frame>
        <TextComp name="Sieben" position={titlePosition.title7} rotation={[0, -0.2, 0]} />
         */}
        {/* {!cameraRoad && active === null && <OrbitControls />} */}
        {/* Camera */}
        {active === null && 
        <>
            {cameraRoad ? (
                <>
                <PerspectiveCamera fov={35} near={0.4} far={35} makeDefault ref={cameraRef} position={[initialXPos, initialYPos, initialZPos]} />
                </>
            ) : (
            <>
            <OrbitControls />
            <PerspectiveCamera fov={35} near={0.4} far={600} makeDefault ref={cameraOverview} position={[5, 17, 50]} /></>
            )}
            <group position-y={-2.5}>
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