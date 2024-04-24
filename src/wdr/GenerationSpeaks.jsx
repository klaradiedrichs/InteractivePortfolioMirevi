import { Html, MeshReflectorMaterial, CameraControls, useVideoTexture,OrbitControls , PerspectiveCamera, Environment} from '@react-three/drei'
import * as THREE from "three";
import React, { useState, useEffect, useRef,useMemo } from "react";
import { act, useFrame } from "@react-three/fiber";



export default function Experience()
{
    const videoRef = useRef();

    useFrame(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    });
    const texture = useVideoTexture("/videos/leoniewithaudio.mp4", { muted: false, autoplay: false, loop: false, start: true, unsuspend: 'canplaythrough' });

    return <>
        
        <PerspectiveCamera makeDefault />
        <OrbitControls enablePan={false} target={[0, -1, -6]} />
        <Environment preset='dawn' background blur={0.4}>
        <color args={ [ '#C39BD3 ' ] } attach="background" />
        {/* <mesh position-z={ - 5 } scale={ 100 }>
            <planeGeometry />
            <meshBasicMaterial color={"#5B2C6F"} />
        </mesh>  */}
        </Environment>
        {/* <color args={ [ '#C39BD3 ' ] } attach="background" /> */}
        <color attach="background" args={['black']} />

        {/* <mesh position={[1,-0.5,-2]} scale={1.5}>
            <planeGeometry />
            <VideoMaterial url="/videos/leoniewithaudio.mp4" />
        </mesh> */}
        <mesh position={[1,-0.5,-2]} scale={1.5}>
            <planeGeometry />
            <meshBasicMaterial map={texture} toneMapped={false}>
                {/* <Html position={[1,-0.5,-2]}>
                    <video controls ref={videoRef} autoPlay loop muted>
                        <source src="/videos/leoniewithaudio.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Html> */}
            </meshBasicMaterial>
        </mesh>
        {/* <mesh position={[0,-1.5,-5]}>
            <planeGeometry />
            <VideoMaterial url="/videos/Aquazoo.mp4" />
        </mesh> */}
        
        
        {/* <mesh receiveShadow position-y={-1.5} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="black" opacity={1} transparent/>
        </mesh> */}

        {/* <PerspectiveCamera fov={60} makeDefault /> */}
        {/* <OrbitControls target={[0, 0, 0]} /> */}
        {/* <color args={ [ 'black' ] } attach="background" /> */}
        {/* <Environment preset='night' background blur={0.5} />
        <PerspectiveCamera fov={60} makeDefault />
        <OrbitControls target={[0, -1, 0]} />
        <mesh position={[0,-1,0]}>
            <sphereGeometry args={[1, 200, 200]}/>
            <VideoMaterial url="/M09-1317.mp4" />        
        </mesh> */}

        {/* <mesh position={[0,0,30]}>
            <boxGeometry />
            <meshBasicMaterial opacity={0} transparent/>        
        </mesh>
        <mesh position={[0,0,20]}>
            <planeGeometry />
            <VideoMaterial url="/videos/Aquazoo.mp4" />
        </mesh> */}
        
    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url, { muted: false, autoplay: false, loop: false, start: true, unsuspend: 'canplaythrough' });

    return <meshBasicMaterial map={texture} toneMapped={false} />
  }
  