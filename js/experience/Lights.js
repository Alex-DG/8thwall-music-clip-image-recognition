import * as THREE from 'three'

class _Lights {
  init() {
    const { scene, camera } = XR8.Threejs.xrScene()
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.copy(camera.position)
    scene.add(directionalLight)
  }
}

const Lights = new _Lights()
export default Lights
