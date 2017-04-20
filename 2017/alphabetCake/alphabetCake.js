// read all stdin into buffer
var reader = new require('./stdinReader.js').stdinReader();

// build array
function buildCake(rows) {
  var result = [];
  for(var i = 0; i < rows; i++) {
    result.push(reader.readLine().replace(/\?/g, ' '));
  }
  return result;
}

function getCoord(letter) {
  var exp = new RegExp('( *' + letter + '+ *)+');
  var c1 = -Infinity;
  var c2 = Infinity;
  var idx;
  for(var i = 0; i < rect.length; i++) {
    var m = rect[i].match(exp);
    if (m) {
      idx = i;
      c1 = Math.max(c1, m.index);
      c2 = Math.min(c2, m.index + m[1].length - 1);
    }
  }
  // console.log('c1', c1, 'c2', c2)
  return { index: idx, c1: c1, c2: c2, filler: new Array(c2 - c1 + 1).fill(letter).join(''), letter: letter };
}

function canAssign(str, letter) {
  var t = str.replace(/ /g, '').replace(new RegExp(letter + '+'), letter);
  // console.log('t', ':' + t + ':')
  return t === '' || t === letter;
}

function assignLetter(def, beg, end, incr) {
  for(var i = beg; i <= end && incr === 1 || i >= end && incr === -1; i = i + incr) {
    var p1 = rect[i].substr(0, def.c1);
    var p2 = rect[i].substr(def.c1, def.c2 - def.c1 + 1);
    var p3 = rect[i].substr(def.c2 + 1);
    // console.log('p2', ':' + p2 + ':')
    if (canAssign(p2, def.letter)) {
      rect[i] =  p1 + def.filler + p3;
    } else {
      return;
    }
  }
}

// initialize case number
var count = +reader.readLine();

for(var i = 0; i < count; i++) {
  var ary = reader.readLine().split(' ');
  var rows = +ary[0];
  var cols = +ary[1];

  var rect = buildCake(rows);

  // console.log('rows', rows, 'cols', cols)
  // console.log('rect', rect) 

  var letters = rect.join('').split('').filter(function(v, k, ary) { return ary.indexOf(v) === k; }).join('').replace(/ /g, '').split('');

  // console.log(letters);

  letters.forEach(function(l) {
    var def = getCoord(l);
    // console.log(def);
    assignLetter(def, def.index, 0, -1);
    assignLetter(def, def.index + 1, rect.length - 1, 1);
  });

  console.log('Case #' + (i + 1) + ':');
  rect.forEach(function(v) {
    console.log(v);
  });
}