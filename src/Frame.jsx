import { CameraControls, Environment,MeshPortalMaterial,RoundedBox,Text, Stage,useCursor,useTexture, OrbitControls, Html, useVideoTexture, Center} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "r3dy";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useStore } from './stores/useStore';
import * as THREE from "three";
import { useSpring, animated } from '@react-spring/three'
import projectsData from './projectinformation.json'; // Assuming your JSON data is stored in a file named 'projects.json'


const Frame = ({children,name,color,spherePos,...props}) => {

  const project = projectsData.projects.find(project => project.title === name);
  console.log("Projects:", project); // Log the projects data to see if it contains the expected data

  const setActive = useStore((state) => state.setActive);
  const setClickedFrame = useStore((state) => state.setClickedFrame);
  const active = useStore((state) => state.active);
  const [boxactive, setBoxActive] = useState(false);
  const {scale} = useSpring({ scale: boxactive ? 0.6 : 1})
  const myMesh = useRef();

  const [hovered,setHovered] = useState(false)

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

  const portalMaterial = useRef();

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
          <Text color="gray" font="fonts/static/Montserrat-Light.ttf" fontSize={0.3} position={[-5.5, 3.55, 0.02]} anchorX="left">
            {project.title}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text>
          {/* weitere Informationen */}
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
          

          {/* <Text fontSize={0.3} position={[-5.5,3,0]}>
            {name}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text>   */}
        
        {/* Buttons */}
        <mesh onClick={handleRoundedBoxDoubleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} anchorY="bottom" position={[0, -3.8, 0]}>
            <Button text="EXPLORE" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>

        <animated.mesh
              onPointerOver={() => setBoxActive(true)}
              onPointerOut={() => setBoxActive(false)}
              ref={myMesh} scale={scale}>
              <planeGeometry args={[11,6.7]}/>
              <meshStandardMaterial color="gray" />
          </animated.mesh>
        </>
      }

      {/* Fenster für Portal: */}
      {hovered  && (
      <>
      
      <RoundedBox
        args={[9.5, 5.5, 0.2]} position-z={0.1}>
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={0.5} />
          {/*Individuelle Objekte */}
          {children}
        </MeshPortalMaterial>
      </RoundedBox>
      </>
      )}
    </group>
    )
  
};

export default Frame; 
  
  