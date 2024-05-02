import {Environment, OrbitControls, useAnimations, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect } from 'react';
import Model1 from './Model1';
import Model2 from './Model2';
import Model3 from './Model3';
export default function Kin()
{
    



return (
  <>
    <PerspectiveCamera makeDefault />
    {/* <OrbitControls enablePan={false} target={[0, -1, -6]} /> */}
    <Environment preset='apartment' background blur={0.4}>
    {/* <color args={ [ '#C39BD3 ' ] } attach="background" />
    <mesh position-z={ - 5 } scale={ 100 }>
        <planeGeometry />
        <meshBasicMaterial color={"#5B2C6F"} />
    </mesh> */}
    </Environment>
    {/* <color attach="background" args={['#101010']} /> */}
    
    {/* <mesh receiveShadow position-y={-1.5} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="black" opacity={1} transparent/>
      </mesh> */}
    {/* Avatar Sitzend */}
    {/* <Model1 /> */}
    {/* Avatar Liegend */}
    {/* <Model2 /> */}
    {/* Avatar Stehend */}
    {/* <Model3 /> */}
    
  </>
);
}

