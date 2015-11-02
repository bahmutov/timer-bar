(function (timerDurationMinutes, barColor) {
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

  function initTimer() {
    console.log('starting timer for %d minute(s)', timerDurationMinutes);
    progressBars.init({ color: barColor })
      .timer(timerDurationMinutes * 60);
  }

  if (typeof progressBars === 'undefined') {
    loadProgressBars()
      .then(initTimer);
  } else {
    initTimer();
  }

}(15 /* minute(s) */, '#ff00ff' /* color */));
