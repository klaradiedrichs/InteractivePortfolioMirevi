import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Reflector, Text, useTexture, useGLTF } from '@react-three/drei'


function VideoText({ clicked, ...props }) {
 
  return (
    <Text Size={3} letterSpacing={-0.06} {...props}>
      drei
      <meshBasicMaterial color="white" toneMapped={false} />
    </Text>
  )
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector resolution={512} args={[10, 10]} mirror={0.5} mixBlur={10} mixStrength={0.8} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[400, 100]}>
      {(Material, props) => <Material color="#a0a0a0" metalness={0.5} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
    </Reflector>
  )
}

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3())
  useEffect(() => setTimeout(() => set(true), 500), [])
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
      state.camera.lookAt(0, 0, 0)
    }
  })
}

export default function App() {
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(false)
  const store = { clicked, setClicked, ready, setReady }
  return (
    <>
      <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VideoText {...store} position={[0, 1.3, -2]} />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <Intro start={ready && clicked} set={setReady} />
        </Suspense>
      </Canvas>
    </>
  )
}
