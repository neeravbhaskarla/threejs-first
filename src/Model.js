import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Handgun_Game_Cycles.gltf')
  materials.handgun_cycles.roughness = 0.2
  materials.handgun_cycles.wireframe = true
  // materials.handgun_cycles.color = "red"
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube000.geometry}
        material={nodes.Cube000.material}
        position={[-0.6, -0.1, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012_1.geometry}
        material={materials['Material.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Gun_trigger001.geometry}
        material={nodes.Gun_trigger001.material}
        position={[-0.1, 0.2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.handgun_cycles}
        position={[0.8, 0.5, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Handgun_Game_Cycles.gltf')