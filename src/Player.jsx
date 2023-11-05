import React, { useRef, useState, useEffect, } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'



function Player({ newRotation   }) {

    const cameraRef = useRef();
    const cubeRef = useRef();

    const [rotation, setRotation] = useState([0, 0, 0]);


    const handleWheel = (e) => {
      const delta = e.deltaY;
      const positionSpeed = 0.01; 
      // const rotSpeed = 0.001;
      cubeRef.current.position.z += delta * positionSpeed;
      console.log("Camera Position Z:", cubeRef.current.position.z);
      setRotation([0,0,0]); // reset the rotaion back to 0,0,0


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

  useFrame(() => {
      const cubePosition = cubeRef.current.position
      const cubeRotation = cubeRef.current.rotation
      cameraRef.current.position.copy(cubePosition);
      cameraRef.current.rotation.copy(cubeRotation);

      cubeRef.current.rotation.x = rotation[0];
      cubeRef.current.rotation.y = rotation[1];
      cubeRef.current.rotation.z = rotation[2];
     

  });
    return (
    
      <>
      <OrbitControls />

      <PerspectiveCamera makeDefault ref={cameraRef}  position={[0, 4, 6]}/>
      {/* Player */}
      <mesh ref={cubeRef} position={[0,2,0]} scale={ 0.4 }>
            <boxGeometry />
            <meshStandardMaterial color="hotpink" />
      </mesh>  
    </>

  );
}

export default Player;
