// read all stdin into buffer
var reader = new require('./stdinReader.js').stdinReader();

function getTidyNumber(num) {
  var ary = num.split('');
  var min = Infinity;

  for(var i = ary.length - 2; i >= 0; i--) {
    if (ary[i] - ary[i + 1] > 0) {
      // front number is greater, reduce it
      ary[i]--;

      // set index so we know where to start setting all digits to 9
      min = Math.min(min, i + 1);
    } 
  }
  for(i = min; i < ary.length; i++) {
    ary[i] = 9;
  }
  return ary.join('').replace(/^0+/, '');
}

// read first line
var caseNo = +reader.readLine();

for(var i = 1; i <= caseNo; i++) {
  console.log('case #' + i + ': ' + getTidyNumber(reader.readLine()));
}
