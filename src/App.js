import React,{useState, useRef, Suspense} from 'react'
import {useFrame, Canvas, useLoader} from '@react-three/fiber'
import {Html, useProgress, Environment, OrbitControls} from '@react-three/drei'
import {TextureLoader} from 'three/src/loaders/TextureLoader'
import {isWindows, isMacOs, isMobile} from 'react-device-detect'
// import { FBXLoader } from 'three-stdlib'
import './App.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Model from './Model'

const name = (type) => `Marble009_2K_${type}.png`

function Box(props){
  const [hovered, setHover] = useState()
  const [active, setActive] = useState()
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    name('Color'),
    name('Displacement'),
    name('NormalGL'),
    name('Roughness'),
    // name('AmbientOcclusion')
  ])

  const mesh = useRef()

  useFrame(()=>mesh.current.rotation.x+=0.01)

  return(
    <mesh
      {...props}
      ref = {mesh}
      scale={active?0.5: 1}
      onPointerOver={()=>setHover(true)}
      onPointerOut={()=>setHover(false)}
      onClick={()=>setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} className="neerav"/>
      {/* <meshStandardMaterial color={hovered?'hotpink': 'lightblue'} /> */}
      <meshStandardMaterial
        displacementScale={0}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  )
}

function Sphere(props){
  const [hovered, setHover] = useState()
  const [active, setActive] = useState()
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    name('Color'),
    name('Displacement'),
    name('NormalGL'),
    name('Roughness'),
    // name('AmbientOcclusion')
  ])

  const ref = useRef()
  useFrame(()=>ref.current.rotation.y+=0.01)

  return(
    <group dispose={null}>
      <mesh
        {...props}
        ref = {ref}
        scale={active?1.5:1}
        onPointerOver={()=>setHover(true)}
        onPointerOut={()=>setHover(false)}
        onClick={()=>setActive(!active)}
      >
        <sphereBufferGeometry args={[1, 100]}/>
        {/* <meshStandardMaterial color={hovered? 'hotpink': 'blue '}/> */}
     
        <meshStandardMaterial
          displacementScale={0}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </group>
  )
}

function Loader(){
  const {progress} = useProgress()
  return <Html center>{progress}% loaded</Html>
}

export default function App() {
  let renderComponent;
  if(isWindows){
    renderComponent = (
      <group>
        <Box position={[2,0,0]}/>
        <Box position={[-2,0,0]}/>
      </group>
    )
  }
  if(isMacOs || isMobile){
    renderComponent = (
      <group>
        <Sphere position={[2,0,0]}/>
        <Sphere position={[-2,0,0]}/>
      </group>
    )
  }
  return (
    <>
    <Canvas>
      <Suspense fallback={<Loader/>}>
        <OrbitControls/>
        {/* <pointLight position={[10,10,10]}/> */}
        {/* <ambientLight/> */}
        <Environment preset="dawn" background/>
        {renderComponent}
        <Model/>
      </Suspense>
    </Canvas>
    </>
  )
}
