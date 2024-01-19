import React, { useRef, useState, useEffect, useMemo } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'


const LINE_NB_POINTS = 8000;

function Player({cameraRoad}) {

  // Curve Points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        // // Camera Start
        new THREE.Vector3(-4, 0, 17),
        // Wendepunkt
        new THREE.Vector3(-2, 0, 4),
        // Viewpoint1
        // new THREE.Vector3(0.5, 0, 0),
        // Wendepunkt
        new THREE.Vector3(7, 0, -6),
        // Viewpoint 2
        new THREE.Vector3(12, 0, -32),
        // Drehung 2
        new THREE.Vector3(27, 0, -42),
        // Weg
        new THREE.Vector3(34, 0, -66),
        // Viewpoint 3
        new THREE.Vector3(42, 0, -75),
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
        new THREE.Vector3(122, 0, -162)
        

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

    const cameraRef = useRef();

    const [initialyPosition, setInitialYPosition] = useState(cameraRoad ? 1.8 : 90);
    const [initialZPosition, setInitialZPosition] = useState(1)


    const [scrollOffset, setScrollOffset] = useState(0);

    const handleWheel = (e) => {
      console.log("hi")
        const delta = e.deltaY;
        const scrollSpeed = 0.5;
  
        // Update the scroll position based on the delta
        // scroll.onWheel({ deltaY: delta * scrollSpeed });
        setScrollOffset((prevOffset) => prevOffset + delta * scrollSpeed);

  };

  useEffect(() => {
    console.log("CameraRoad?"+ cameraRoad)

    if(cameraRoad){
    window.addEventListener("wheel", handleWheel);
    }
    else if(!cameraRoad){
      window.removeEventListener("wheel", handleWheel);
      cameraRef.current.position.x = 80;
      setInitialZPosition(-60);
      setInitialYPosition(70)
    }

    // window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
    
  }, [cameraRoad]);


  useFrame(() => {
    if(cameraRoad){
    const clampedScrollOffset = Math.max(0, Math.min(scrollOffset, linePoints.length - 1));
    const curPointIndex = Math.round(clampedScrollOffset);
    const alpha = clampedScrollOffset - curPointIndex;

    // const curPointIndex = Math.min(
    //   Math.round(scroll.offset * linePoints.length),
    //   linePoints.length - 1
    // );

    const curPoint = linePoints[curPointIndex];
    const nextPoint = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const interpolatedPoint = new THREE.Vector3().lerpVectors(curPoint, nextPoint, alpha);

    cameraRef.current.position.copy(interpolatedPoint);

    // Look at the next point on the curve
    const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    cameraRef.current.lookAt(pointAhead);
    }
    else if(!cameraRoad){
      // cameraRef.current.lookAt(0,0,90)
    }
  
  });

  
    return (
    
      <>
      <OrbitControls enableZoom={false} />
      {/* Camera */}
      <PerspectiveCamera fov={70} near={1} far={300} makeDefault ref={cameraRef} position={[0, initialyPosition, initialZPosition]} />
      <group position-y={-1}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.6} transparent />
        </mesh>
      </group>
    </>

  );
}

export default Player;