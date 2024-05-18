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

const LINE_NB_POINTS = 30000;

export default function Experience({ setBackToStart,backToStart})
{
    // const framePosition = {
    //     frame1: new THREE.Vector3(-3, 2, -4),
    //     frame2: new THREE.Vector3(24, 1.8, -43),
    //     frame3: new THREE.Vector3(-3, 1.8, -82), 
    //     frame4: new THREE.Vector3(24, 1.8, -121),
    //     frame5: new THREE.Vector3(-3, 1.8, -160), 
    //     frame6: new THREE.Vector3(24, 1.8, -199),
    //     frame7: new THREE.Vector3(-3, 2.0, -238), 
    //     // Add more frames as needed
    //   };

    // const framePosition = {
    //     frame00: new THREE.Vector3(-3, 2, 74),
    //     frame0: new THREE.Vector3(24, 2, 35),
    //     frame1: new THREE.Vector3(-3, 2, -4),
    //     frame2: new THREE.Vector3(24, 1.8, -43),
    // Curve Poins
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
        [
            //START
            new THREE.Vector3(-15, 0, 71),
            // DREHUNG 1
            new THREE.Vector3(-15, 0, 59),
            // DREHUNG 2
            new THREE.Vector3(-3, 0, 50),
            // Viewpoint1 (LINKS)
            new THREE.Vector3(-2, 0, 5),
            // Drehung nach Rechts
            new THREE.Vector3(20, 0, -10),
            // Viewpoint2 (RECHTS)
            new THREE.Vector3(23, 0, -34),
            // Drehung nach Links
            new THREE.Vector3(1,0,-49),
            // Viewport3 (Links)
            new THREE.Vector3(-2,0,-73),
            // Drehung nach Rechts
            new THREE.Vector3(20, 0, -87),
            // Viewport 4 (RECHTS)
            new THREE.Vector3(23, 0, -112),
            // Drehung nach Links
            new THREE.Vector3(1,0,-127),
            // Viewport 5 (LINKS)
            new THREE.Vector3(-2,0,-151),
            // Drehung nach Rechts
            new THREE.Vector3(20, 0, -166),
            // Viewport 6 (RECHTS)
            new THREE.Vector3(23, 0, -190),
            // Dehung nach Links
            new THREE.Vector3(1,0,-205),
            // Viewport 7 (LINKS)
            new THREE.Vector3(-2, 0, -229),
            // Drehung nach Rechts
            new THREE.Vector3(20, 0, -244),
            // VP 8 RECHTS
            new THREE.Vector3(23, 0, -268),
            // Drehung nach Links
            new THREE.Vector3(18,0,-283),
            new THREE.Vector3(-2, 0, -307),

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

    // scrollPosition
    const active = useStore((state) => state.active);

    // für Start Screen Anzeige
    const loaded = useStore((state) => state.loaded);
    const setLoaded = useStore((state) => state.setLoaded);
    const scroll = useScroll();
    // scroll.offset = 0.2;

    const cameraRoad = useStore((state) => state.cameraRoad);
    const setCameraRoad = useStore((state) => state.setCameraRoad);
    const [beginning, setBeginning] = useState(true);
    const textYPos = 0.3;
    const clickedSpecificPoint = useStore((state) => state.clickedSpecificPoint);
    const setClickedSpecificPoint = useStore((state) => state.setClickedSpecificPoint);
    const [viewPoint,setViewpoint] = useState();
    const [lookAt,setLookAt] = useState();
  
    const titlePosition = {
        title1: new THREE.Vector3(-4, textYPos, 23),
        title2: new THREE.Vector3(24,textYPos,-21),
        title3: new THREE.Vector3(-3,textYPos,-58),
        title4: new THREE.Vector3(26,textYPos,-96),
        title5: new THREE.Vector3(-4, textYPos, -143), 
        title6: new THREE.Vector3(26,textYPos,-186),
        title7: new THREE.Vector3(-4,textYPos,-220),
        title8: new THREE.Vector3(24,textYPos,-274),
    };

    const framePosition = {
        frame1: new THREE.Vector3(-3, 1.8, -4),
        frame2: new THREE.Vector3(25, 1.8, -44),
        frame3: new THREE.Vector3(-3, 1.8, -84), 
        frame4: new THREE.Vector3(25, 1.8, -124),
        frame5: new THREE.Vector3(-3, 1.8, -164), 
        frame6: new THREE.Vector3(25, 1.8, -204),
        frame7: new THREE.Vector3(-3, 1.8, -244), 
        frame8: new THREE.Vector3(25, 1.8, -284), 
        // Add more frames as needed
      };

      -4, 1, 11
    
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

    const [showInformation, setShowInformation] = useState(true);

    // called when user scrolls to show / hide start screen  
    const handleWheel = (e) => {
        setClickedSpecificPoint(false);
        
        if (e.deltaY > 0) {
            setLoaded(false);
        }
        if (e.deltaY < 0) {
            setLoaded(true);
        }
    };

    // runs on every render or when cameraRoad changes
    useEffect(() => {
        // const initialScrollOffset = 0.5; // Assuming 0.5 represents the middle of the page
        // scroll.set(initialScrollOffset);
        setLoaded(true);

        if(cameraRoad){                   
        window.addEventListener("wheel", handleWheel);
        setShowInformation(true);
        }
        else if(!cameraRoad){
        window.removeEventListener("wheel", handleWheel);
        setShowInformation(clickedSpecificPoint ? true : false);
        }
        
        
    
        return () => {
        window.removeEventListener("wheel", handleWheel);
        };
        
    }, [cameraRoad, backToStart, clickedSpecificPoint]);

      const openLink = () => {
        window.open("https://mirevi.de/", "_blank"); // Open the link in a new tab

      }
      

      useFrame((_state, delta) => {
        if (active === null) {
            if (cameraRoad) {
                // const cameraPos = cameraRef.current.position;
    
                // Get an array of all frame positions
                // const allFramePositions = Object.values(framePosition);
                // Calculate distances to all frame positions
                // const distances = allFramePositions.map(framePos => cameraPos.distanceTo(framePos));
    
                // const range = 23;
    
                // if (distances.some(distance => distance <= range)) {
                //     setShowInformation(true);
                // } else if (distances.some(distance => distance >= range)) {
                //     setShowInformation(false);
                // }
    
                const curPointIndex = Math.min(
                    Math.round(scroll.offset * linePoints.length),
                    linePoints.length - 1
                );

                console.log(scroll.offset);
                // scroll.offset.set(0.14);
                const curPoint = linePoints[curPointIndex]
                // wenn normalScroll = true :
                
                const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
                const xDisplacement = (pointAhead.x - curPoint.x) * 50;
                const angleRotation = (xDisplacement < 0 ? 1 : -1) * Math.min(Math.abs(xDisplacement), Math.PI / 3);
    
                const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(
                        cameraRef.current.rotation.x,
                        angleRotation,
                        cameraRef.current.rotation.z
                    )
                );
                // am Anfang: 
                // 
                // dann: 
                cameraRef.current.quaternion.slerp(targetCameraQuaternion, delta * 1);
                cameraRef.current.position.lerp(curPoint, delta * 24);
                
                // wenn normalScroll false (also eine Stelle geklickt wurde ): 
               
                if(curPointIndex === 0){
                    setLoaded(true);
                }
                
            } else if(!cameraRoad) {
                // Blickrichtung für normale Overview

                if(clickedSpecificPoint){
                    
                    // Blickrichtung für ausgewählten Frame (selbe Position aber auf z Achse 5 nach vorne / - )
                    // cameraOverview.current.lookAt(lookAt);
                    cameraOverview.current.lookAt(0, 0, -1000);
                    cameraOverview.current.position.copy(viewPoint);
                }
                else if(!clickedSpecificPoint){
                    cameraOverview.current.lookAt(0, 0, -150);
                    
                }
            }
        }
    });

    const goToProject = (position, lookAt) => {
        if(!cameraRoad) {
            setClickedSpecificPoint(true);
            setViewpoint(position); // Set the viewpoint to the clicked frame's position
        }
    }

    const {scale} = useSpring({ 
        scale: loaded ? 0.0015 : 0,
    })
    const { opacity: textFadeIn } = useSpring({ 
        opacity: loaded ? 1 : 0,
        delay: loaded ? 500 : 0
      });
    const { opacity: roadFadeIn } = useSpring({ 
        opacity: loaded ? 0.5 : 0,
        delay: loaded ? 2500 : 0
      });
    
    return (
    <>
        <Environment preset="dawn" background blur={0.35}></Environment>
        <group>
            <Sparkles size={ 15 } scale={ [ 250, 25, 60 ] } position={ [50, 5,-100] } rotation={[0, -Math.PI / -3.2, 0]} speed={ 0.9 } count={ 300 }/>
        </group>

        {/* Mirevi Start & End Screen*/}
        <animated.group scale={2.15} position={[-15, 0.8, 63]} rotation={[0, 0, 0]}>
            <Text scale={0.6} position={[0,-0.5,0]} color="white" font="fonts/PlayfairDisplay-Regular.ttf" fontSize={0.1}>
                ... an immersive web exhibiton to get insights about MIREVI projects
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            <Text scale={0.45} position={[-0.1,-0.61,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                Learn more about 
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            <Text onPointerOver={() => setLinkHovered(true)} onPointerOut={() => setLinkHovered(false)} onClick={openLink} scale={0.45} position={[0.215,-0.61,0]} color={linkHovered? "black" : "white"} font="fonts/static/Montserrat-Light.ttf" fontSize={0.1}>
                mirevi.de
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />
            </Text>
            <Text scale={0.32} position={[0.02,-1.28,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.105}>
                Scroll to start exploring
                <animated.meshBasicMaterial color="white" opacity={textFadeIn} toneMapped={false} />            
            </Text>
            {loaded && (
            <Svg position={[0.01,-1.34,0]} scale={0.0015} src={svg}>
                <meshStandardMaterial />
            </Svg>
            )}
            <mesh position={[-0.07,-0.06,0]} scale={[1.2,0.7,0]}>
                <planeGeometry />
                <animated.meshBasicMaterial map={logo} opacity={1} transparent toneMapped={false} side={THREE.DoubleSide}/>
            </mesh>
        </animated.group>
        <group scale={3} position={[-0.5, 0.5, -305]} rotation={[0, 0.7, 0]}>
            <Text scale={1} position={[0,0.5,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.15}>
                Thanks for visiting
                <meshBasicMaterial color="white" opacity={1} toneMapped={false} />
            </Text>
            <Text scale={0.45} position={[0,-0.6,0]} color="white" font="fonts/static/Montserrat-Light.ttf" fontSize={0.12}>
                ... more projects coming soon
                <meshBasicMaterial color="white" opacity={1} toneMapped={false} />
            </Text>
            <mesh position={[-0.07,-0.06,0]} scale={[1.2,0.7,0]}>
                <planeGeometry />
                <meshBasicMaterial map={logo} opacity={1} transparent toneMapped={false} side={THREE.DoubleSide}/>
            </mesh>
        </group>

        {/* PROJEKTE */}
        {/* Erstes Projekt (Fraktale) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame1.x  -0.5, framePosition.frame1.y -0.8, framePosition.frame1.z + 15))} position={framePosition.frame1} name="persona fractalis" color="#38adcf" img="/poster/fraktalePoster3.png" portalImg="/poster/fraktalePortal.png" show={showInformation} > 
            <Fraktale />
        </Frame>
        <TextComp name="persona fractalis" position={titlePosition.title1} rotation={[0, 0, 0]}/>

        {/* Zweites Projekt (kin) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame2.x, framePosition.frame2.y -0.8, framePosition.frame2.z + 15))} position={framePosition.frame2} name="kin_" color="#38adcf" img="/poster/kinPoster3.png" portalImg="/poster/kinPortal.png" show={showInformation} > 
            <Kin />
        </Frame>
        <TextComp name="kin_" position={titlePosition.title2} rotation={[0, 0, 0]}/>
        
        {/* Drittes Projekt (Klima) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame3.x, framePosition.frame3.y -0.8, framePosition.frame3.z + 15))} position={framePosition.frame3} name="WDR Klima" color="#38adcf" img="/poster/wdrPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation} > 
            <WDRScene />
        </Frame>
        <TextComp name="WDR Klima" position={titlePosition.title3} rotation={[0, 0.1, 0]}/>
        
        {/* Viertes Projekt (Wall)  */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame4.x, framePosition.frame4.y -0.8, framePosition.frame4.z + 15))} position={framePosition.frame4} name="Video Wall" color="#38adcf" img="/poster/videowallPosterNew.png" portalImg="/poster/wdrPortal2.png" show={showInformation}> 
            <WallExperience/>
        </Frame>
        <TextComp name="Video Wall" position={titlePosition.title4} rotation={[0, -0.2, 0]} />
        
        {/* Fünftes Projekt (leer) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame5.x, framePosition.frame5.y -0.8, framePosition.frame5.z + 15))} position={framePosition.frame5} name="Five" color="#38adcf" img={null} portalImg={null} show={showInformation} > 
        </Frame>
        <TextComp name="Five" position={titlePosition.title5} rotation={[0, -0.2, 0]} />
        
        {/* Sechstes Projekt (leer) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame6.x, framePosition.frame6.y -0.8, framePosition.frame6.z + 15))} position={framePosition.frame6} name="Six" color="#38adcf" img={null} portalImg={null} show={showInformation}> 
        </Frame>
        <TextComp name="Six" position={titlePosition.title6} rotation={[0, -0.2, 0]} />
        
        {/* Siebtes Projekt (leer) */}
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame7.x, framePosition.frame7.y -0.8, framePosition.frame7.z + 15))} position={framePosition.frame7} name="Seven" color="#38adcf" img={null} portalImg={null} show={showInformation}> 
        </Frame>
        <TextComp name="Seven" position={titlePosition.title7} rotation={[0, -0.2, 0]} />
        
        <Frame onClick={() => goToProject(new THREE.Vector3(framePosition.frame8.x, framePosition.frame8.y -0.8, framePosition.frame8.z + 15))} position={framePosition.frame8} name="Eight" color="#38adcf" img={null} portalImg={null} show={showInformation}> 
        </Frame>
        <TextComp name="Eight" position={titlePosition.title8} rotation={[0, -0.2, 0]} />
        
        {/* {!cameraRoad && active === null && <OrbitControls />} */}
        {/* Camera  */}
        <>
            {cameraRoad  ? (
                <>
                <PerspectiveCamera fov={35} near={1} far={38} makeDefault ref={cameraRef} position={[initialXPos, initialYPos, initialZPos]} />
                </>
            ) : (
            <>
            <OrbitControls enableZoom={true} target={[0,0,-118]}/>
            <PerspectiveCamera fov={35} near={0.4} far={clickedSpecificPoint ? 30 : 600} makeDefault ref={cameraOverview} position={!clickedSpecificPoint && [10, 30, 70]} /></>
            )}
            
            <group position-y={-2.5}>
                <mesh>
                    <extrudeGeometry
                    args={[ shape, { steps: LINE_NB_POINTS, bevelEnabled: true, extrudePath: curve,curveSegments: 50, bevelThickness: 10 },]} />
                    <animated.meshStandardMaterial color={"white"} opacity={clickedSpecificPoint ? 0 : 0.3} transparent />
                </mesh>
            </group>
            
        </>
        
        {/* Player muss immer aktiv sein, um nach Portal wieder an selbe Stelle zu gelangen */}
        {/* <PlayerRoad active={active} setBackToStart={setBackToStart} backToStart={backToStart} cameraRoad={cameraRoad} /> */}
    </>
    )
};