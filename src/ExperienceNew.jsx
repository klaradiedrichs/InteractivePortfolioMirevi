import { Environment, useTexture, RoundedBox,MeshPortalMaterial, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, OrbitControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'
import PlayerNew from './PlayerNew';
import * as THREE from "three";
import Frame from './Frame';
import Room from './Room';

// import Frame from './fFrame';
  
export default function Experience({ cameraRoad })
{
    // track if user is in World or not
    // by default: null -> in no world
    const [active, setActive] = useState(true); // "default" or "otherScene"
    const textRef = useRef();

    // Scaling/Rotating walls onClick
    const [rotationAngle, setRotationAngle] = useState([0,0,0])
    const [scale, setScale] = useState([7.5,4,0])

    // Transition
    const [transitioning, setTransitioning] = useState(false);
    const [opacity, setOpacity] = useState(active ? 0 : 1);

     
    // const [position, setPosition] = useState[[]]
   
    const handleRotate =() =>{
        setRotationAngle([0, -0.2, 0]);
        setScale([9.5,5.1,0])
    }
    const handleScroll = () => {
        // Reset rotation and scale to default values
        setRotationAngle([0, 0, 0]);
        setScale([7.5,4,0])
    };

    const handleActive = () => {
        if (!transitioning) {
          setTransitioning(true);
          animateOpacity(0, () => {
            setActive(false);
            setTransitioning(false);
          });
        }
      };
    
      const handleNotActive = () => {
        if (!transitioning) {
          setActive(true);
          setTransitioning(true);
          animateOpacity(1, () => {
            setTransitioning(false);
          });
        }
      };
    
      const animateOpacity = (targetOpacity, onComplete) => {
        const startOpacity = opacity;
        let startTime;
    
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
    
          const progress = Math.min((timestamp - startTime) / 1000, 1);
          const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
    
          setOpacity(currentOpacity);
    
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            onComplete && onComplete();
          }
        };
    
        requestAnimationFrame(animate);
      };
    // Add event listener for wheel event
    useEffect(() => {
        document.addEventListener('wheel', handleScroll);
        let opacityTimer;
        if (active === 'otherScene') {
          opacityTimer = setTimeout(() => {
            setOpacity(0);
          }, 1000); // You can adjust the duration as needed
        }
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('wheel', handleScroll);
            clearTimeout(opacityTimer);

        };
    }, [active]);

    return (
        <>
        <ambientLight intensity={0.5} />
        <Environment preset="night" background blur={0.4}></Environment>
        <mesh onClick={handleActive}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
        <mesh onClick={handleNotActive} position={[2,0,0]}>
            <boxGeometry />
            <meshStandardMaterial color="blue"/>
        </mesh>

        {active ? (
        <>
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
            
        {/* First */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[0,2.8,-8]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
            <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
        </group> 
        {/* Second Project */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[20,2.8,-48]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* Third Project */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[45,2.8,-88]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        
        {/* Fourth Project */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[80,2.8,-128]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* Fifth */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[115,2.8,-168]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}

        {/* PLAYER  */}
        <PlayerNew cameraRoad={cameraRoad} />
        </>
        ) : ( <Room opacity={opacity}/>)}
        

        
        </>
        )
    
};
