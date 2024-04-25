/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Butterfly.glb 
*/

import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useGraph } from "@react-three/fiber"
import { SkeletonUtils } from "three-stdlib"

export default function Model(props) {
  const group = useRef()
  const { scene, materials, animations } = useGLTF("/Butterfly.glb")
  // const { nodes, materials, animations } = useGLTF('/Butterfly.glb')

  // // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  // // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone)

  const { ref, actions, names } = useAnimations(animations,group)


  useEffect(() => {
    actions.butterflyfish.play()  
  }, [])  
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="butterflyfish" rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
          <primitive object={nodes.Bone01} />
          <primitive object={nodes.Bone17} />
          <primitive object={nodes.Bone19} />
          <primitive object={nodes.Bone21} />
          <skinnedMesh name="default" geometry={nodes['default'].geometry} material={materials.butterflyfish_default} skeleton={nodes['default'].skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Butterfly.glb')