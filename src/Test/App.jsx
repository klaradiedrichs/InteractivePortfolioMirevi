import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Vector3 } from 'three';
import { Physics } from '@react-three/rapier';

import { Ground } from './Ground';
import { Camera } from './Camera';
import { Player } from './Player';
import { Cube } from './Cube';
import { useCube } from './useCubeStore';

const Cubes = () => {
  const cubes = useCube();
  return [<Cube position={[0, 0.5, -10]} />, ...cubes];
};

const App = () => (
  <Canvas shadowMap sRGB gl={{ alpha: false }}>
      <Camera />
      <Sky sunPosition={new Vector3(100, 10, 100)} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>
  </Canvas>
);

export default App;
