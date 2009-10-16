// dojo.provide('bespin.lib.Publisher');

dojo.declare("bespin.lib.Publisher", null, {

	constructor: function() {
		this.subscribers = {}
	},
	
	subscribe: function(signal, callback) {
		if (!this.subscribers[signal]) { this.subscribers[signal] = []; }
		this.subscribers[signal].push(callback);
	},
	
	publish: function(signal /*, arg1, arg2 */) {
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i=0, subscriber; (subscriber = this.subscribers[signal][i]); i++) {
			subscriber.apply(this, args);
		}
	}
	
})