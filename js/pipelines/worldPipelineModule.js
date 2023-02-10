import Lights from '../experience/Lights'
import Timer from '../experience/Timer'
import Text3D from '../experience/Text3D'

export const initWorldPipelineModule = () => {
  const init = () => {
    Lights.init()
    Text3D.init()

    console.log('✨', 'World ready')
  }

  // Places content over image target
  const showTarget = ({ detail }) => {
    if (detail.name === 'target1') {
      Text3D.show(detail, 'success')
    }
  }

  // Hides the image frame when the target is no longer detected.
  const hideTarget = ({ detail }) => {
    if (detail.name === 'target2') {
      Timer.start(detail)
    }
  }

  const render = () => {
    Text3D?.update()
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
