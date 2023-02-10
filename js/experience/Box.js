import * as THREE from 'three'

class _Box {
  setInstance() {
    const { scene } = XR8.Threejs.xrScene()

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshNormalMaterial()
    )

    box.position.copy(this.detail.position)
    box.quaternion.copy(this.detail.rotation)
    box.scale.set(this.detail.scale, this.detail.scale, this.detail.scale)

    this.instance = box
    scene.add(box)
  }

  init() {
    this.setInstance()
  }

  update() {
    if (this.instance) {
      this.instance.rotation.x += 0.01
      this.instance.rotation.z += 0.01
    }
  }
}

const Box = new _Box()
export default Box
