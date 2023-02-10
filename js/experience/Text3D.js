import { Text } from 'troika-three-text'
import { gsap } from 'gsap'

class _Text3D {
  init() {
    this.texts = [
      {
        value: 'success',
        text: 'Success!',
        color: 'orange',
        tween: (text) => {
          return gsap.to(text.rotation, {
            y: `+=${10 * Math.PI}`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'starting',
        text: 'STARTING',
        color: 'red',
        tween: (text) => {
          return gsap.to(text.position, {
            x: `-=50`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'dreaming',
        text: 'DREAMING',
        color: 'hotpink',
        time: 36,
        tween: (text) => {
          return gsap.to(text.position, {
            y: `+=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
    ]

    this.troikaTexts = this.texts.map(({ text, color }) => {
      const troikaText = new Text()
      troikaText.text = text
      troikaText.fontSize = 0.5
      troikaText.color = color
      troikaText.anchorX = 'center'
      troikaText.scale.set(0, 0, 0)
      troikaText.material.transparent = true
      troikaText.material.opacity = 0
      troikaText.userData.enabled = false
      return troikaText
    })

    this.tl = gsap.timeline()
  }

  show(detail, value) {
    const index = this.texts.findIndex((t) => t.value === value)
    const text = this.troikaTexts[index]

    if (!text?.userData?.enabled) {
      text.userData.enabled = true

      const textTween = this.texts[index].tween

      console.log('⚙️', 'TROIKA TEXT FOUND > ', { text })

      const { scene } = XR8.Threejs.xrScene()

      text.position.set(detail.position.x, detail.position.y, detail.position.z)
      text.quaternion.copy(detail.rotation)

      scene.add(text)

      console.log('✅', 'TROIKA TEXT READY')

      this.tl.to(text.scale, {
        x: detail.scale,
        y: detail.scale,
        z: detail.scale,
        duration: 1,
        ease: 'power3.out',
        onStart: () => {
          text.material.opacity = 1
        },
      })

      this.tl.to(text.scale, {
        x: 0,
        y: 0,
        z: 0,
        delay: 0.5,
        duration: 1,
        ease: 'power3.in',
        onStart: () => {
          textTween(text)
        },
        onComplete: () => {
          scene.remove(text)
          text.dispose()
        },
      })
    }
  }

  update() {
    this.troikaTexts?.forEach((troikaText) => {
      troikaText.sync()
    })
  }
}

const Text3D = new _Text3D()

export default Text3D
