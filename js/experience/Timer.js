import Lyrics from '../experience/Lycrics'

class _Timer {
  constructor() {
    this.bind()

    this.hasStarted = false
    this.enabled = true

    this.timerDisplay = document.querySelector('.timer-display')
    this.clockEmoji = document.getElementById('clock-emoji')
    this.clockEmoji.addEventListener('click', this.toggleTimer)

    this.defaultDisplay = '00 : 00 : 00'

    this.startTime = 0
    this.updatedTime = 0
    this.difference = 0

    this.interval = null
  }

  bind() {
    this.toggleTimer = this.toggleTimer.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  toggleTimer() {
    if (this.enabled) {
      this.timerDisplay.style.opacity = '0'
    } else {
      this.timerDisplay.style.opacity = '1'
    }

    this.enabled = !this.enabled
  }

  updateTimer() {
    this.updatedTime = new Date().getTime()
    this.difference = this.updatedTime - this.startTime

    let hours = Math.floor(
      (this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minutes = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((this.difference % (1000 * 60)) / 1000)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (minutes >= 4 && seconds >= 10) {
      this.stop()
    } else {
      Lyrics.show(seconds)
      this.timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  start(detail) {
    if (this.hasStarted) return
    this.hasStarted = true

    if (this.interval !== null) clearInterval(this.interval)

    console.log('⏱️', 'START TIMER', { detail })

    this.startTime = new Date().getTime()

    this.interval = setInterval(this.updateTimer, 1000)
  }

  stop() {
    console.log('⏱️', 'STOP TIMER', this.values)

    this.hasStarted = false

    clearInterval(this.interval)
    this.startTime = 0
    this.updatedTime = 0
    this.difference = 0

    this.timerDisplay.innerHTML = '00 : 00 : 00'
  }

  update() {
    Lyrics?.update()
  }
}

const Timer = new _Timer()
export default Timer
