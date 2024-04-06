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
    <PerspectiveCamera fov={75} makeDefault />
    <OrbitControls target={[0, -2, -10]} />
    <Environment preset='apartment' background blur={0.5} />
    <Model1 />
    {/* <Model2 /> */}
    <Model3 />
    
  </>
);
}

