import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { CameraControls, Sky } from '@react-three/drei'
import { useControls, button, buttonGroup, folder } from 'leva'
import { Water } from 'three-stdlib'
import { ModeledMap } from './ModeledMap'
import GetHexes from '../fetch/GetHexes'
import { useGLTF } from "@react-three/drei";
import { Perf } from 'r3f-perf'

// extend({ Water })



// function Waves() {
//   const ref = useRef()
//   const gl = useThree((state) => state.gl)
//   const waterNormals = useLoader(THREE.TextureLoader, '/assets/static/waternormal.jpg')
//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
//   const geom = useMemo(() => new THREE.PlaneGeometry(300, 300), [])
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: .5,
//       fog: false,
//       format: gl.encoding
//     }),
//     [waterNormals]
//   )
//   useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
//   return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
// }

// function KeyLight({ brightness, color }) {
//   return (
//     <rectAreaLight
//       width={3}
//       height={3}
//       color={color}
//       intensity={brightness}
//       position={[0, 20, 10]}
//       lookAt={[0, 0, 0]}
//       penumbra={1}
//       castShadow
//     />
//   );
// }

export default function FullCanvas() {
  
  return (
    <Canvas id="ocean-canvas" camera={{ position: [0, 15, 0], fov: 55, near: 1, far: 200 }}>
      <Scene />
    </Canvas>
  )
}


function Scene() {
  const cameraControlsRef = useRef()
  const { nodes, materials } = useGLTF("/assets/static/Grailhold-map-hexcutout-04.glb");
  const { camera } = useThree()
  
  const hexData = GetHexes()
  let fullHexes = []
  const exploredHexRefs = useRef(new Array())


  const exploredHexes = []
  const exploredHexIds = []
  const entryIds = []
  if(hexData) {

    for (let i = 0; i < hexData.length; i++) {
      const el = hexData[i];
      exploredHexIds.push(String(el.hexId))
      exploredHexes.push({entry: el.id, hexId: String(el.hexId)})
      
    }
    let exploredCount = 0
    
  }

  const bb = new THREE.Box3(
		new THREE.Vector3( -20.0, -20.0, -20.0 ),
		new THREE.Vector3( 20.0, 20.0, 20.0 )
	);

  cameraControlsRef.current?.setBoundary(bb)
    

  return <>
    {/* <Perf position="top-left" /> */}
    <Suspense fallback={null}>
        {exploredHexes ? <ModeledMap exploredHexes={exploredHexes} exploredHexIds={exploredHexIds} nodes={nodes} hexData={hexData}/> : null }
        {/* <Waves /> */}
        <mesh rotation-x={Math.PI * -0.5} position={[0,.2,0]}>
          <planeGeometry args={[300, 300]} />
          <meshStandardMaterial color={"#024959"} metalness={1}/>
        </mesh>
      {/* <KeyLight brightness={20} color={"#ffffff"} /> */}
      <directionalLight intensity={5} position={[100, 100, -200]} />
      <ambientLight intensity={.3} />
      <Sky scale={1000} sunPosition={[100, 100, -200]} azimuth={0.3} turbidity={0.4} />
      <CameraControls ref={cameraControlsRef} minDistance={5} maxDistance={30} maxPolarAngle={1.3}/>
    </Suspense>
  </>
}


useGLTF.preload("/assets/static/Grailhold-map-hexcutout-04.glb");