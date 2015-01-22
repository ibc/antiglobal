var antiglobal = require('../');

antiglobal.log = false;

module.exports = {
	'call without global additions': function(test) {
		test.ok(antiglobal());

		test.done();
	},

	'call after a global addition': function(test) {
		global.AAA = 'aaa';

		test.ok(antiglobal('AAA'));

		test.done();
	},

	'call after two global additions': function(test) {
		global.BBB = 'bbb';
		global.CCC = 'ccc';

		test.ok(antiglobal('BBB', 'CCC'));

		test.done();
	},

	'antiglobal.throw=true works': function(test) {
		antiglobal.throw = true;

		global.DDD = 'ddd';
		global.EEE = 'eee';

		test.throws(function() {
			antiglobal('DDD');
		}, Error);

		antiglobal.throw = false;
		test.done();
	},

	'final call without global addition': function(test) {
		test.ok(antiglobal());

		test.done();
	}
};
