import React, { useRef, useState, useEffect, useMemo } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html, useScroll, Line } from "@react-three/drei";
import { act, useFrame } from "@react-three/fiber";
import * as THREE from 'three'


const LINE_NB_POINTS = 30000;

function Player({backToStart, setBackToStart, cameraRoad, active}) {

  // Curve Points
  const curve1 = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-10, 0, 40),

        new THREE.Vector3(0, 0, 30),

        // // Camera Start
        new THREE.Vector3(0, 0, 5),
        // Wendepunkt
        new THREE.Vector3(3, 0, -5),
        // Viewpoint1
        // new THREE.Vector3(0.5, 0, 0),
        // Wendepunkt
        new THREE.Vector3(15, 0, -15),
        // Viewpoint 2
        new THREE.Vector3(12, 0, -40),
        // Drehung 2
        new THREE.Vector3(-8, 0, -55),
        // Weg
        new THREE.Vector3(34, 0, -66),
        // Viewpoint 3
        new THREE.Vector3(40, 0, -75),
        // Drehung 3
        new THREE.Vector3(52, 0, -82),
        // Weg 
        new THREE.Vector3(63, 0, -100),
        // Viewpoint 4
        new THREE.Vector3(75, 0, -115),
        // Drehung 4
        new THREE.Vector3(88, 0, -122),
        // Weg
        new THREE.Vector3(95, 0, -130),
        // VW 5
        new THREE.Vector3(112, 0, -155),
        // Drehung
        

              ],
      false,
      "catmullrom",
      0.6
    );
  }, []);
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        // Start
        new THREE.Vector3(-35, 0, 70),
        // new THREE.Vector3(-20, 0, 58),
        new THREE.Vector3(-2, 0, 50),
        // new THREE.Vector3(-2, 0, 30),
        // new THREE.Vector3(-2, 0, 17),
        // Viewpoint1
        new THREE.Vector3(1, 0, 5),
        // Wendepunkt
        new THREE.Vector3(20, 0, -10),
        // Viewpoint 2
        new THREE.Vector3(22, 0, -32),
        // Drehung 2
        new THREE.Vector3(3, 0, -42),
        // Weg
        // Viewpoint 3
        new THREE.Vector3(-2, 0, -62),
        // Drehung 3
        new THREE.Vector3(2, 0, -76),
        new THREE.Vector3(24, 0, -85),
        new THREE.Vector3(30, 0, -95),
        // VP 4
        new THREE.Vector3(29, 0, -112),
        
        new THREE.Vector3(13, 0, -131),
        // new THREE.Vector3(21, 0, -138),
        new THREE.Vector3(12, 0, -162),
        // new THREE.Vector3(25, 0, -168),
        new THREE.Vector3(35, 0, -178),
        // VP 6
        new THREE.Vector3(40, 0, -198),
        // Weg 7
        new THREE.Vector3(30, 0, -216),
        new THREE.Vector3(32, 0, -240),
        new THREE.Vector3(54, 0, -249),
        new THREE.Vector3(57, 0, -269),
        // new THREE.Vector3(48, 0, -206),
        // new THREE.Vector3(38, 0, -215),
        // new THREE.Vector3(33, 0, -220),
        // new THREE.Vector3(31, 0, -230),
        // new THREE.Vector3(35, 0, -240),
        // new THREE.Vector3(55, 0, -255),
        // new THREE.Vector3(65, 0, -270),
        // Drehung 4
        // Weg
        // VW 5
        // Drehung
        

        

              ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);
    
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  // Reference to Perspective Camera (thats follows along the curve)
  const cameraRef = useRef();

  // Camera Position
  // safe in useState to be able to change depending on CameraRoad
  const [initialYPos, setinitialYPos] = useState(cameraRoad ? 2 : 90);
  const [initialZPos, setInitialZPos] = useState(1)
  const [initialXPos, setInitalXPos] = useState(0)
  // scrollPosition
  const [scrollOffset, setScrollOffset] = useState(0);

  // called when user scrolls  
  const handleWheel = (e) => {
      const delta = e.deltaY;
      const scrollSpeed = 0.5;
      // Update the scroll position based on the delta
      // this offset is than used to determine the camera position along the curve
      setScrollOffset((prevOffset) => prevOffset + delta * scrollSpeed);
  };

  // runs on every render or when cameraRoad changes
  useEffect(() => {
    
    // wheel eventListener only active in cameraRoad Modus
    if(cameraRoad && !backToStart){
    window.addEventListener("wheel", handleWheel);
    // go back to CameraRoad Position:
    setInitalXPos(-4);
    setInitialZPos(17);
    setinitialYPos(2)
    }
    else if(!cameraRoad){
      window.removeEventListener("wheel", handleWheel);
      // go to Overview Position:
      setInitalXPos(97);
      setInitialZPos(44);
      setinitialYPos(41)
    }
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
    
  }, [cameraRoad, backToStart]);

  // runs every frame
  useFrame(() => {
    // console.log("Pos X" + cameraRef.current.position.x)
    // console.log("Pos Y" + cameraRef.current.position.y)
    // console.log("Pos Z" + cameraRef.current.position.z)
    
    // move Camera on Curve Calculation:
    if(cameraRoad && !backToStart && active == null){
    
    // Clamp the scroll offset to ensure it stays within the valid range of curve points
    const clampedScrollOffset = Math.max(0, Math.min(scrollOffset, linePoints.length - 1));
    // Find the current index of the point along the curve
    const curPointIndex = Math.round(clampedScrollOffset);
    // Calculate the interpolation factor between the current and next point
    const alpha = clampedScrollOffset - curPointIndex;
    
    // calculate current and next point on the curve
    const curPoint = linePoints[curPointIndex];
    const nextPoint = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    // interpolate between current and next point for smooth movement
    const interpolatedPoint = new THREE.Vector3().lerpVectors(curPoint, nextPoint, alpha);
    
    // set camera position to the interpolated point on the curve 
    cameraRef.current.position.copy(interpolatedPoint);

    // Look at the next point on the curve
    const pointAhead = linePoints[Math.min(curPointIndex + 20, linePoints.length - 1)];
    cameraRef.current.lookAt(pointAhead);
    }
    else if(!cameraRoad){
      // const targetPosition = new THREE.Vector3(75, 20, 34);
      // cameraRef.current.position.lerp(targetPosition, 0.1);
      cameraRef.current.lookAt(0, 0, -90);
    }
    else if(backToStart){
      //find te first point
      const firstPoint = linePoints[0]
      cameraRef.current.position.copy(firstPoint)
    }

  });

  
    return (
    
      <>
      {!cameraRoad && active === null && <OrbitControls />}
      {/* Camera */}
      {active === null && <><PerspectiveCamera fov={35} near={0.4} far={cameraRoad ? 39 : 600} makeDefault ref={cameraRef} position={[initialXPos, initialYPos, initialZPos]} />
      <group position-y={-1.8}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: true,
                  extrudePath: curve,
                  curveSegments: 50,
                  bevelThickness: 10
                },
              ]} />
            <meshStandardMaterial color={"white"} opacity={0.2} transparent />
          </mesh>
        </group></>
      }
    </>

  );
}

export default Player;

