import { Clone, Environment, OrbitControls, PerspectiveCamera,useAnimations, useGLTF , Html, useTexture} from "@react-three/drei"
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import useGameStore from "./useGameStore";
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { useSpring, animated } from '@react-spring/three'

// Animals as JSX
import ButterflyFish from './Butterfly';
import Clownfish from './Clownfish';
import YellowBoxFish from './YellowBoxfish';

const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = -0.02;
const ENEMY_SPEEDX = 0.001;
const GROUND_HEIGHT = -50;

export default function VirtualGame () {

    const {scene: oceanworld} = useGLTF('/Environment.glb');
    
    
    const start = useGameStore((state) => state.start);

    

    return(

        <>
        <PerspectiveCamera makeDefault fov={50} position={[-1,0.3,0]} rotation={[0, -1.5, 0]} far={1000}/>
        {/* Umgebung */}
        <Environment files='./OceanBackground.hdr' background></Environment>
        <primitive scale={1} object={oceanworld} position={[6,-3.3,-1]} rotation={[0, -1.5, 0]} />        
        {start && (
        <>
        <Trash />
        <Animals />
        
        </>
        )}
        <ArWing />

        <CollectController />
        </>
    )
}

function Animals() {

  const [groupPosition, setGroupPosition] = useState({ x: 0, y: 0, z: -1 });
  const [groupPosition2, setGroupPosition2] = useState({ x: 0, y: 1, z: -1.8 });
  const [turtlePosition, setTurtlePosition] = useState({ x: 9.5, y: -0.3, z: -3 });
  const { scene: turtle, animations: turtleAnim } = useGLTF('./Turtle.glb');
  const { actions: turtleAction } = useAnimations(turtleAnim, turtle);

  useEffect(() => {
    turtleAction.turtleAnim.play();
  });

  // Update group position on each frame
  useFrame(() => {
    setGroupPosition((prevPosition) => ({
      ...prevPosition,
      z: prevPosition.z + 0.003, // Increase z position by 0.1 on each frame
    }));     
    setGroupPosition2((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y - 0.0003,
      z: prevPosition.z + 0.002, // Increase z position by 0.1 on each frame
    }));
    setTurtlePosition((prevPosition) => {
      // Check if turtle's z position exceeds 10, reset it back to -5
      const newZ = prevPosition.z >= 8 ? -7.5 : prevPosition.z + 0.005;
      const newY = prevPosition.z >= 8 ? -0.3 : prevPosition.y + 0.002
      return {
        ...prevPosition,
        y: newY,
        z: newZ, // Increase z position by 0.005 on each frame
      };
    });
  });  

   {/* Animals */}
   return (
   <>
   <group position={[groupPosition.x, groupPosition.y, groupPosition.z]}>
       <ButterflyFish position={[4, 0.7, -4]} />
       <ButterflyFish position={[4.2, 0, -4.6]} />
       <ButterflyFish position={[4, 0.2, -4]} />
       {/* <ButterflyFish position={[4, -0.3, -3.7]} /> */}
       <ButterflyFish position={[4, 0, -2.6]} />

       <Clownfish position={[3, 0.18, -2.3]} />
       <Clownfish position={[4, -0.1, -2.6]} />
       {/* <Clownfish position={[3.1, -0.1, -2.2]} /> */}
       <Clownfish position={[3.1, -0.3, -2.3]} />

       <YellowBoxFish position={[3, -0.7, -1.8]} />
       {/* <YellowBoxFish position={[3, -0.9, -2.4]} /> */}
       <YellowBoxFish position={[3, -0.6, -2.7]} />
       {/*  */}

       <ButterflyFish position={[10, 2, -7]} />
       {/* <ButterflyFish position={[8, 0.7, -6]} /> */}
       <ButterflyFish position={[8.5, 0, -7.5]} />

       <Clownfish position={[10, 1, -4]} />
       {/* <Clownfish position={[9, 0.8, -6.5]} /> */}
       <Clownfish position={[9, 0.3, -8]} />

        </group>
        <group position={[groupPosition2.x, groupPosition2.y, groupPosition2.z]}>
         <Clownfish position={[3, 1, 0]} />
         <Clownfish position={[3, 1.1, -1]} />
         <Clownfish position={[3.1, 0.7, -1.3]} />

         <ButterflyFish position={[3, 0.2, 2.5]} />
         {/* <ButterflyFish position={[3.1, -0.1, 3]} /> */}
         {/* <ButterflyFish position={[3.4, -0.4, 3]} /> */}
         <ButterflyFish position={[1, -0.4, 3]} />

       </group>
       <primitive scale={2} position={[turtlePosition.x, turtlePosition.y, turtlePosition.z]} object={turtle} />
       </>

   )
}
function ArWing() {
  const shipPosition = useGameStore((state) => state.shipPosition);
  const setShipPosition = useGameStore((state) => state.setShipPosition);

  const target = useRef();
  const cameraRef = useRef();
  const grabber = useRef();

  const {scene: grabberModell} = useGLTF('./Grabber.glb');
  const sprite = useTexture('./targetnew.png')

  useFrame(({ mouse }) => {
    setShipPosition({
      position: { z: mouse.x * 6, y: mouse.y * 2},
      rotation: { z: mouse.x * 0.8, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
    });

    grabber.current.rotation.z = shipPosition.rotation.z;
    grabber.current.rotation.y = shipPosition.rotation.x;
    grabber.current.rotation.x = shipPosition.rotation.y;

    grabber.current.position.y = shipPosition.position.y;
    grabber.current.position.z = shipPosition.position.z;

    target.current.position.y = -mouse.y * 10;
    target.current.position.z = -mouse.x * 28;

  });
  // Update the ships position from the updated state.
  useFrame(() => {
    
  });
  
    return (
        <>
        <group ref={grabber} position-x={3} position-y={0} >
            <primitive scale={0.8} object={grabberModell} rotation={[0, -1.5, 0]}/>
            <Html>
              <div>
                TEST
              </div>
            </Html>
        </group>
        <group>
          <sprite position={[7, 0, 0]} scale={0.04} ref={target}>
            <spriteMaterial attach="material" map={sprite} />
          </sprite>
        </group>
        </>
    );
  }

  function Trash() {
    const { trashPositions, setTrashPositions } = useGameStore();
    const {tirePositions} = useGameStore();
    const {cupPositions} = useGameStore();
    const {scene: dose} = useGLTF('/Konservendose.glb');
    const {scene: cup} = useGLTF('/Cup.glb');
    const {scene: bottle} = useGLTF('/Bottle.glb');
    const {scene: tire} = useGLTF('/Tire.glb');

    return(
      <>
      <group>
        {trashPositions.map((trash, index) => {
            return (
                <Clone position={[trash.x, trash.y, trash.z]} object={dose} />
            );
        })}
        {tirePositions.map((trash, index) => {
            return (
                <Clone position={[trash.x, trash.y, trash.z]} object={tire} />
            );
        })}
        {cupPositions.map((trash, index) => {
            return (
                <Clone position={[trash.x, trash.y, trash.z]} object={cup} />
            );
        })}
      </group>
      </>
    )
  }

  function CollectController(){

    const {shipPosition } = useGameStore();
    const {trashPositions, setTrashPositions} = useGameStore();
    const {tirePositions, setTirePositions} = useGameStore();
    const {cupPositions, setCupPositions} = useGameStore();
    const {collectors, setCollectors} = useGameStore();
    const score = useGameStore((state) => state.score);
    const setScore = useGameStore((state) => state.setScore);

    function distance(p1, p2){
      const a = p2.x - p1.x;
      const b = p2.y - p1.y;
      const c = p2.z - p1.z;

      return Math.sqrt(a*a +b *b +c *c);
    }

    useFrame(({mouse}) => {
      // Calculate Treffer
      
      // Abfrage ob Trash getroffen wurde
        const hitTrash = trashPositions? trashPositions.map(
        (object) => collectors.filter(
          () => collectors.filter((collector) => distance(collector,object) < 1). length > 0).length > 0 
        ) : [];
        
        // Abfrage ob Reifen getroffen wurde
        const hitTire = tirePositions.map((tire) =>
          collectors.filter((collector) => distance(collector, tire) < 1).length > 0
        );

        // Abfrage ob Cup getroffen wurde
        const hitCup = cupPositions.map((cup) =>
          collectors.filter((collector) => distance(collector, cup) < 1).length > 0
        );

        if(hitTrash.includes(true) && collectors.length > 0){
          console.log("hit detected");
          setScore(score + hitTrash.filter((hit) => hit).length);
        }
        if(hitTire.includes(true) && collectors.length > 0){
          console.log("hit detected");
          setScore(score + hitTire.filter((hit) => hit).length);
        }
        if(hitCup.includes(true) && collectors.length > 0){
          console.log("hit detected");
          setScore(score + hitCup.filter((hit) => hit).length);
        }

      // Move Trash / delete if hitted....
      setTrashPositions(
        trashPositions.map((trash) => ({x: trash.x + ENEMY_SPEED, y: trash.y, z: trash.z + ENEMY_SPEEDX }))
        .filter((trash, idx) => !hitTrash[idx])
      )
      // Move Tire / delete if hitted....
      setTirePositions(
        tirePositions.map((trash) => ({x: trash.x + ENEMY_SPEED, y: trash.y, z: trash.z + ENEMY_SPEEDX }))
        .filter((trash, idx) => !hitTire[idx])
      )
      // Move Cup / delete if hitted....
      setCupPositions(
        cupPositions.map((trash) => ({x: trash.x + ENEMY_SPEED, y: trash.y, z: trash.z + ENEMY_SPEEDX }))
        .filter((trash, idx) => !hitCup[idx])
      )

      // move Collector Object
      setCollectors(
        collectors
          .map((collector) => ({
            id: collector.id,
            x: collector.x + LASER_Z_VELOCITY,
            y: collector.y + collector.velocity[1],
            z: collector.z + collector.velocity[0],
            
            velocity: collector.velocity
          }))
      );

  });

  const handleShoot = () => {
    // setScore(score + 1)
    console.log("Shoot")
    // neues Collector Objekt hinzufügen
    setCollectors([...collectors, {
      id: Math.random(),x: 1, y: 0, z: 0, velocity: [shipPosition.rotation.x * 8, shipPosition.rotation.y * 6.5]
    }])
    
    // Abfrage 
    console.log(collectors.length);
  }

  return (
    <>
    {/* plane for shoot event */}
      <mesh position={[10, 0, 0]} rotation={[0,-1.5,0]} onClick={handleShoot}>
        <planeGeometry args={[80, 80]}/>
        <meshStandardMaterial color="orange" opacity={0.2} transparent/>
      </mesh>
      <group>
        {collectors.map((collector) => (
          <mesh position={[collector.x, collector.y, collector.z]} key={`${collector.id}`}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial attach="material" emissive="green" />
          </mesh>
        ))}
      </group>
    </>
  )
  }