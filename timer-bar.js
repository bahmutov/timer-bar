(function (timerDurationMinutes) {
  function loadProgressBars() {
    var url = 'https://rawgit.com/bahmutov/progress-full-width/master/bar.js';
    function toText(response) { return response.text(); }
    return fetch(url)
      .then(toText)
      .then(eval);
  }

  function initTimer() {
    console.log('starting timer for %d minute(s)', timerDurationMinutes);
    progressBars.init()
      .timer(timerDurationMinutes * 60 * 1000);
  }

  if (typeof progressBars === 'undefined') {
    loadProgressBars()
      .then(initTimer);
  } else {
    initTimer();
  }

}(1 /* minute(s) */));