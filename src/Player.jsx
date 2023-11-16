import React, { useRef, useState, useEffect, } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'



function Player({ newRotation   }) {

    const cameraRef = useRef();
    const cubeRef = useRef();

    const cubee = useRef();

    const [rotation, setRotation] = useState([0, 0, 0]);

    // Define a state to track whether overview click is on or off
    const [overviewClickInProgress, setOverviewClickInProgress] = useState(false);
    // Define a state to track camera Road on or off
    const [cameraRoad, setCameraRoad] = useState(true)

    const handleWheel = (e) => {
      const delta = e.deltaY;
      const positionSpeed = 0.01; 
      // const rotSpeed = 0.001;
      if(cameraRoad){
        cameraRef.current.position.z += delta * positionSpeed;
        console.log("Camera Position Z:", cameraRef.current.position.z);
      }
      // setRotation([0,0,0]); // reset the rotation back to 0,0,0


  };

  useEffect(() => {
      if (newRotation) {
      // Set the new rotation
      setRotation(newRotation);
    }
    
      window.addEventListener("wheel", handleWheel);
  
      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }, [newRotation]);

  const handleCubeClick = () => {
    setOverviewClickInProgress(true)
    setCameraRoad(false)
    cameraRef.current.position.set(0, 25, 18); // Adjust the Y value to set the height
    // cameraRef.current.rotation.set(-Math.PI / 1, 0, 0); // Adjust the X value for the desired pitch
  }

  useFrame(() => {
      const cubePosition = cubeRef.current.position
      const cubeRotation = cubeRef.current.rotation

      // set Camera Position & Rotation to Cube Position & Rotation 
      // cameraRef.current.position.copy(cubePosition);
      // cameraRef.current.rotation.copy(cubeRotation);

      // update cube rotation to new rotation (for click event on Planes)
      // cubeRef.current.rotation.x = rotation[0];
      // cubeRef.current.rotation.y = rotation[1];
      // cubeRef.current.rotation.z = rotation[2];

      // option withput Cube Player:
      // const cameraPosition = cameraRef.current.position
      // const cameraRotation = cameraRef.current.rotation
 
      // Set the camera's rotation to look at itself
      if (!overviewClickInProgress) {
        const cameraPosition = cameraRef.current.position;
        cameraRef.current.lookAt(cameraPosition);
      }     

  });
    return (
    
      <>
      <OrbitControls enableZoom={false}/>

      <PerspectiveCamera makeDefault ref={cameraRef} position={[0,2,0]}/>
      {/* Player */}
      <mesh ref={cubeRef} position={[0,2,1]} rotation-y={ - Math.PI * -12 } scale={ 0.4 }>
            <boxGeometry />
            <meshStandardMaterial color="hotpink" />
      </mesh>  
      {/* Click me to get bird eye perspective */}
      <mesh ref={cubee} onClick={handleCubeClick} position={[0,2,-2]} rotation-y={ - Math.PI * -12 } scale={ 0.4 }>
            <boxGeometry />
            <meshStandardMaterial color="skyblue" />
      </mesh>  
    </>

  );
}

export default Player;
