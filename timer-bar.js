;(function initTimerBar ({ timerDurationMinutes, barColor, height, zindex, selector }) {
  function toText (response) { return response.text() }

  function loadScript (url) {
    /* global fetch */
    return fetch(url)
      .then(toText)
      .then(eval) // eslint-disable-line no-eval
  }

  function loadProgressBars () {
    var url = 'https://rawgit.com/bahmutov/progress-full-width/master/bar.js'
    return loadScript(url)
  }

  const TIMER_BAR_KEY_CODE = 84 // 't'
  var isRunning = false // TODO for pausing the timer bar

  function onKey (event) {
    console.log('event', event)
    if (event.keyCode === TIMER_BAR_KEY_CODE) {
      if (isRunning) {
        console.log('pausing timer-bar not implemented yet')
      } else {
        console.log('starting timer-bar')
        initTimer()
        isRunning = true
      }
    }
  }
  if (!window.__timerBarOnKey) {
    window.__timerBarOnKey = onKey
  }

  function registerKey () {
    document.removeEventListener('keyup', window.__timerBarOnKey)
    document.addEventListener('keyup', window.__timerBarOnKey)
    console.log('Press "t" to start the timer-bar')
  }

  function initTimer () {
    console.log('starting timer for %d minute(s)', timerDurationMinutes)
    var options = {
      color: barColor,
      height: height,
      zindex: zindex,
      selector: selector
    }
    window.progressBars.init(options)
      .timer(timerDurationMinutes * 60)
  }

  if (typeof window.progressBars === 'undefined') {
    loadProgressBars()
      .then(registerKey)
  } else {
    registerKey()
  }
}({
  timerDurationMinutes: 45,
  barColor: '#ff00ff',
  height: 4,
  zindex: 1000
// use selector for specific cases,
// for example when adding to Reveal presentations
// use selector: ".reveal-viewport"
}))
