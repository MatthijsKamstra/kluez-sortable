(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Data = function() { };
Data.__name__ = true;
Data.getData = function() {
	return [{ title : "Milestone A", type : "milestone", issues : [{ title : "issue 1", type : "issue"},{ title : "issue 2", type : "issue"},{ title : "issue 3", type : "issue"}]},{ title : "Milestone B", type : "milestone", issues : [{ title : "issue 4", type : "issue"},{ title : "issue 5", type : "issue"},{ title : "issue 6", type : "issue"}]}];
};
var Main = function() {
	this.KLUEZ_WRAPPER_ID = "kluez-sortable-generate";
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-09-17 21:01:48" + " ");
		_gthis.initTest();
		_gthis.generateList();
	});
};
Main.__name__ = true;
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	generateList: function() {
		var _gthis = this;
		var container = window.document.getElementById("wrapper");
		var checkMilestone = window.document.getElementById("checkDragMilestones");
		var checkIssue = window.document.getElementById("checkDragIssues");
		var dataArr = Data.getData();
		$global.console.log(dataArr);
		var div = window.document.createElement("div");
		div.id = this.KLUEZ_WRAPPER_ID;
		div.className = "kluez-board kl-sortable";
		container.appendChild(div);
		var _g = 0;
		var _g1 = dataArr.length;
		while(_g < _g1) {
			var i = _g++;
			var milestone = dataArr[i];
			var group = window.document.createElement("div");
			group.className = "group";
			group.dataset.klMilestoneName = "" + milestone.title;
			div.appendChild(group);
			var heading = window.document.createElement("h2");
			heading.innerHTML = "" + milestone.title;
			group.appendChild(heading);
			var groupGoals = window.document.createElement("div");
			groupGoals.className = "group__goals kl-sortable";
			group.appendChild(groupGoals);
			var _g2 = 0;
			var _g3 = milestone.issues.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var issue = milestone.issues[j];
				var goalTemplate = "<div class=\"goal kl-goal\" data-kl-type=\"" + issue.type + "\"><span class=\"badge rounded-pill text-bg-dark\">" + j + "</span><div class=\"box title\">" + issue.title + "</div><div class=\"box kl-box \">" + issue.title + "</div></div>";
				var frag = window.document.createRange().createContextualFragment(goalTemplate);
				groupGoals.appendChild(frag);
			}
		}
		var list = window.document.querySelectorAll(".kl-sortable");
		var _g = 0;
		var _g1 = list.length;
		while(_g < _g1) {
			var i = _g++;
			var node = js_Boot.__cast(list[i] , HTMLElement);
			new Sortable(node,{ group : "scoreboard", direction : "vertical", animation : 250, scroll : true, bubbleScroll : true, onMove : function(evt,originalEvent) {
				if(evt.dragged.classList.contains("group") && evt.to.classList.contains("group__goals")) {
					return false;
				} else {
					return true;
				}
			}, onEnd : function(evt) {
				_gthis.onEndHandler(evt);
			}});
		}
		this.onEndHandler(null);
	}
	,onEndHandler: function(evt) {
		console.log("src/Main.hx:98:","onEndHandler " + Std.string(evt));
		console.log("src/Main.hx:99:",evt);
		var mileStoneCounter = 1;
		var issueCounter = 1;
		var wrapper = window.document.getElementById(this.KLUEZ_WRAPPER_ID);
		var _g = 0;
		var _g1 = wrapper.children.length;
		while(_g < _g1) {
			var i = _g++;
			var childGrup = wrapper.children[i];
			console.log("src/Main.hx:118:",childGrup);
			var _g2 = 0;
			var _g3 = childGrup.children.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var child = childGrup.children[j];
				if(child.localName == "h2") {
					console.log("src/Main.hx:123:","child: " + child.innerText);
				} else {
					console.log("src/Main.hx:125:",child);
					var _g4 = 0;
					var _g5 = child.children.length;
					while(_g4 < _g5) {
						var k = _g4++;
						var c = child.children[k];
						console.log("src/Main.hx:128:",c.innerText);
						var badge = c.querySelector(".badge");
						badge.innerHTML = "" + issueCounter;
						var klBox = c.querySelector(".kl-box");
						klBox.setAttribute("style","left:" + issueCounter * 100 + "px;width:100px;");
						++issueCounter;
					}
				}
			}
		}
	}
	,initTest: function() {
		var _gthis = this;
		var list = window.document.querySelectorAll(".sortable");
		var _g = 0;
		var _g1 = list.length;
		while(_g < _g1) {
			var i = _g++;
			var node = js_Boot.__cast(list[i] , HTMLElement);
			console.log("src/Main.hx:148:",node);
			new Sortable(node,{ group : "scoreboard", direction : "vertical", animation : 250, scroll : true, bubbleScroll : true, onMove : function(evt,originalEvent) {
				if(evt.dragged.classList.contains("group") && evt.to.classList.contains("group__goals")) {
					return false;
				} else {
					return true;
				}
			}, onEnd : function(evt) {
				_gthis.onEndHandler(evt);
			}});
		}
	}
	,__class__: Main
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var model_constants_App = function() { };
model_constants_App.__name__ = true;
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
model_constants_App.NAME = "[Kluez sortable]";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-sortable.js.map