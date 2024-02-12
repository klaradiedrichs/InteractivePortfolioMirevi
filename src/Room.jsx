import { CameraControls, Environment , Stage, Text, SpotLight, useDepthBuffer, OrbitControls} from "@react-three/drei";
import { useControls } from 'leva';
import Player from "./Player";
import React, { useRef } from "react";



function Room ({cameraRoad }) {

    const textRef = useRef();

    const {scale, position} = useControls('Wall1', {
        scale:
        {
            value: {x:1.5,y:9.82,z:55},
            step: 0.01,
            min:0
        },
        position:
        {
            value:{x: -3, y:3.40, z:0},
            step:0.01,
            joystick:'invertY'
        }
    })
    const {scale2, position2} = useControls('Wall2', {
        scale2:
        {
            value: {x:1.5,y:9.82,z:55},
            step: 0.01,
            min:0
        },
        position2:
        {
            value:{x: 3, y:3.40, z:0},
            step:0.01,
            joystick:'invertY'
        }
    })

    return(

        <>
        {/* <OrbitControls /> */}
        <Stage adjustCamera={false}>
            {/* CameraStart */}
            <mesh castShadow position={[0,2,0]} scale={3}>
                <boxGeometry />
                <meshStandardMaterial color="grey" />
            </mesh>
            <mesh castShadow position={[15,5,0]} scale={7}>
                <boxGeometry />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* First */}
            <group>
                <mesh castShadow position={[0,3,-8]} scale-x={7.5} scale-y={4} scale-z={0.4}>
                    <boxGeometry />
                    <meshStandardMaterial color="dimgrey" />
                </mesh>
                <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
            </group>

            {/* Second Project */}
            <group>
                <mesh castShadow position={[20,3,-48]} scale-x={7.5} scale-y={4} scale-z={0.4}>
                    <boxGeometry />
                    <meshStandardMaterial color="dimgrey" />
                </mesh>
                {/* <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text> */}
            </group>

            {/* Third Project */}
            <group>
                <mesh castShadow position={[50,3,-88]} scale-x={7.5} scale-y={4} scale-z={4}>
                    <boxGeometry />
                    <meshStandardMaterial color="dimgrey" />
                </mesh>
                    <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
            </group>
            
        </Stage>
        </>
    )


}

export default Room;