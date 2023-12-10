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
        // // Camera Start
        new THREE.Vector3(-4, 0, 30),
        // Wendepunkt
        new THREE.Vector3(-4, 0, 5),
        // Viewpoint1
        new THREE.Vector3(0.5, 0, 0),
        // Wendepunkt
        new THREE.Vector3(7, 0, -8),
        // Viewpoint 2
        new THREE.Vector3(18, 0, -33),
        // Wendepunkt
        new THREE.Vector3(23, 0, -40),
        new THREE.Vector3(33, 0, -60),
        new THREE.Vector3(40, 0, -70),
        new THREE.Vector3(51, 0, -80),
        new THREE.Vector3(60, 0, -90),


        // Kreis:
        //Camera Start
        // new THREE.Vector3(0, 0, 10),
        // new THREE.Vector3(0, 0, -1.65),
        // new THREE.Vector3(-20, 0, -10),
        // new THREE.Vector3(-28, 0, -30),
        // new THREE.Vector3(-19.82, 0, -50.27),
        // // mitte
        // new THREE.Vector3(0, 0, -58.27),
        // new THREE.Vector3(19.82, 0, -50.27),
        // new THREE.Vector3(28, 0, -30),
        // new THREE.Vector3(20, 0, -10),

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

  // const [fov, setFov] = useState(cameraRoad ? 45 : 65);
  const [initialyPosition, setInitialYPosition] = useState(cameraRoad ? 1.8 : 100);
  const [initialZPosition, setInitialZPosition] = useState(0)
  const [initialXPosition, setInitialXPosition] = useState(0)

  useEffect(() => {
    console.log("CameraRoad?" + cameraRoad);
    // console.log("FOV" + fov)
    if (cameraRoad) {
      setInitialZPosition(0)
      setInitialXPosition(0)
      // CameraRoad logic here
      // Set FOV to 45
      // You may want to update initial position or other properties
    } else {
      cameraGroup.current.position.x = -4;
      cameraGroup.current.position.z = 30;
      cameraRef.current.lookAt(0,0,80)
    }
  }, [cameraRoad]);

  // method gets calles each Frame
  useFrame((_state, delta) => {
      
      const cameraPosition = cameraRef.current.position ;
      const cameraDirection = new THREE.Vector3(0, 0, 0); // Negative z-axis

      // Update the initialYPosition based on the value of cameraRoad
      setInitialYPosition((prev) => {
        const targetY = cameraRoad ? 1.8 : 100;
        // Interpolate towards the targetY for a smoother transition
        return prev + (targetY - prev) * 0.1;
      });

      // Set the camera's rotation to look at itself (only in RoadMod)
      // in !RoadMod Camera looks to the 0,0,0
      if (cameraRoad){ 

        // setInitialXPosition(-4)
        // setInitialZPosition(30)
        // Make the camera look forward (until -300)
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
    
        // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        cameraGroup.current.position.lerp(curPoint, delta * 24);

      }

      else if(!cameraRoad){
        cameraRef.current.lookAt(0,0,80)
        setInitialXPosition(-4)
        setInitialZPosition(30)
      }
      });

      
  
    return (
    
      <>
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false}/>
      <mesh position={[0,0.1,-300]} scale={0.3} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="white" />
        </mesh>
      {/* Camera */}
      {/* gruppieren, um Y Position der Camera nicht zu manipulieren */}
      <group ref={cameraGroup}>
        <PerspectiveCamera fov={45} near={4} far={300} makeDefault ref={cameraRef} position-x={initialXPosition} position-y={initialyPosition} position-z={initialZPosition}/>
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
          <meshStandardMaterial color={"white"} opacity={0.1} transparent />
        </mesh>
      </group>
    </>

  );
}

export default Player;