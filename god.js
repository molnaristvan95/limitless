console.clear();
//noprotect

var logOb = {};

function slideDownOnce(id, time, funcId, how, delay, px, more) {
  var elem = document.getElementById(id),
      max = elem.scrollHeight,
      fontStr = window.getComputedStyle(elem).getPropertyValue('font-size'),
      fontNum = fontStr.substring(fontStr.lenght, 2),
      fontInt = parseFloat(parseInt(fontNum, 10)),
      sHeight = (fontInt * more);
  elem.style.height = sHeight + 'px';
  elem.style.overflow = 'hidden hidden';
  logOb[('downInter' + funcId)] = null;
  logOb['up' + funcId] = fontInt * more;
  if (how === 'auto') {
    window.setTimeout(function(){
      logOb[('inter' + funcId)] = window.setInterval(function(){
        slideDownOnceEngine(id, logOb['up' + funcId], max, funcId, px);
      }, time);
    }, delay);
  } else {
    elem.addEventListener('click', function() {
      window.setTimeout(function(){
        logOb['downInter' + funcId] = window.setInterval(function(){
          slideDownOnceEngine(id, logOb['up' + funcId], max, funcId, px);
        }, time);
      }, delay);
    });
  }
}

function slideDownOnceEngine(elem, start, finish, funcId, px) {
  if (document.getElementById(elem).scrollHeight > finish) {
    document.getElementById(elem).scrollHeight = finish + 'px';
    return window.clearInterval(logOb[('downInter' + funcId)]);
  } else {
    logOb['up' + funcId] += px;
    document.getElementById(elem).style.height = logOb['up' + funcId] + 'px';
  }
}

//example: slideDownOnce('downP', 1, 1, 'auto', 2000, 0.5, 1.5);
