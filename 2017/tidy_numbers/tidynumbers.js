var reader = new require('./stdinReader.js').stdinReader();

function Num(num) {
  this.val = +num;
  this.toString = function() { return this.val; };
    this.valueOf = function() { return this.val; };
}

function getTidyNumber(num) {
  function isTidy(a, b) {
    if (a.val > b.val) {
      a.val--;
      b.val = 9;
      return false;
    } else {
      return true;
    }
  }

  var ary = num.toString().split('').map(function(v) { return new Num(v); });
    var min = Infinity;

  for(var i = ary.length - 2; i >= 0; i--) {
    if (!isTidy(ary[i], ary[i + 1])) {
      min = Math.min(min, i + 1);
    } 
  }
  for(i = min; i < ary.length; i++) {
    ary[i].val = 9;
  }
  return ary.map(function(v) { return v.val; }).join('').replace(/^0+/, '');
}

var caseNo = +reader.readLine();

for(var i = 1; i <= caseNo; i++) {
  console.log('case #' + i + ': ' + getTidyNumber(reader.readLine()));
}
