// read all stdin into buffer
var reader = new require('./stdinReader.js').stdinReader();
var BigNumber = require('./bignumber.js');


String.prototype.setChar = function (c) {
  var idx = Math.floor((this.length - 1) / 2);
  return this.substr(0, idx) + c + this.substr(idx + c.length);
}

function solveUsingArray(n, k) {
	var stalls = new Array(n).fill('.').join('');
	var min, max;

	function assignStall(final) {
	  var group = stalls.split('o').sort().splice(-1)[0];
	  if (!final) {
	    stalls = stalls.replace(group, group.setChar('o'));
	  } else {
	    stalls = stalls.replace(group, group.setChar('O'));
	    var x = (group.length - 1) / 2;
	    min = Math.floor(x);
	    max = Math.ceil(x);
	  }
	}

	for(var j = 1; j <= k; j++) {
		// console.log(stalls);
		console.log(j, k)
	  assignStall(j === k);
	}

	// console.log(stalls);
	// console.log('(' + n + ' - 1) / 2 = ' + (n - 1)/2);
	// console.log('(' + n + ' - 3) / 4 = ' + (n - 3)/4);
	// console.log('(' + n + ' - 7) / 8 = ' + (n - 7)/8);

	return { min: min, max: max };
}


function solve(n, k) {

  function getLevel(k) {
    var i = 0;
    var j = 1;

    while (true) {
      j = i * 2 + 1;
      if (j >= k) {
        return i;
      }
      i = j;
    }
  }  

  var level = getLevel(k);
  var factor = (n - level) / (level + 1);
  var sets = Math.trunc(factor);
  var over = (level + 1) * (factor - sets);

  sets = Math.trunc(sets);

  console.log('\n\n\n\n\n')
  console.log('      n:', n)
  console.log('      k:', k)
  console.log('  level:', level)
  console.log(' factor:', factor)
  console.log('   sets:', sets)
  console.log('   over:', over)
  console.log('k-level:', (k - level))

  if (k - level <= over) {
    sets++;
  }

  var val = (sets - 1) / 2;

  return { min: Math.floor(val), max: Math.ceil(val) };
}

var caseNo = +reader.readLine();

for(var i = 1; i <= caseNo; i++) {
	var ary = reader.readLine().split(' ');
	var n = +ary[0];
	var k = +ary[1];

	var r1 = solve(n, k);
	// var r2 = solveUsingArray(n, k);
	console.log('Case #' + i + ': ' + r1.max + ' ' + r1.min);
	// console.log('Case #' + i + ': (' + n + ', ' + k + ') ' + r1.max + ' ' + r1.min);
	// if (r1.max !== r2.max || r1.min !== r2.min) {
	// 	console.log('Case #' + i + ': (' + n + ', ' + k + ') WRONG: ' + r1.max + ' ' + r1.min + ' CORRECT: ' + r2.max + ' ' + r2.min);
	// } else {
	// 	console.log('Case #' + i + ': ' + r1.max + ' ' + r1.min);
	// }
}