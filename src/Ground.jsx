// import {Grid} from '@react-three/drei'

// export default function Ground() {
//     const gridConfig = {
//       sectionSize: 2.3,
//       sectionColor: '#9d4b4b',
//       fadeDistance: 40,
//       fadeStrength: 1,
//       // followCamera: false,
//       infiniteGrid: true
//     }
//     return <Grid position={[0, -0.01, 0.1]} args={[10.5, 10.5]} {...gridConfig} />
//   }

import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./grass.jpg"

export default function Ground(props) {
  const texture = useTexture(grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial map={texture} map-repeat={[240, 240]} color="green" />
      </mesh>
      <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
