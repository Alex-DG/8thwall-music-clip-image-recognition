import Text3D from './Text3D'

const MAX_MIN = 6
const MAX_SEC = 22

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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateTextDisplay(m, s) {
    Text3D.show(this.detail, null, {
      minutes: Number(m),
      seconds: Number(s),
    })
  }

  updateTimeDisplay(hours, minutes, seconds) {
    this.timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds
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

    if (minutes == MAX_MIN && seconds === MAX_SEC) {
      this.stop()
    } else {
      // Update
      this.updateTextDisplay(minutes, seconds)
      this.updateTimeDisplay(hours, minutes, seconds)
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  start(detail) {
    if (this.hasStarted) return
    this.hasStarted = true

    if (this.interval !== null) clearInterval(this.interval)

    this.detail = detail
    Text3D.show(detail, 'starting')

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
}

const Timer = new _Timer()
export default Timer
