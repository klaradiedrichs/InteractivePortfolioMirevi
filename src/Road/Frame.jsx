import { CameraControls, Environment,MeshPortalMaterial,RoundedBox,Text, Stage,useCursor,useTexture, OrbitControls, Html, useVideoTexture, Center} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useStore } from '../stores/useStore';
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three'
import projectsData from '../projectinformation.json'; // Assuming your JSON data is stored in a file named 'projects.json'

const Frame = ({children,name,color,img,portalImg, spherePos,show,...props}) => {

  const image = useTexture(img);
  const portalElement = useTexture(portalImg);
  const portalMaterial = useRef();

  const project = projectsData.projects.find(project => project.title === name);

  const [hovered,setHovered] = useState(false)
  const setActive = useStore((state) => state.setActive);
  const setClickedFrame = useStore((state) => state.setClickedFrame);
  const active = useStore((state) => state.active);
  const [boxactive, setBoxActive] = useState(false);
  const {scale} = useSpring({ scale: boxactive ? 0.6 : 1})

  const sizePortalElements = {
    'persona fractalis': [5.5, 3.1, 0],
    'kin_': [4.4,3.75, 0],
    'WDR Klima' : [3.9,3.1, 0],
    'Video Wall' : [4.4,3.27, 0],
    // Add more sizes for other names as needed
  };
  const positionPortalElement = {
    'persona fractalis': [-1.7, -1.8, 0.4],
    'kin_':  [3.3, -1.47, 0.4], // Example position for 'kin_'. Adjust as needed.
    'WDR Klima': [0.9, -1.75, 0.04], // Example position for 'kin_'. Adjust as needed.
    'Video Wall': [-3.2, -1.28, 0.04], // Example position for 'kin_'. Adjust as needed.
    // Add more positions for other names as needed
  };
  const { scale: scaleWindow } = useSpring({
    scale: hovered ? [11, 6.7, 1] : sizePortalElements[name],
    delay: hovered ? 200 : 0
  });

  const { position: positionWindow } = useSpring({ 
    position: hovered ?  [0,0,0.04] : positionPortalElement[name],
    delay: hovered ? 200 : 0
  });

  const { scale: scaleText } = useSpring({ 
    scale: boxactive ? 1 : 0,
    delay: 200 
  });

  const { opacity: opacityPoster } = useSpring({ 
    opacity: boxactive ? 0.4 : 1,
    // immediate: boxactive
  });
  const { opacity: textFadeIn } = useSpring({ 
    opacity: boxactive ? 1 : 0,
    delay: boxactive ? 300 : 0
    // immediate: boxactive
  });

  const myMesh = useRef();

  const availablePositions = [
    {
      "persona fractalis":
      [
        [1.3, -2.9, 0],
        [-0.4, -0.9, 0],
        [2, 2, 0],
        [2.8, -1.79, 0],
        [-3.5, -2.3, 0],
      ],
      "kin_":[
        [-3.5, -2.7, 0],
        [1, -0.7, 0],
        [2.8, -2.2, 0],
        [-2.2, 1.6, 0],
      ],
      "WDR Klima": 
      [
        [-2.2, -2, 0],
        [1, 2, 0],
        [2.8, -2.6, 0],
        [3.2, 0.7, 0],
        [-3.5, -2.3, 0],
      ],
      "Video Wall" : 
      [
        [-2.2, -2, 0],
        [1, 2, 0],
        [2.8, -2.6, 0],
        [3.2, 0.7, 0],
        [-3.5, -2.3, 0],
      ]
    }
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
      {/* Keywords */}
      {project && project.tags && (
        <animated.group position={[0, 0, 4]}>
          {project.tags.map((tag, index) => {
            const positions = availablePositions.find(pos => pos[name]);
            const position = positions && positions[name] ? positions[name][index] : [0, 0, 0];
            return (
              <Text
                // scale={scaleText}
                font="fonts/static/Montserrat-Regular.ttf"
                key={index}
                position={position}
                fontSize={0.6}
                anchorX="center"
              >
                {tag}
                <animated.meshStandardMaterial opacity={textFadeIn} color="#FFFFFF" emissive="white"/> 
              </Text>
            );
          })}
        </animated.group>
      )}
        {/* Plane */}
        <group>
          {/* große transparente Plane -> für onHover State  */}
          <mesh 
          onPointerOver={() => active === null && show && setBoxActive(true)}
          onPointerOut={() => active === null && show && setBoxActive(false)}>
            <planeGeometry args={[11,6.7]} />
            <meshBasicMaterial color={'#bfbcdc'} opacity={0.3} transparent/>
            <group>
              

              {/* Plane mit Grafikposter (wird kleiner) */}
              <animated.mesh ref={myMesh} scale={scale} position-z={0.02} position-y={0}>
                <planeGeometry args={[11,6.7]}/>
                <animated.meshBasicMaterial map={image} toneMapped={false} side={THREE.DoubleSide} opacity={opacityPoster} transparent />
                {/* Fenster für Portal: */}
                {/* {name === 'persona fractalis' ? ( 
                  <FraktalePoster portalMaterial={portalMaterial} boxactive={boxactive} hovered={hovered} children={children} />
                ) : name === 'kin_' ? (
                  <KinPoster portalMaterial={portalMaterial} boxactive={boxactive} hovered={hovered} children={children}/>
                ) : null} */}

                {/* Portalwindow (wird größer onHover auf Button) */}
                {hovered && (
                <animated.mesh scale={scaleWindow} position={positionWindow}>
                    <planeGeometry />
                    <animated.meshBasicMaterial opacity={0} transparent toneMapped={false} />
                    {/* Sicht in Portal OnHover übr Button */}
                    
                        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                            <ambientLight intensity={0.5} />
                            {/*Individuelle Objekte */}
                            {children}
                        </MeshPortalMaterial>
                    
                </animated.mesh>
                 )} 
              </animated.mesh>
            </group>
          </mesh>
        </group>  
    </group>
    )
  
};

export default Frame; 
  
  