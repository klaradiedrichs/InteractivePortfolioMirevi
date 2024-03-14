import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Text, Html, MeshReflectorMaterial, PointerLockControls, useVideoTexture } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Physics } from '@react-three/rapier';
import { useKeyboardControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../stores/useStore';

export default function Experience() {
 
  const initialVideoStates = {
    plane1: false,
    plane2: false,
    plane3: false,
    plane4: false,
    plane5: true,
    plane6: false,
    plane7: false,
    plane8: false,
    // Add more planes as needed
  };
  // if cameraRef in range around plane -> play video 
  const [videoPlaying, setVideoPlaying] = useState(initialVideoStates); // State to track video playing status for each plane

  const active = useStore((state) => state.active);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const controlsRef = useRef();
  const positiony = 2.5;

  const planePositions = {
    plane1: new THREE.Vector3(32.5, 2.5, 3),
    plane2: new THREE.Vector3(29, 2.5, -11),
    plane3: new THREE.Vector3(20,positiony,-22),
    plane4: new THREE.Vector3(7.2,positiony,-28),
    plane5: new THREE.Vector3(-7.2,positiony,-28),
    plane6: new THREE.Vector3(-20,positiony,-22),
    plane7: new THREE.Vector3(-29,positiony,-11),
    plane8: new THREE.Vector3(-32,positiony,3),
    // Add more planes as needed
  };

  const cameraRef = useRef();

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('click', () => {
      document.body.requestPointerLock();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        toggleVideo('plane1'); // Call toggleVideo function when Enter key is pressed
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.removeEventListener('click', () => {
        document.body.requestPointerLock();
      });
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this effect runs only once on component moun
 
  // Function to toggle video playing state for a specific plane
  const toggleVideo = (plane) => {
    setVideoPlaying((prevState) => ({
      ...prevState,
      [plane]: !prevState[plane],
    }));
  };

   // Check if camera is near any of the planes and toggle video playing accordingly
   useFrame((state, delta) => {

    const { forward, backward, leftward, rightward } = getKeys();
    const moveSpeed = 6;
 
    if (forward) cameraRef.current.translateZ(-moveSpeed * delta);
    if (backward) cameraRef.current.translateZ(moveSpeed * delta);
    if (leftward) cameraRef.current.translateX(-moveSpeed * delta);
    if (rightward) cameraRef.current.translateX(moveSpeed * delta);

    const cameraPos = cameraRef.current.position;

    // Define the range within which the video should start playing
    const range = 10;
    // Check the distance of the camera from each plane and toggle video playing state accordingly
    Object.entries(videoPlaying).forEach(([plane, playing]) => {
      const distance = cameraPos.distanceTo(planePositions[plane]);

      if (distance <= range && !playing) {
        // If camera is within range of any plane and the video is not already playing for that plane, start playing the video
        toggleVideo(plane);
      } else if (distance > range && playing) {
        // If camera is not within range of any plane and the video is playing for that plane, stop playing the video
        toggleVideo(plane);
      }
    });
  });

  return (
    <>
 
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.1} />
 
        {/* <Html position={[0, 2, 0]}>
          <div className="top-3" style={{ textAlign: 'center', color: 'white', fontSize: '20px', opacity: 0.5 }}>
            Control with W, A, S, D
          </div>
        </Html> */}
            {/* <group position={[-32,positiony,3]} rotation={[0, 1.55, 0]} >
              <mesh scale-x={scaleX} scale-y={scaleY} >
                  <planeGeometry />
                  <meshStandardMaterial color="white"/>
              </mesh>
              <mesh castShadow scale-x={scaleX-0.07} scale-y={scaleY-0.07} position-z={0.01}>
                  <planeGeometry />
                  <VideoMaterial url="M09-1317.mp4" />
                  <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                  IQAROS
                  </Text>
              </mesh>
            </group>  */}
       {/* Render planes with videos */}
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={planePositions.plane1} rotation={[0, -1.5, 0]} playing={videoPlaying['plane1']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[29,positiony,-11]} rotation={[0, -1.1, 0]} playing={videoPlaying['plane2']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[20,positiony,-22]} rotation={[0, -0.7, 0]} playing={videoPlaying['plane3']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[7.2,positiony,-28]} rotation={[0, -0.25, 0]} playing={videoPlaying['plane4']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[-7.2,positiony,-28]} rotation={[0, 0.25, 0]} playing={videoPlaying['plane5']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[-20,positiony,-22]} rotation={[0, 0.7, 0]} playing={videoPlaying['plane6']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[-29,positiony,-11]} rotation={[0, 1.1, 0]} playing={videoPlaying['plane7']} />
       <PlaneWithVideo url="M09-1317.mp4" image="textures/test.jpg" position={[-32,positiony,3]} rotation={[0, 1.55, 0]} playing={videoPlaying['plane8']} />
      {/* Add more PlaneWithVideo components as needed */}

        {/* Other components */}
        <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position-y={2} />
        <PointerLockControls enabled={active === null ? false : true} ref={controlsRef} args={[cameraRef.current]} />

        {/* Other components */}   
      
        <mesh position-y={0} position-z={-10} rotation-x={-Math.PI * 0.5} scale={80}>
          <planeGeometry />
          <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.5} color="black" />
        </mesh>
 
        {/* <Player /> */}
    </>
  );
}
 
function PlaneWithVideo({ position, rotation, playing, url, image}) {

  const scaleX = 7.8
  const scaleY = 4.5
  // const image = useTexture(texturePlane)
  return (
    <group position={position} rotation={rotation}>
      <mesh scale-x={scaleX} scale-y={scaleY}>
        <planeGeometry />
        <meshStandardMaterial color="black"/>
      </mesh>
      {/* {playing && ( // Conditionally render the mesh only when playing is true */}
        <mesh castShadow scale-x={scaleX-0.07} scale-y={scaleY-0.07} position-z={0.01}>
          <planeGeometry />
          <VideoMaterial url={url} image={image} playing={playing}/>
          <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
            IQAROS
          </Text>
        </mesh>
      {/* )} */}
    </group>
  );
}

function VideoMaterial({ url,image , playing }) {
  const texture = useVideoTexture(url);
  const img = useTexture(image);

  // Use useMemo to prevent unnecessary re-renders when 'playing' prop changes
    // If not playing, return a material without the video texture
    if(playing){
    return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />;
    }
    else {
      return <meshBasicMaterial map={img} toneMapped={false} side={THREE.DoubleSide} />;
    }

  // If playing, return the material with the video texture
}
 
export function Player() {
  
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position-y={2} />
      {/* <PointerLockControls enabled={active === null ? false : true} ref={controlsRef} args={[cameraRef.current]} /> */}
    </>
  );
}