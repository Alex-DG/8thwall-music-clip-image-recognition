import { Text } from 'troika-three-text'
import { gsap } from 'gsap'

class _Text3D {
  init() {
    // Array of words to be displayed
    this.texts = [
      {
        value: 'success',
        text: 'Success!',
        color: 'orange',
        time: null,
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
        time: null,
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
        color: 'red',
        time: {
          minutes: 0,
          seconds: 47,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `-=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'dreaming',
        text: 'DREAMING',
        color: 'hotpink',
        time: {
          minutes: 0,
          seconds: 36,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `+=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'dreaming',
        text: 'DREAMING',
        color: 'yellow',
        time: {
          minutes: 1,
          seconds: 22,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `+=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'comeone',
        text: 'COME ON',
        color: 'lightblue',
        time: {
          minutes: 1,
          seconds: 9,
        },
        tween: (text) => {
          return gsap.to(text.rotation, {
            y: `+=${10 * Math.PI}`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'comeone',
        text: 'COME ON',
        color: 'orange',
        time: {
          minutes: 1,
          seconds: 54,
        },
        tween: (text) => {
          return gsap.to(text.rotation, {
            y: `+=${10 * Math.PI}`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'onlydreaming',
        text: "I'm only dreaming",
        color: 'hotpink',
        time: {
          minutes: 3,
          seconds: 30,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `+=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'onlydreamingforyou',
        text: "I'm only dreaming for you",
        color: 'hotpink',
        time: {
          minutes: 4,
          seconds: 16,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            x: `+=25`,
            duration: 8,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'comeone',
        text: 'COME ON',
        color: 'red',
        time: {
          minutes: 3,
          seconds: 3,
        },
        tween: (text) => {
          return gsap.to(text.rotation, {
            y: `+=${10 * Math.PI}`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'you',
        text: 'YOU',
        color: 'hotpink',
        time: {
          minutes: 5,
          seconds: 54,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `+=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
      {
        value: 'ending',
        text: 'ENDING',
        color: 'red',
        time: {
          minutes: 6,
          seconds: 18,
        },
        tween: (text) => {
          return gsap.to(text.position, {
            y: `-=25`,
            duration: 4,
            ease: 'power3.out',
          })
        },
      },
    ]

    // Create 3D Text objects
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

  show(detail, value, time) {
    let index

    if (time) {
      // BASED ON TIME CODE

      index = this.texts.findIndex(
        (t) =>
          t.time &&
          t.time.minutes === time.minutes &&
          t.time.seconds === time.seconds
      )
    } else if (value) {
      // BASED ON TEXT VALUE PROPERTY

      index = this.texts.findIndex((t) => t.value === value)
    }

    const text = this.troikaTexts[index]

    if (text && !text.userData.enabled) {
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
