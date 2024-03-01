import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei'
import * as THREE from "three";
import Run from './Run';
import Runback from './Runback';
import Run2 from './Run2';
import Cactoro from './Cactoro'
import React, { useRef } from 'react';
import {useFrame} from "@react-three/fiber";


export default function Kin()
{
    
    return <>
       
        <OrbitControls target={[24, 0, -43]}/>
        <Run />
        <Runback />
    </>
}

