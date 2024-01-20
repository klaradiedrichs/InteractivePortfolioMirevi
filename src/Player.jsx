import React, { useRef, useState, useEffect, useMemo } from "react";
import {CameraControls, OrbitControls, PerspectiveCamera, Html, Line , useScroll} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { useSpring,animated } from "react-spring";

const LINE_NB_POINTS = 20000;

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
  const scroll = useScroll();
  const cameraGroup = useRef();

  // const [fov, setFov] = useState(cameraRoad ? 45 : 65);
  const [initialYPos, setinitialYPos] = useState(cameraRoad ? 1.8 : 10);
  const [initialZPosition, setInitialZPosition] = useState(0)
  const [initialXPosition, setInitialXPosition] = useState(0)

  useEffect(() => {
    console.log("CameraRoad?" + cameraRoad);
    // console.log("FOV" + fov)
    if (cameraRoad) {
      setInitialZPosition(0)
      setInitialXPosition(0)
      setinitialYPos(1.8)
      // Set FOV to 45
    } else {
      cameraGroup.current.position.x = 80;
      cameraGroup.current.position.z = 120;
      setinitialYPos(20)
      // cameraRef.current.lookAt(0,0,0)

    }
  }, [cameraRoad]);

  // position={[45,2.8,-88]}
  // method gets calles each Frame
  useFrame((_state, delta) => {
      
      // Update the initialYPos based on the value of cameraRoad
      // setinitialYPos((prev) => {
      //   const targetY = cameraRoad ? 1.8 : 100;
      //   // Interpolate towards the targetY for a smoother transition
      //   return prev + (targetY - prev) * 0.1;
      // });

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

        const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
        const xDisplacement = (pointAhead.x - curPoint.x) * 80;
    
        // Math.PI / 2 -> LEFT
        // -Math.PI / 2 -> RIGHT
    
        // const angleRotation = (xDisplacement < 0 ? 1 : -1) * Math.min(Math.abs(xDisplacement), Math.PI / 3);
    
      //   const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      //     new THREE.Euler(
      //       cameraGroup.current.rotation.x,
      //       angleRotation,
      //       cameraGroup.current.rotation.z
      //     )
      // );
    
        // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);
        cameraGroup.current.position.lerp(curPoint, delta * 24);

      }

      else if(!cameraRoad){
        cameraRef.current.lookAt(0,0,90)
        // setInitialXPosition(-4)
        // setInitialZPosition(30)
      }
      });
  
    return (
    
      <>
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={cameraRoad ? false : true}/>
      
       
      {/* Camera */}
      {/* gruppieren, um Y Position der Camera nicht zu manipulieren */}
      <group ref={cameraGroup}>
        <PerspectiveCamera shadow fov={cameraRoad ? 45 : 35} near={4} far={cameraRoad ? 55 : 400} makeDefault ref={cameraRef} position-x={initialXPosition} position-y={initialYPos} position-z={initialZPosition}/>
      </group>
      <mesh position={[0,0.1,-500]} scale={0.3} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="white" />
        </mesh>
      {/* LINE */}
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