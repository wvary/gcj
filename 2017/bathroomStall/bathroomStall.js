var Decimal = require('./decimal.js')

// read all stdin into buffer
var reader = new require('./stdinReader.js').stdinReader();


// bigInt.prototype.floor = function() {
// 	return this.intPart();
// };


// bigInt.prototype.ceil = function() {
// 	var i = this.intPart();
// 	if (i.compare(this) === 0) {
// 		return i;
// 	} else {
// 		return i.add(1);
// 	}
// };


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
		console.log(stalls);
		// console.log(j, k)
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
    var i = new Decimal('0');
    var j;

    while (true) {
      j = i.times(2).add(1);
      // console.log('j', j.toString())
      if (j.comparedTo(k) >= 0) {
        return i;
      }
      i = j;
    }
  }  

  // console.log('should be level: ', getLevel(k).valueOf());
  var level = Decimal.pow(2, Decimal.log2(k).floor()).minus(1);

  // console.log('  level:', level.toString())

  var sets = n.minus(level).dividedBy(level.add(1)).floor();
  var over = n.minus(level).mod(level.add(1));

  // console.log('\n\n\n\n\n')
  // console.log('      n:', n.toString())
  // console.log('      k:', k.toString())
  // console.log('  level:', level.toString())
  // console.log('   sets:', sets.toString())
  // console.log('   over:', over.toString())
  // console.log('k-level:', k.minus(level).toString())


  if (k.minus(level).comparedTo(over) <= 0) {
    sets = sets.add(1);
  }

  var val = sets.minus(1).dividedBy(2);

  // var q = sets.minus(1).dividedBy(2).valueOf();
  // var r = sets.minus(1).mod(2).valueOf();

  // console.log('      q:', q)
  // console.log('      r:', r)

  return { min: val.floor().valueOf(), max: val.ceil().valueOf() };
}

var caseNo = +reader.readLine();

for(var i = 1; i <= caseNo; i++) {
	var ary = reader.readLine().split(' ');
	var n = new Decimal(ary[0]);
	var k = new Decimal(ary[1]);

  // var r2 = solveUsingArray(+n.valueOf(), +k.valueOf());
	var r1 = solve(n, k);
	console.log('Case #' + i + ': ' + r1.max + ' ' + r1.min);
	// console.log('Case #' + i + ': (' + n + ', ' + k + ') ' + r1.max + ' ' + r1.min);
	// if (r1.max !== r2.max || r1.min !== r2.min) {
	// 	console.log('Case #' + i + ': (' + n + ', ' + k + ') WRONG: ' + r1.max + ' ' + r1.min + ' CORRECT: ' + r2.max + ' ' + r2.min);
	// } else {
	// 	console.log('Case #' + i + ': ' + r1.max + ' ' + r1.min);
	// }
}