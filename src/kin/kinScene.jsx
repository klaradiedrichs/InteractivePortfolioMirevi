import {Environment, OrbitControls, useAnimations, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect, Suspense } from 'react';
import Model1 from './Model1';
import Model2 from './Model2';
import Model3 from './Model3';
import { useStore } from '../stores/useStore';
import Loading from './Loading.jsx';
import Test from './Test.jsx';
import { Button, ChipLoader } from "r3dy";

export default function Kin()
{
    
  const active = useStore((state) => state.active);



return (
  <>
    <PerspectiveCamera position={[0,-1.2,1]} fov={30} makeDefault />

    {active !== null && <OrbitControls enablePan={false} target={[0, -0.5, -5]} /> }
    <Environment preset='sunset' background blur={0.35} >
      
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
   {/* <Test /> */}
   <Suspense fallback={<ChipLoader theme="dark" scale={0.3} position={[0,-0.5,-3]}/>}>
   <Model1 />
   <Model2 />
   <Model3 />
   </Suspense>
  </>
);
}

