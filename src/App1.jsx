import { useSpring, animated } from '@react-spring/three'
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";




function App() {

const [active, setActive] = useState(false);
const {scale} = useSpring({ scale: active ? 5 : 1})
const myMesh = useRef();

  return (
    <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight />    

        <animated.mesh scale={scale} onClick={() => setActive(!active)} ref={myMesh}>
            <boxGeometry />
            <meshPhongMaterial color="blue" />
        </animated.mesh>
    </Canvas>
  );
}

export default App;
