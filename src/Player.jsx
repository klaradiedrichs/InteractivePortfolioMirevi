import React, { useRef, useState, useEffect, useMemo } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html, Line , useScroll} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

const LINE_NB_POINTS = 12000;

function Player({cameraRoad}) {

  // Curve Points
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 20),
        new THREE.Vector3(0, 0, 10),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-4, 0, -20),
        new THREE.Vector3(-6, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(7, 0, -50),
        new THREE.Vector3(9, 0, -60),
        new THREE.Vector3(7, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
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
  const scroll = useScroll();
  const cameraGroup = useRef();

  const [initialyPosition, setInitialYPosition] = useState(cameraRoad ? 1.8 : 50);
  const [initialZPosition, setInitialZPosition] = useState(0)

  // method gets called at the beginning
  useEffect(() => {
    console.log("CameraRoad?"+ cameraRoad)
    
  }, [cameraRoad]);

  // method gets calles each Frame
  useFrame((_state, delta) => {
      
      // setInitialYPosition(cameraRoad ? 2 : 25);
      // // Update the initialYPosition based on the value of cameraRoad
      setInitialYPosition((prev) => {
        const targetY = cameraRoad ? 1.8 : 50;
        // Interpolate towards the targetY for a smoother transition
        return prev + (targetY - prev) * 0.1;
      });

      // Set the camera's rotation to look at itself (only in RoadMod)
      // in !RoadMod Camera looks to the 0,0,0
      if (cameraRoad){
        // Make the camera look along its own negative z-axis
        // cameraRef.current.lookAt(cameraDirection.add(cameraPosition));
      

        const curPointIndex = Math.min(
          Math.round(scroll.offset * linePoints.length),
          linePoints.length - 1
        );

        const curPoint = linePoints[curPointIndex];

        // Make the camera look at the current point on the curve
        cameraRef.current.lookAt(curPoint);
        const pointAhead =
          linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
        const xDisplacement = (pointAhead.x - curPoint.x) * 80;
    
        // Math.PI / 2 -> LEFT
        // -Math.PI / 2 -> RIGHT
    
        const angleRotation =
          (xDisplacement < 0 ? 1 : -1) *
          Math.min(Math.abs(xDisplacement), Math.PI / 3);
    
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            cameraGroup.current.rotation.x,
            angleRotation,
            cameraGroup.current.rotation.z
          )
      );
    
        cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
    
        cameraGroup.current.position.lerp(curPoint, delta * 24);
          }
      
      });

  
    return (
    
      <>
      <OrbitControls enableZoom={false} enableRotate={false}/>
      {/* Camera */}
      {/* gruppieren, um Y Position der Camera nicht zu manipulieren */}
      <group ref={cameraGroup}>
        <PerspectiveCamera fov={45} near={2.5} far={200} makeDefault ref={cameraRef} position-y={initialyPosition}/>
      </group>
      {/* LINE */}
      <group position-y={0}>
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
          <meshStandardMaterial color={"black"} opacity={0.7} transparent />
        </mesh>
      </group>
    </>

  );
}

export default Player;