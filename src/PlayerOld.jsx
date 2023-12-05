import React, { useRef, useState, useEffect, } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'



function Player({cameraRoad}) {

    const cameraRef = useRef();

    const [initialyPosition, setInitialYPosition] = useState(cameraRoad ? 1.8 : 50);
    const [initialZPosition, setInitialZPosition] = useState(1)

    const handleWheel = (e) => {
      const delta = e.deltaY;
      const positionSpeed = 0.01; 
      // Check if cameraRoad is true before adjusting the camera position
      setInitialZPosition(cameraRef.current.position.z += delta * positionSpeed)
      console.log("Camera Position Z:", cameraRef.current.position.z);
      
  };

  useEffect(() => {
    console.log("CameraRoad?"+ cameraRoad)

    if(cameraRoad){
    window.addEventListener("wheel", handleWheel);
    }
    else if(!cameraRoad){
      window.removeEventListener("wheel", handleWheel);
    }

    // window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
    
  }, [cameraRoad]);


  useFrame(() => {

      const cameraPosition = cameraRef.current.position ;
      const cameraY = cameraPosition.y; // Save the y component in another variable
      const cameraDirection = new THREE.Vector3(0, 0, -40); // Negative z-axis

      // Interpolate towards the target position for a smoother transition

      // Set the camera's rotation to look at itself (only in RoadMod)
      // in !RoadMod Camera looks to the 0,0,0
      // && position.y <= 2 für smootheren Übergang
      if (cameraRoad){
        // Make the camera look along its own negative z-axis
        cameraRef.current.lookAt(cameraDirection.add(cameraPosition));
        
      }

      // setInitialYPosition(cameraRoad ? 2 : 25);
      // // Update the initialYPosition based on the value of cameraRoad
      setInitialYPosition((prev) => {
        const targetY = cameraRoad ? 1.8 : 50;
        // Interpolate towards the targetY for a smoother transition
        return prev + (targetY - prev) * 0.1;
      });
  
  });

  
    return (
    
      <>
      <OrbitControls enableZoom={false} />
      {/* Camera */}
      <PerspectiveCamera fov={45} near={2.5} far={35} makeDefault ref={cameraRef} position={[0, initialyPosition, initialZPosition]}/>
    </>

  );
}

export default Player;