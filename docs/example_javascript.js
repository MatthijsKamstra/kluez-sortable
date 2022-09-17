(function ($global) { "use strict";
var Main = function() {
	console.log("src/Main.hx:19:","Hello 'Example Javascript'");
};
Main.main = function() {
	var app = new Main();
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
Main.main();
})({});

//# sourceMappingURL=example_javascript.js.map