import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { CameraControls, Sky } from '@react-three/drei'
import { useControls, button, buttonGroup, folder } from 'leva'
import { Water } from 'three-stdlib'
import { ModeledMap } from './ModeledMap'

extend({ Water })



function Waves() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/assets/static/waternormal.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(100, 100), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: .5,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

export default function FullCanvas() {
  
  return (
    <Canvas id="ocean-canvas" camera={{ position: [0, 15, 0], fov: 55, near: 1, far: 200 }}>
      <Scene />
    </Canvas>
  )
}


function Scene() {
  const cameraControlsRef = useRef()

  const { camera } = useThree()
  // All same options as the original "basic" example: https://yomotsu.github.io/camera-controls/examples/basic.html
  // const { minDistance, enabled, verticalDragToForward, dollyToCursor, infinityDolly } = useControls({
  //   thetaGrp: buttonGroup({
  //     label: 'rotate theta',
  //     opts: {
  //       '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
  //       '-90º': () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
  //       '+360º': () => cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true)
  //     }
  //   }),
  //   phiGrp: buttonGroup({
  //     label: 'rotate phi',
  //     opts: {
  //       '+20º': () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
  //       '-40º': () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true)
  //     }
  //   }),
  //   truckGrp: buttonGroup({
  //     label: 'truck',
  //     opts: {
  //       '(1,0)': () => cameraControlsRef.current?.truck(1, 0, true),
  //       '(0,1)': () => cameraControlsRef.current?.truck(0, 1, true),
  //       '(-1,-1)': () => cameraControlsRef.current?.truck(-1, -1, true)
  //     }
  //   }),
  //   dollyGrp: buttonGroup({
  //     label: 'dolly',
  //     opts: {
  //       '1': () => cameraControlsRef.current?.dolly(1, true),
  //       '-1': () => cameraControlsRef.current?.dolly(-1, true)
  //     }
  //   }),
  //   zoomGrp: buttonGroup({
  //     label: 'zoom',
  //     opts: {
  //       '/2': () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
  //       '/-2': () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true)
  //     }
  //   }),
  //   minDistance: { value: 0 },
  //   moveTo: folder(
  //     {
  //       vec1: { value: [3, 5, 2], label: 'vec' },
  //       'moveTo(…vec)': button((get) => cameraControlsRef.current?.moveTo(...get('moveTo.vec1'), true))
  //     },
  //     { collapsed: true }
  //   ),
  //   'fitToBox(mesh)': button(() => cameraControlsRef.current?.fitToBox(meshRef.current, true)),
  //   setPosition: folder(
  //     {
  //       vec2: { value: [-5, 2, 1], label: 'vec' },
  //       'setPosition(…vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2'), true))
  //     },
  //     { collapsed: true }
  //   ),
  //   setTarget: folder(
  //     {
  //       vec3: { value: [3, 0, -3], label: 'vec' },
  //       'setTarget(…vec)': button((get) => cameraControlsRef.current?.setTarget(...get('setTarget.vec3'), true))
  //     },
  //     { collapsed: true }
  //   ),
  //   setLookAt: folder(
  //     {
  //       vec4: { value: [1, 2, 3], label: 'position' },
  //       vec5: { value: [1, 1, 0], label: 'target' },
  //       'setLookAt(…position, …target)': button((get) => cameraControlsRef.current?.setLookAt(...get('setLookAt.vec4'), ...get('setLookAt.vec5'), true))
  //     },
  //     { collapsed: true }
  //   ),
  //   lerpLookAt: folder(
  //     {
  //       vec6: { value: [-2, 0, 0], label: 'posA' },
  //       vec7: { value: [1, 1, 0], label: 'tgtA' },
  //       vec8: { value: [0, 2, 5], label: 'posB' },
  //       vec9: { value: [-1, 0, 0], label: 'tgtB' },
  //       t: { value: Math.random(), label: 't', min: 0, max: 1 },
  //       'f(…posA,…tgtA,…posB,…tgtB,t)': button((get) => {
  //         return cameraControlsRef.current?.lerpLookAt(
  //           ...get('lerpLookAt.vec6'),
  //           ...get('lerpLookAt.vec7'),
  //           ...get('lerpLookAt.vec8'),
  //           ...get('lerpLookAt.vec9'),
  //           get('lerpLookAt.t'),
  //           true
  //         )
  //       })
  //     },
  //     { collapsed: true }
  //   ),
  //   saveState: button(() => cameraControlsRef.current?.saveState()),
  //   reset: button(() => cameraControlsRef.current?.reset(true)),
  //   enabled: { value: true, label: 'controls on' },
  //   verticalDragToForward: { value: false, label: 'vert. drag to move forward' },
  //   dollyToCursor: { value: false, label: 'dolly to cursor' },
  //   infinityDolly: { value: false, label: 'infinity dolly' }
  // })
  return <>
    <Suspense fallback={null}>
        <ModeledMap />
        <Waves />
      
      </Suspense>
      <Sky scale={1000} sunPosition={[100, 100, -200]} azimuth={0.3} turbidity={0.4} />
      <CameraControls
         
          ref={cameraControlsRef}
          // minDistance={minDistance} 
          // enabled={enabled}
          // verticalDragToForward={verticalDragToForward}
          // dollyToCursor={dollyToCursor}
          // infinityDolly={infinityDolly}
      />
  </>
}