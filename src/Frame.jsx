import { CameraControls, Environment,MeshPortalMaterial,RoundedBox,Text, Stage,useCursor,useTexture, OrbitControls, Html, useVideoTexture, Center} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useStore } from './stores/useStore';
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three'
import projectsData from './projectinformation.json'; // Assuming your JSON data is stored in a file named 'projects.json'
import FraktalePoster from './Poster/Fraktale.jsx';
import KinPoster from './Poster/Kin.jsx';

const Frame = ({children,name,color,img,spherePos,show,...props}) => {

  const image = useTexture(img);
  const portalElement = useTexture("/textures/fraktaleFensterElement.png");
  const portalMaterial = useRef();

  const project = projectsData.projects.find(project => project.title === name);

  const [hovered,setHovered] = useState(false)
  const setActive = useStore((state) => state.setActive);
  const setClickedFrame = useStore((state) => state.setClickedFrame);
  const active = useStore((state) => state.active);
  const [boxactive, setBoxActive] = useState(false);
  const {scale} = useSpring({ scale: boxactive ? 0.6 : 1})
  const { scale: scaleWindow } = useSpring({ 
    scale: hovered ? 1.5 : 1,
  });
  const { scale: scaleText } = useSpring({ 
    scale: boxactive ? 1 : 0,
    delay: boxactive ? 100 : 0, 
  });

  const myMesh = useRef();

  const positionPortalElement = {
    'persona fractalis': [0.9, -0.8, 0.04],
    'kin_': [2.8, -1.9, 0.04], // Example position for 'kin_'. Adjust as needed.
    'WDR Klima': [2.8, -1.9, 0.04], // Example position for 'kin_'. Adjust as needed.
    'Video Wall': [2.8, -1.9, 0.04], // Example position for 'kin_'. Adjust as needed.
    // Add more positions for other names as needed
  };

  const sizePortalElements = {
    'persona fractalis': [6.3, 4.7],
    'kin_': [4.8,2.8],
    // Add more sizes for other names as needed
  };

  const availableFontSizes = [0.3, 0.35, 0.4, 0.45, 0.5]; // Adjust as needed

  const availablePositions = [
    [-5, -0.9, 0],
    [5, -1.8, 0],
    [5, 2.7, 0],
    [5, -2.7, 0],
    [-1, -2.7, 0],
    // Add more positions as needed
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setHovered(false)
        }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
}, []);

  // enter Portal: 
  const handleRoundedBoxDoubleClick = () => {
    setClickedFrame(name);
    setActive(name);
  };


  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (hovered === true) {
      easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.4, delta);
      }
  });
  return( 
    <group {...props}>
      {/* Position relative zu Frame */}
      {/* Titel */}
      {/* 
      Plane die am Anfang angezeigt wird
      muss als texture Übergabeparameter bekommen (in Experience)
       */}
       
      {active === null && 
        <>
        {/* Infos */}
          {/* Titel */}
          {/* <Text color="gray" font="fonts/static/Montserrat-Light.ttf" fontSize={0.3} position={[-5.5, 3.55, 0.02]} anchorX="left">
            {project.title}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text> */}
          {/* weitere Informationen */}
          {show && (
          <>
          <group position={[-5.6, 3.1, 0.02]}>
            <Text color="gray" font="fonts/static/Montserrat-LightItalic.ttf" fontSize={0.3} anchorX="right">
              {project.year}
              <meshBasicMaterial color="white" toneMapped={false} />
            </Text>
            <Text color="gray" font="fonts/static/Montserrat-LightItalic.ttf" fontSize={0.3} position-y={-0.3} anchorX="right">
              {project.owner}
              <meshBasicMaterial color="white" toneMapped={false} />
            </Text>
          </group>
          <mesh onClick={handleRoundedBoxDoubleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} anchorY="bottom" position={[0, -5, 0]}>
              <Button text="EXPLORE" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
          </mesh>
          </>
        )}
        </>
      }
        {/* Plane */}
        <group>
          <mesh 
          onPointerOver={() => active === null && show && setBoxActive(true)}
          onPointerOut={() => active === null && show && setBoxActive(false)}>
            <planeGeometry args={[11,6.7]} />
            <meshBasicMaterial opacity={0} color="black" transparent />
            <group>
              <animated.group scale={scaleText} position={[0,0,0.08]}>
              {project.tags.map((tag, index) => {
                const position = availablePositions[index % availablePositions.length]; // Select position based on index
                const randomFontSize = availableFontSizes[Math.floor(Math.random() * availableFontSizes.length)];
                return (
                  <Text
                    key={index}
                    position={position}
                    color="black"
                    fontSize={randomFontSize}
                    anchorX="center"
                  >
                    {tag}
                    <meshBasicMaterial /> 
                  </Text>
                );
              })}
              </animated.group>
              <animated.mesh ref={myMesh} scale={scale} position-z={0.02} position-y={0}>
                <planeGeometry args={[11,6.7]}/>
                <meshBasicMaterial map={image} toneMapped={false} side={THREE.DoubleSide} opacity={0.9} transparent />
                {/* Fenster für Portal: */}
                {/* {name === 'persona fractalis' ? ( 
                  <FraktalePoster portalMaterial={portalMaterial} boxactive={boxactive} hovered={hovered} children={children} />
                ) : name === 'kin_' ? (
                  <KinPoster portalMaterial={portalMaterial} boxactive={boxactive} hovered={hovered} children={children}/>
                ) : null} */}

                <animated.mesh scale={scaleWindow} position={positionPortalElement[name]} position-z={0.04}>
                    <planeGeometry args={sizePortalElements[name]}/>
                    <meshBasicMaterial map={portalElement} toneMapped={false} />
                    {/* Sicht in Portal */}
                    {hovered && (
                        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                            <ambientLight intensity={0.5} />
                            {/*Individuelle Objekte */}
                            {children}
                        </MeshPortalMaterial>
                    )}
                </animated.mesh>  
              </animated.mesh>
            </group>
          </mesh>
        </group>  
    </group>
    )
  
};

export default Frame; 
  
  