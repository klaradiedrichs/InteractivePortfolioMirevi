import {Environment, OrbitControls, useAnimations, Html, PerspectiveCamera , Text} from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect, Suspense } from 'react';
import Model1 from './Model1';
import Model2 from './Model2';
import Model3 from './Model3';
import { useStore } from '../stores/useStore';
import { Button, ChipLoader } from "r3dy";

export default function Test()
{
    
  const active = useStore((state) => state.active);

return (
  <>
    <PerspectiveCamera position={[0,-1.2,1]} fov={30} makeDefault />

    {active !== null && <OrbitControls enablePan={false} target={[0, -0.5, -5]} /> }
    <Environment preset='sunset' background blur={0.35} />
    <Text position={[0.2,-1,-6]} fontSize={0.3} font="/Inter_Bold.json">
            Loading Animations...
          <meshStandardMaterial color="black" opacity={0.5}/>
    </Text>
    <ChipLoader rotationAxis="y" speed={1} theme="dark" position={[0.15,-0.55,-3]} scale={0.3}/>
   
   
  </>
);
}

