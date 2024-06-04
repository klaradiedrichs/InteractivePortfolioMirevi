import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Reflector, useHelper, useTexture, Text, Html, OrbitControls, MeshReflectorMaterial, PointerLockControls, useVideoTexture, Environment } from '@react-three/drei';
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
  const [orbitControls, setOrbitControls] = useState(false); // State to track video playing status for each plane

  const active = useStore((state) => state.active);
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])

  const isWallExperienceActive = active !== null;

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const controlsRef = useRef();
  const positiony = 2.25;

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

  useEffect(() => {
    // const initialScrollOffset = 0.5; // Assuming 0.5 represents the middle of the page
    // scroll.set(initialScrollOffset);

    window.addEventListener("wheel", handleWheel);
    
    return () => {
    window.removeEventListener("wheel", handleWheel);
    };
    
}, []);
const handleWheel = (e) => {
  console.log("scrolled")
  
};


   // Check if camera is near any of the planes and toggle video playing accordingly
   useFrame((state, delta) => {

    const { forward, backward, leftward, rightward } = getKeys();
    const moveSpeed = 6;
 
    if (forward) cameraRef.current.translateZ(-moveSpeed * delta);
    if (backward) cameraRef.current.translateZ(moveSpeed * delta);
    if (leftward) cameraRef.current.translateX(-moveSpeed * delta);
    if (rightward) cameraRef.current.translateX(moveSpeed * delta);
    // Lock the y position
    cameraRef.current.position.y = 1;

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
      
      <Environment preset='night' blur={0} />
      <directionalLight intensity={0.5}/>
      <color attach="background" args={["#343434"]} />
      {/* <color attach="background" args={['black']} /> */}
      <Reflector position-x={-25} resolution={512} args={[100, 50]} mirror={0.5} mixBlur={10} mixStrength={0.8} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
      {(Material, props) => <Material color="#a0a0a0" metalness={0.7} roughnessMap={floor} normalMap={normal} normalScale={[2, 1]} {...props} />}
      </Reflector>
      <Reflector position-x={25} resolution={512} args={[100, 50]} mirror={0.5} mixBlur={10} mixStrength={0.8} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
      {(Material, props) => <Material color="#a0a0a0" metalness={0.7} roughnessMap={floor} normalMap={normal} normalScale={[2, 1]} {...props} />}
      </Reflector>
 
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
       
      <PerspectiveCamera zoom={true} ref={cameraRef} makeDefault fov={30} position-y={0.5} />
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
      <mesh castShadow scale-x={scaleX} scale-y={scaleY}>
        <planeGeometry />
        <meshStandardMaterial color="black" opacity={0.5} transparent/>
      </mesh>
      <group position={[-3.8, 2.5, 0.02]}>
          <Text color="gray" font="fonts/static/Montserrat-LightItalic.ttf" fontSize={0.35} anchorX="left">
            {name}
            <meshBasicMaterial color="white" toneMapped={false} />
          </Text>
      </group>
      {playing && (
        <mesh scale-x={scaleX-0.07} scale-y={scaleY-0.07} position-z={0.01}>
          <planeGeometry />
          <VideoMaterial url={url} image={image} playing={playing}/>
        </mesh>
      )}
      {!playing && (
        
        <mesh scale-x={scaleX - 0.07} scale-y={scaleY - 0.07} position-z={0.01}>
          <planeGeometry />
          <Fallback image={image} />
        </mesh>
        
      )}
    </group>
  );
}

function VideoMaterial({ url}) {
  const texture = useVideoTexture(url, { muted: false });

    return <meshBasicMaterial map={texture} toneMapped={false} />;
    

}
function Fallback({ image }) {
  const img = useTexture(image);

      // standbild
      return <meshBasicMaterial map={img} toneMapped={false} opacity={0.9} transparent />;

}