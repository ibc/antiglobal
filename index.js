var lastGlobals = getGlobals();
var doLog = true;
var doThrow = false;

function antiglobal()
{
	var globals = getGlobals(); // Get current globals
	var givenGlobals = Array.prototype.slice.call(arguments);
	var newGlobals = [];
	var removedGlobals = [];
	var changed = false;
	var i, len, elem;

	for (i=0, len=globals.length; i<len; i++)
	{
		elem = globals[i];

		if (lastGlobals.indexOf(elem) === -1 && givenGlobals.indexOf(elem) === -1)
		{
			newGlobals.push(elem);
			changed = true;
		}
	}

	for (i=0, len=lastGlobals.length; i<len; i++)
	{
		elem = lastGlobals[i];

		if (globals.indexOf(elem) === -1)
		{
			removedGlobals.push(elem);
			changed = true;
		}
	}

	// Update lastGlobals
	lastGlobals = globals;

	if (changed)
	{
		var msg = 'antiglobal() | globals do not match:';

		for (i=0, len=newGlobals.length; i<len; i++)
		{
			elem = newGlobals[i];
			msg = msg + '\n+ ' + elem;
		}

		for (i=0, len=removedGlobals.length; i<len; i++)
		{
			elem = removedGlobals[i];
			msg = msg + '\n- ' + elem;
		}

		if (doLog)
			console.error(msg);
		if (doThrow)
			throw new Error(msg);
	}

	return !changed;
}

/**
 * Reset current globals
 */
antiglobal.reset = function()
{
	lastGlobals = getGlobals();
};

/**
 * Public properties
 */
Object.defineProperties(antiglobal,
{
	log:
	{
		get: function()     { return doLog;          },
		set: function(bool) { doLog = Boolean(bool); }
	},
	throw:
	{
		get: function()     { return doThrow;          },
		set: function(bool) { doThrow = Boolean(bool); }
	}
});

/**
 * Private API
 */

function getGlobals()
{
	var globals = [];

	for (var key in global)
	{
		if (global.hasOwnProperty(key))
		{
			// Ignore this module
			if (key !== 'antiglobal')
				globals.push(key);
		}
	}

	return globals;
}

module.exports = antiglobal;
