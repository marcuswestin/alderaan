dojo.provide("bespin.util.css");


dojo.mixin(bespin.util.css, {
	
	hasClassName: function(el, className) {
		var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)")
		return (el.className.length > 0 && (el.className == className ||
	      regexp.test(el.className)));
	},
	
	addClassName: function(el, className) {
		if (!this.hasClassName(el, className)) {
			el.className += ' ' + className
		}
	},
	
	removeClassName: function(el, className) {
		var regexp = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		el.className = this.strip(el.className.replace(regexp, ' '));
	},
	
	// This function should move to a string util file
	strip: function(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	}

});