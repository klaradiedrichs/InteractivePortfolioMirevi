import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useHelper, useTexture, Text, Html, MeshReflectorMaterial, PointerLockControls, useVideoTexture, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Physics } from '@react-three/rapier';
import { useKeyboardControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../stores/useStore';
import PLC from './PointerLockControls';

export default function Experience() {
 
  const directionalLight = useRef()
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

  const initialVideoStates = {
    plane1: false,
    plane2: false,
    plane3: false,
    plane4: false,
    plane5: false,
    plane6: false,
    plane7: false,
    plane8: false,
    // Add more planes as needed
  };
  // if cameraRef in range around plane -> play video 
  const [videoPlaying, setVideoPlaying] = useState(initialVideoStates); // State to track video playing status for each plane

  const active = useStore((state) => state.active);

  const isWallExperienceActive = active !== null;

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const controlsRef = useRef();
  const positiony = 2.5;

  const planePositions = {
    plane1: new THREE.Vector3(19, positiony, 1.5),
    plane2: new THREE.Vector3(19, positiony, -10),
    plane3: new THREE.Vector3(14.5,positiony,-19.5),
    plane4: new THREE.Vector3(5.5,positiony,-25),
    plane5: new THREE.Vector3(-5.5,positiony,-25),
    plane6: new THREE.Vector3(-14.5,positiony,-19.5),
    plane7: new THREE.Vector3(-19,positiony,-10),
    plane8: new THREE.Vector3(-19,positiony,1.5),
    // Add more planes as needed
  };

  const cameraRef = useRef();
 
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
    const range = 12;
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
 
      <directionalLight ref={directionalLight} castShadow position={[1, 6, 3]} intensity={1.5} />
      <Environment preset='sunset' background blur={0.5} />
      {/* <color attach="background" args={['#eeeeee']} /> */}
      <mesh receiveShadow position-z={-10} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#C1CAD7" opacity={0.5} transparent/>
      </mesh>

        {/* <Html position={[0, 2, 0]}>
          <div className="top-3" style={{ textAlign: 'center', color: 'white', fontSize: '20px', opacity: 0.5 }}>
            Control with W, A, S, D
          </div>
        </Html> */}
           
       {/* <mesh position-y={0} position-z={-10} rotation-x={-Math.PI * 0.5} scale={80}>
        <planeGeometry />
        <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.5} color="black" />
       </mesh> */}
       {/* Render planes with videos */}
       <PlaneWithVideo name="Aquazoo" url="/videos/Aquazoo.mp4" image="textures/aquazoo.png" position={planePositions.plane1} rotation={[0, -1.7, 0]} playing={videoPlaying['plane1']} />
       <PlaneWithVideo name="Icaros Flugsimulator" url="/videos/icaros.mp4" image="textures/icaros.png" position={planePositions.plane2} rotation={[0, -1.4, 0]} playing={videoPlaying['plane2']} />
       <PlaneWithVideo name="AR Sound Sandbox" url="/videos/Sandkasten.mp4" image="textures/sandkasten.jpg" position={planePositions.plane3} rotation={[0, -0.87, 0]} playing={videoPlaying['plane3']} />
       <PlaneWithVideo name="Escape Room" url="/videos/EscapeRoom.mp4" image="textures/escaperoom.png" position={planePositions.plane4} rotation={[0, -0.25, 0]} playing={videoPlaying['plane4']} />
       <PlaneWithVideo name="Kriegskinder" url="/videos/Kriegskinder.mp4" image="textures/kriegskinder2.png" position={planePositions.plane5} rotation={[0, 0.25, 0]} playing={videoPlaying['plane5']} />
       <PlaneWithVideo name="Walking On Walls" url="/videos/WalkingOnWalls.mp4" image="textures/walkingwalls.png" position={planePositions.plane6} rotation={[0, 0.87, 0]} playing={videoPlaying['plane6']} />
       <PlaneWithVideo name="Kinetic Stream" url="/videos/KineticStream.mp4" image="textures/kineticStream.png" position={planePositions.plane7} rotation={[0, 1.4, 0]} playing={videoPlaying['plane7']} />
       <PlaneWithVideo name="Acting Spheres" url="/videos/Acting_Spheres.mp4" image="textures/actingSpheres.png" position={planePositions.plane8} rotation={[0, 1.7, 0]} playing={videoPlaying['plane8']} />
       
       
      <PerspectiveCamera ref={cameraRef} makeDefault fov={35} position-y={2} />
      <PLC enabled={isWallExperienceActive} />
    </>
  );
}
 
function PlaneWithVideo({ name, position, rotation, playing, url, image}) {

  const scaleX = 7.8
  const scaleY = 4.5

  return (
    <group position={position} rotation={rotation}>
      {/* Rahmen */}
      <mesh scale-x={scaleX} scale-y={scaleY}>
        <planeGeometry />
        <meshStandardMaterial color="white" opacity={0.5} transparent/>
      </mesh>
      {playing && (
        <mesh castShadow scale-x={scaleX-0.07} scale-y={scaleY-0.07} position-z={0.01}>
          <planeGeometry />
          
          <VideoMaterial url={url} image={image} playing={playing}/>
        </mesh>
      )}
      {!playing && (
        <mesh castShadow scale-x={scaleX-0.07} scale-y={scaleY-0.07} position-z={0.01}>
        <planeGeometry />
        
        <Fallback image={image}/>
        <Text font="fonts/static/Montserrat-Regular.ttf" scale-x={0.6} fontSize={0.15} position-z={0.01} position-x={0}>
          {name}
          <meshBasicMaterial color="black" opacity={0.5} transparent/>
        </Text>
      </mesh>
      )}
    </group>
  );
}

function VideoMaterial({ url}) {
  const texture = useVideoTexture(url);

    return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />;
    

}
function Fallback({ image }) {
  const img = useTexture(image);

      // standbild
      return <meshBasicMaterial map={img} toneMapped={false} side={THREE.DoubleSide} opacity={0.5} transparent />;

}