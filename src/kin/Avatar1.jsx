/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 avatar1.glb 
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/avatar1.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions.test.play();
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="charlotteRig_Reference" rotation={[Math.PI / 2, 0, 0]} scale={0.051}>
          <primitive object={nodes.charlotteRig_Hips} />
          <group name="ch_charlotte_eyeL_mesh">
            <skinnedMesh name="Mesh001" geometry={nodes.Mesh001.geometry} material={materials.corneaMat} skeleton={nodes.Mesh001.skeleton} />
            <skinnedMesh name="Mesh001_1" geometry={nodes.Mesh001_1.geometry} material={materials.eyeMat} skeleton={nodes.Mesh001_1.skeleton} />
          </group>
          <group name="ch_charlotte_eyeR_mesh">
            <skinnedMesh name="Mesh002" geometry={nodes.Mesh002.geometry} material={materials.corneaMat} skeleton={nodes.Mesh002.skeleton} />
            <skinnedMesh name="Mesh002_1" geometry={nodes.Mesh002_1.geometry} material={materials.eyeMat} skeleton={nodes.Mesh002_1.skeleton} />
          </group>
          <skinnedMesh name="ch_charlotte_srf_head" geometry={nodes.ch_charlotte_srf_head.geometry} material={materials.charlotteHeadMat} skeleton={nodes.ch_charlotte_srf_head.skeleton} />
          <skinnedMesh name="ch_charlotte_srf_main" geometry={nodes.ch_charlotte_srf_main.geometry} material={materials.charlotteBodyMat} skeleton={nodes.ch_charlotte_srf_main.skeleton} />
          <group name="ch_charlotte_teeth_mesh">
            <skinnedMesh name="Mesh003" geometry={nodes.Mesh003.geometry} material={materials.gumMat} skeleton={nodes.Mesh003.skeleton} />
            <skinnedMesh name="Mesh003_1" geometry={nodes.Mesh003_1.geometry} material={materials.teethMat} skeleton={nodes.Mesh003_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/avatar1.glb')
