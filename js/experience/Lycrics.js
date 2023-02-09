import { Text } from 'troika-three-text'
import { gsap } from 'gsap'

import { songLyrics } from '../utils/song'

class _Lyrics {
  init() {
    const { scene, camera } = XR8.Threejs.xrScene()
    this.scene = scene
    this.lyrics = []
    this.tweenTarget = null

    this.camera = camera

    songLyrics.forEach((lyric) => {
      this.create(lyric.value)
    })
  }

  create(value = 'Hello World!') {
    const text = new Text()

    text.text = value
    text.fontSize = 0.5
    text.color = 'hotpink'
    text.material.transparent = true
    text.material.opacity = 0
    text.material.depthWrite = false
    text.userData.playing = false

    this.scene.add(text)
    this.lyrics.push(text)
  }

  show(time) {
    const index = songLyrics.findIndex((lyric) => lyric.time === time)
    const text = this.lyrics[index]

    if (text) {
      text.userData.playing = true

      const activeTexts = this.lyrics.filter(
        (t) => t.userData.playing && t.id !== text.id
      )
      if (activeTexts.length) {
        activeTexts.forEach((activeText) => {
          this.scene.remove(activeText)
          activeText.dispose()
        })
      }

      gsap.to(text.material, {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }

  dispose() {
    this.lyrics?.forEach((text) => {
      this.scene.remove(text)
      text.dispose()
    })

    this.lyrics = []
  }

  update() {
    this.lyrics?.forEach((text) => {
      text?.sync()

      if (text.userData.playing) {
        text.position.x -= 0.022
        text.rotation.y = this.camera.rotation.y
      }
    })
  }
}

const Lyrics = new _Lyrics()
export default Lyrics
