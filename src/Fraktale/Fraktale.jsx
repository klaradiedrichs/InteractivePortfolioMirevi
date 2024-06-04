import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls , PerspectiveCamera, Environment} from '@react-three/drei'
import * as THREE from "three";
import { useStore } from '../stores/useStore';
import React, { useRef, useEffect, Suspense } from 'react';


export default function Experience()
{

    const active = useStore((state) => state.active);

    

    return <>
        
       
        <PerspectiveCamera position={[0,-1,0]} fov={90} makeDefault />
        {active != null && (
        <OrbitControls enableZoom={true} enablePan={false} target={[0, -1, 0]} />
        )}
        <Suspense fallback={null}>
        <mesh position={[0,-1,0]}>
            <sphereGeometry args={[10, 100, 100]}/>
            <VideoMaterial url="/videos/Fraktale02_Original.mp4" />        
        </mesh>
        </Suspense>

    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.BackSide} />
  }