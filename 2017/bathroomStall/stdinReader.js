function stdinReader() {
	var fs = require('fs');
	var lines = fs.readFileSync('/dev/stdin').toString().split('\n');

	return {
		readLine: function() {
			return lines.shift();
		}
	};
}


module.exports = {
  stdinReader: stdinReader
};

