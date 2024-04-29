import React, { useRef, useEffect, useState } from "react";
import { Html, Text, PerspectiveCamera, Environment, OrbitControls , RoundedBox, useVideoTexture} from '@react-three/drei';
import * as THREE from "three";
import IdleVideo from './IdleVideo';
import { useSpring, animated } from '@react-spring/three'
import { useStore } from '../stores/useStore';

export default function Experience() {
    
    // const [idleVideo,setIdleVideo] = useState(true)
    const [activeVideoSrc, setActiveVideoSrc] = useState("/videos/wdr/leonieIdle.webm");
    const videoTexture = useVideoTexture(activeVideoSrc, { muted: false });
    const idleVideo = useStore((state) => state.idleVideo);
    const setIdleVideo = useStore((state) => state.setIdleVideo);
    
    const handleIdleVideoStart = (videoSrc) => {
        setTimeout(() => {
            setIdleVideo(false);
            setActiveVideoSrc(videoSrc); // Set the active video source
        }, 200);        
        
        
    }

    const handleBack = () => {
        setIdleVideo(true)
    }
    const { opacity: video } = useSpring({
        opacity: idleVideo ? 0 : 1, // Set opacity based on idleVideo state
        delay: !idleVideo ? 500: 0
    });
    
    const meshPosition = activeVideoSrc === "/videos/wdr/leonie.webm" ? [5.7, -0.15, 0] : [4, -0.15, 0]; 

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0.02, 0]}/>
            <OrbitControls enablePan={false} target={[1, 0, 0]} />
            <Environment preset='forest' background blur={0.3} />
            <spotLight position={[4.5, -0.25, 1.8]}/>
            {/* Orientierung */}
            
            {/* {idleVideo && ( */}
            <group> 
                <IdleVideo  position={[4.5, -0.25, 1.8]} name="Leonie" beschreibung="und Klimawandel weltweit" videoSrc="/videos/wdr/leonieIdle.webm" htmlPosition={[0,2.7,-1.8]} onStart={() => handleIdleVideoStart("/videos/wdr/leonie.webm")} />
                <IdleVideo  position={[4.51, -0.25, 0.6]} name="Aaron" beschreibung="und der Wald" videoSrc="/videos/wdr/aaronIdle.webm" htmlPosition={[0,3.45,-1.7]} onStart={() => handleIdleVideoStart("/videos/wdr/aaron.webm")}/>
                <IdleVideo  position={[4.52, -0.25, -0.6]} name="Anna" beschreibung="und die Landwirtschaft" videoSrc="/videos/wdr/annaIdle.webm" htmlPosition={[0,3.4,-2]} onStart={() => handleIdleVideoStart("/videos/wdr/anna.webm")}/>
                <IdleVideo  position={[4.53, -0.25, -1.8]} name="Tina" beschreibung="und die Braunkohle" videoSrc="/videos/wdr/tinaIdle.webm" htmlPosition={[0,3.45,-2]} onStart={() => handleIdleVideoStart("/videos/wdr/tina.webm")} />
            </group>
            {/* )} */}

            {!idleVideo && (
                <group position={meshPosition} rotation={[0, -1.57, 0]}>
                    <mesh>
                        <planeGeometry args={[2.7, 5, 1]} />
                        <animated.meshBasicMaterial map={videoTexture} opacity={video} transparent />
                    </mesh>
                    <group position={[0,-1.65,0.01]}>
                        <mesh onClick={handleBack}>
                            <planeGeometry args={[0.3, 0.12, 1]} />
                            <meshBasicMaterial color="#1E4738" opacity={0.5} transparent />
                        </mesh>
                        <Text position={[0, 0, 0.01]} color="white" fontSize={0.06}>
                            GO BACK
                            <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white" />
                        </Text>
                    </group>
                </group>
            )}


        </>
    );
}
