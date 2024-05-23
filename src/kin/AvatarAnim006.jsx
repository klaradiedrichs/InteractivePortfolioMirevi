import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/AvatarAnim006.glb')

  // useEffect(() => {
  //   actions.animSechsFinal.play();
  // });
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="main" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="scale_reference" position={[-0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.943}>
            <group name="charlotteRig_Reference" position={[0.1, 0, 0]}>
              <primitive object={nodes.charlotteRig_Hips} />
              <skinnedMesh castShadow receiveShadow name="ch_charlotte_srf_main" geometry={nodes.ch_charlotte_srf_main.geometry} material={materials['Material.003']} skeleton={nodes.ch_charlotte_srf_main.skeleton} />
              <group name="ch_charlotte_teeth_mesh">
                <skinnedMesh name="Mesh003" castShadow receiveShadow geometry={nodes.Mesh003.geometry} material={materials.gumMat} skeleton={nodes.Mesh003.skeleton} />
                <skinnedMesh name="Mesh003_1" castShadow receiveShadow geometry={nodes.Mesh003_1.geometry} material={materials.teethMat} skeleton={nodes.Mesh003_1.skeleton} />
              </group>
              <skinnedMesh name="ch_charlotte_srf_head" castShadow receiveShadow geometry={nodes.ch_charlotte_srf_head.geometry} material={materials.newHead} skeleton={nodes.ch_charlotte_srf_head.skeleton} />
            </group>
            <group name="ch_charlotte_srf_geo" />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/AvatarAnim006.glb')
