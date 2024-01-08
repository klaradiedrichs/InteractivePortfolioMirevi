import { Environment, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'
import { useSpring } from 'react-spring';

  
function Experience({ cameraRoad })
{
    const textRef = useRef();

    const plane = useRef()

    const [rotationAngle, setRotationAngle] = useState([0,0,0])
    const [scale, setScale] = useState([7.5,4,0])
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

    // Add event listener for wheel event
    useEffect(() => {
        document.addEventListener('wheel', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);
    

    return (
        <>
        <Stage adjustCamera={false}>
        <Environment preset="night" background blur={0.4}></Environment>

        
        {/* Mitte */}
        
        {/* <group position={[0,3,-7]}>
            <spotLight intensity={0}/>
            <mesh scale={0.2}>
                <sphereGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </group> */}
        {/* First */}
        <group>
            <mesh onClick={handleRotate} castShadow position={[0,2.8,-8]} scale-x={scale[0]} scale-y={scale[1]} rotation={rotationAngle}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
            <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
        </group>


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

        {/* <TransformControls object={plane} mode="rotate"/> */}

        {/* <mesh ref={ plane } rotation={[0, -Math.PI / -3.2, 0]} scale={[130,1,0]} position={[10,0,-30]}>
            <boxGeometry/>
        </mesh> */}
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

        {/* Player / Camera Controller */}
        <Player cameraRoad={cameraRoad}/>
        </Stage>
        </>
        )
    
}

export default Experience;