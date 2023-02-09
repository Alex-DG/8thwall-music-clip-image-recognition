import Lights from '../experience/Lights'
import Lyrics from '../experience/Lycrics'
import Timer from '../experience/Timer'

export const initWorldPipelineModule = () => {
  const init = () => {
    Lights.init()
    Lyrics.init()

    console.log('✨', 'World ready')
  }

  // Places content over image target
  const showTarget = ({ detail }) => {
    Timer.start(detail)

    // When the image target named 'model-target' is detected, show 3D model.
    // This string must match the name of the image target uploaded to 8th Wall.
    // if (detail.name === 'model-target') {
    //   model.position.copy(detail.position)
    //   model.quaternion.copy(detail.rotation)
    //   model.scale.set(detail.scale, detail.scale, detail.scale)
    //   model.visible = true
    // }
    // // When the image target named 'video-target' is detected, play video.
    // // This string must match the name of the image target uploaded to 8th Wall.
    // if (detail.name === 'video-target') {
    //   videoObj.position.copy(detail.position)
    //   videoObj.quaternion.copy(detail.rotation)
    //   videoObj.scale.set(detail.scale, detail.scale, detail.scale)
    //   videoObj.visible = true
    //   video.play()
    // }
  }

  // Hides the image frame when the target is no longer detected.
  const hideTarget = ({ detail }) => {}

  const render = () => {
    Timer?.update()
  }

  return {
    name: 'init-world',

    onStart: () => init(),

    onRender: () => render(),

    // Listeners are called right after the processing stage that fired them. This guarantees that
    // updates can be applied at an appropriate synchronized point in the rendering cycle.
    listeners: [
      { event: 'reality.imagefound', process: showTarget },
      { event: 'reality.imageupdated', process: showTarget },
      { event: 'reality.imagelost', process: hideTarget },
    ],
  }
}
