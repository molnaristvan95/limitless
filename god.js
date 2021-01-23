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

function typeWriterMachine(id, speed, funcId) {
  var inHtml = document.getElementById(id).innerHTML,
      arr = inHtml.split(''),
      len = inHtml.length;
  logOb['arr' + funcId] = arr;
  logOb['length' + funcId] = len;
  logOb['outPut' + funcId] = '';
  logOb['countUpLetters' + funcId] = -1;
  document.getElementById(id).innerHTML = '';
  logOb['typeWriteInt' + funcId] = window.setInterval(function(){
    inserting(document.getElementById(id), funcId)
  }, speed);
}

function inserting(elem, funcId) {
  if (elem.innerHTML.length == logOb['length' + funcId] || elem.innerHTML.length > logOb['length' + funcId]) {
    window.clearInterval(logOb['typeWriteInt' + funcId]);
  } else {
    elem.innerHTML = logOb['outPut' + funcId];
    logOb['countUpLetters' + funcId]++;
    logOb['outPut' + funcId] += logOb['arr' + funcId][logOb['countUpLetters' + funcId]];
  }
}

// example: typeWriterMachine('writeD', 100, 1);

function colouredLetters(id, r, g, b, a, min, max, funcId, letSpace) {
  var x = document.getElementById(id),
      len = x.textContent.length;
  logOb['colTxt' + funcId] = x.textContent;
  x.textContent = '';
  for (var c = 0; c < len; c++) {
    var lett = document.createElement('span'),
        cont = document.createTextNode(logOb['colTxt' + funcId][c]);
    lett.appendChild(cont);
    x.appendChild(lett);
    var red = (Math.floor(Math.random() * (r - min + 1)) + min),
        green = (Math.floor(Math.random() * (g - min + 1)) + min),
        blue = (Math.floor(Math.random() * (b - min + 1)) + min);
    lett.style.color = 'rgba(' + red + ',' + green + ',' + blue + ')';
  }
}

// example: colouredLetters('colored3', 100, 100, 255, 1, 100, 255, 3, 0.5);
