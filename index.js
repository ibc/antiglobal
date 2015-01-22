/**
 * Expose the antiglobal function.
 */
module.exports = antiglobal;


/**
 * Local variables.
 */
var lastGlobals = getGlobals();
var doLog = true;
var doThrow = false;


function antiglobal() {
	var givenDiff = Array.prototype.slice.call(arguments),
		realDiff = [],
		ret = false,
		globals, i, len, elem, msg;

	// Get current globals;
	globals = getGlobals();

	// Create current diff.
	for (i=0, len=globals.length; i<len; i++) {
		elem = globals[i];

		if (lastGlobals.indexOf(elem) === -1) {
			realDiff.push(elem);
		}
	}

	// Compare diffs.
	if (givenDiff.length === realDiff.length) {
		ret = true;

		for (i=0, len=givenDiff.length; i<len; i++) {
			elem = givenDiff[i];

			if (realDiff.indexOf(elem) === -1) {
				ret = false;
				break;
			}
		}
	}

	// Update lastGlobals.
	lastGlobals = globals;

	if (!ret) {
		msg = 'antiglobal() | ERROR: given globals do not match real new globals [given: ' + givenDiff + ' | real: ' + realDiff + ']';
		if (doLog)   { console.error(msg);   }
		if (doThrow) { throw new Error(msg); }
	}

	return ret;
}


/**
 * Reset current globals.
 */
antiglobal.reset = function() {
	lastGlobals = getGlobals();
};


/**
 * Public properties.
 */
Object.defineProperties(antiglobal, {
	log: {
		get: function() { return doLog; },
		set: function(bool) { doLog = Boolean(bool); }
	},

	throw: {
		get: function() { return doThrow; },
		set: function(bool) { doThrow = Boolean(bool); }
	}
});


/**
 * Private API.
 */


function getGlobals() {
	var globals = [];

	for (var key in global) {
		if (global.hasOwnProperty(key)) {
			// Ignore this module.
			if (key !== 'antiglobal') {
				globals.push(key);
			}
		}
	}

	return globals;
}
