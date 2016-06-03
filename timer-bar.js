(function (timerDurationMinutes, barColor, height) {
  function toText(response) { return response.text(); }

  function loadScript(url) {
    return fetch(url)
      .then(toText)
      .then(eval);
  }

  function loadProgressBars() {
    var url = 'https://rawgit.com/bahmutov/progress-full-width/master/bar.js';
    return loadScript(url);
  }

  const TIMER_BAR_KEY_CODE = 84; // 't'
  var isRunning = false; // TODO for pausing the timer bar

  function onKey(event) {
    console.log('event', event);
    if (event.keyCode === TIMER_BAR_KEY_CODE) {
      if (isRunning) {
        console.log('pausing timer-bar not implemented yet');
      } else {
        console.log('starting timer-bar');
        initTimer();
        isRunning = true;
      }
    }
  }
  if (!window.__timerBarOnKey) {
    window.__timerBarOnKey = onKey;
  }

  function registerKey() {
    document.removeEventListener('keyup', window.__timerBarOnKey);
    document.addEventListener('keyup', window.__timerBarOnKey);
    console.log('Press "t" to start the timer-bar');
  }

  function initTimer() {
    console.log('starting timer for %d minute(s)', timerDurationMinutes);
    var options = {
      color: barColor,
      height: height
    };
    progressBars.init(options)
      .timer(timerDurationMinutes * 60);
  }

  if (typeof progressBars === 'undefined') {
    loadProgressBars()
      .then(registerKey);
  } else {
    registerKey();
  }

}(45 /* minute(s) */, '#ff00ff' /* color */, 4 /* height pixels */));
