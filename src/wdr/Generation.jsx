import React, { useRef, useEffect, useState } from "react";
import { Html, Text, PerspectiveCamera, Environment, OrbitControls , RoundedBox, useVideoTexture} from '@react-three/drei';
import * as THREE from "three";
import IdleVideo from './IdleVideo';

export default function Generation() {
    
    const [activeVideoSrc, setActiveVideoSrc] = useState(null);
    const handleIdleVideoStart = (videoSrc) => {
        setActiveVideoSrc(videoSrc); // Set the active video source
    }
    const video = useVideoTexture(activeVideoSrc);

    // const videoRef = useRef();
    // const [idle, setIdle] = useState(true);

    // const handleStart = () => {
    //     setIdle(false);
    // }

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 0]}/>
            <OrbitControls enablePan={false} target={[1, 0, 0]} />
            <Environment preset='night' background blur={0.4} />

            


        </>
    );
}
