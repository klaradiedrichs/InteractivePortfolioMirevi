import React, { useRef, useState, useEffect, } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'



function Player({cameraRoad}) {

    const cameraRef = useRef();

    const [initialyPosition, setInitialYPosition] = useState(cameraRoad ? 2 : 50);

    const handleWheel = (e) => {
      const delta = e.deltaY;
      const positionSpeed = 0.01; 
      // Check if cameraRoad is true before adjusting the camera position
      cameraRef.current.position.z += delta * positionSpeed;
      console.log("Camera Position Z:", cameraRef.current.position.z);
  };

  useEffect(() => {
    console.log("CameraRoad?"+ cameraRoad)

    if(cameraRoad){
    window.addEventListener("wheel", handleWheel);
    }
    else{
      window.removeEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
    
  }, [cameraRoad]);


  useFrame(() => {
      
      // Set the camera's rotation to look at itself (only in RoadMod)
      // in !RoadMod Camera looks to the 0,0,0
      // && position.y <= 2 für smootheren Übergang
      if (cameraRoad && cameraRef.current.position.y <= 2) {
        const cameraPosition = cameraRef.current.position;
        cameraRef.current.lookAt(cameraPosition);
      }

      // Update the initialYPosition based on the value of cameraRoad
      setInitialYPosition((prev) => {
        const targetY = cameraRoad ? 2 : 50;
        // Interpolate towards the targetY for a smoother transition
        return prev + (targetY - prev) * 0.06;
      });
  
  });

  
    return (
    
      <>
      {cameraRoad ? (
        <OrbitControls enableZoom={false} />
      ) : (
        <OrbitControls enableZoom={true} />
      )
      } 

      {/* Camera */}
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, initialyPosition, 18]}/>
    </>

  );
}

export default Player;
