KEYJS = {
	pressed: [],
	commandKeys: {
		8: 'backspace',
		9: 'tab',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		27: 'esc',
		32: 'space',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		91: 'cmd',
		93: 'cmd'
	},
	keyName: function(n) {
		if (KEYJS.commandKeys[n]) return KEYJS.commandKeys[n]
		else return String.fromCharCode(n).trim().toLowerCase();
	},

	actions: {},
	act: function() {
		var f = KEYJS.actions[KEYJS.pressed.sort().join(' ')];
		// console.log('act', f, KEYJS.pressed.sort().join(' '));
		if (f) console.log('KEY.js action:', KEYJS.pressed.sort().join(' '));
		if (f) f();
	}
};

document.addEventListener('keydown', function(ev) {
	var key = KEYJS.keyName(ev.which);
	if (KEYJS.pressed.indexOf(key) != -1) return;
	KEYJS.pressed.push(key);
	// console.log('KEY.js pressed:', KEYJS.pressed);
	KEYJS.act();
});
document.addEventListener('keyup', function(ev) {
	var key = KEYJS.keyName(ev.which);
	var index = KEYJS.pressed.indexOf(key);
	if (index > -1)
		KEYJS.pressed.splice(index, 1);
	// console.log('KEY.js pressed:', KEYJS.pressed);
});

KEY = function(keys, callback) {
	keys = keys.split(' ').sort().join(' ');
	return {
		then: function(callback) {
			console.log("KEY.js register:", keys);
			KEYJS.actions[keys] = callback;
		}
	};
}