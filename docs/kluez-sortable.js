(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() {
	this.KLUEZ_WRAPPER_ID = "kluez-sortable-generate";
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-09-18 16:27:02" + " ");
		_gthis.createObje();
		_gthis.initMenu();
		_gthis.generateList();
		_gthis.initTest();
	});
};
Main.__name__ = true;
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	createObje: function() {
		var project1 = new model_vo_ProjectVO("ProjectName Foobar",new Date(2022,utils_DateUtil.november,20,0,0,0),new Date(2022,utils_DateUtil.december,20,0,0,0));
		var milestone1 = new model_vo_MilestoneVO("first milestone");
		var milestone2 = new model_vo_MilestoneVO("second milestone");
		var milestone3 = new model_vo_MilestoneVO("third milestone");
		project1.milestones.push(milestone1);
		project1.milestones.push(milestone2);
		project1.milestones.push(milestone3);
		var issue1 = new model_vo_IssueVO("a issue","2d");
		var issue2 = new model_vo_IssueVO("b issue","2d");
		var issue3 = new model_vo_IssueVO("c issue","2d");
		milestone1.issues = [issue1,issue2,issue3];
		var issue4 = new model_vo_IssueVO("d issue","2d");
		var issue5 = new model_vo_IssueVO("e issue","2d");
		milestone2.issues = [issue4,issue5];
		var issue6 = new model_vo_IssueVO("f issue","2d");
		var issue7 = new model_vo_IssueVO("g issue","2d");
		var issue8 = new model_vo_IssueVO("e issue","2d");
		milestone3.issues = [issue6,issue7,issue8];
		console.log("src/Main.hx:61:",project1);
		console.log("src/Main.hx:62:",JSON.stringify(project1));
		this.data = project1;
	}
	,initMenu: function() {
		var _gthis = this;
		var btnJson = window.document.getElementById("btn-download-json");
		var btnCsv = window.document.getElementById("btn-download-csv");
		var btnMermaid = window.document.getElementById("btn-download-mermaid");
		btnJson.onclick = function() {
			_gthis.download("{}","test.json","text/plain");
		};
		btnCsv.onclick = function() {
			_gthis.download("csv","test.csv","text/plain");
		};
		btnMermaid.onclick = function() {
			_gthis.download("mermaid","mermaid.md","text/plain");
		};
		var checkMilestone = window.document.getElementById("checkDragMilestones");
		var checkIssue = window.document.getElementById("checkDragIssues");
		checkMilestone.onchange = function(e) {
			console.log("src/Main.hx:80:","toggle milestons" + Std.string(e));
			console.log("src/Main.hx:81:",(js_Boot.__cast(e.target , HTMLInputElement)).id);
		};
		checkIssue.onchange = function(e) {
			console.log("src/Main.hx:84:","toggle issue " + Std.string(e));
			console.log("src/Main.hx:85:",e);
		};
	}
	,generateList: function() {
		var _gthis = this;
		var container = window.document.getElementById("wrapper");
		var div = window.document.createElement("div");
		div.id = this.KLUEZ_WRAPPER_ID;
		div.className = "kluez-board kl-sortable";
		container.appendChild(div);
		var heading = window.document.createElement("h1");
		heading.innerHTML = this.data.get_title();
		div.appendChild(heading);
		var _g = 0;
		var _g1 = this.data.milestones.length;
		while(_g < _g1) {
			var i = _g++;
			var milestone = this.data.milestones[i];
			var group = window.document.createElement("div");
			group.className = "group";
			var tmp = milestone.get_title();
			group.dataset.klMilestoneName = "" + tmp;
			div.appendChild(group);
			var heading = window.document.createElement("h2");
			heading.innerHTML = "" + milestone.get_title();
			group.appendChild(heading);
			var groupGoals = window.document.createElement("div");
			groupGoals.className = "group__goals kl-sortable";
			group.appendChild(groupGoals);
			var _g2 = 0;
			var _g3 = milestone.issues.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var issue = milestone.issues[j];
				var goalTemplate = "<div class=\"goal kl-goal\" data-kl-type=\"" + issue.get__type() + "\"><span class=\"badge rounded-pill text-bg-dark\">" + j + "</span><div class=\"box title\">" + issue.get_title() + "</div><div class=\"box kl-box \">" + issue.get_title() + "</div></div>";
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
		console.log("src/Main.hx:155:","onEndHandler " + Std.string(evt));
		console.log("src/Main.hx:156:",evt);
		var mileStoneCounter = 0;
		var issueCounter = 0;
		var wrapper = window.document.getElementById(this.KLUEZ_WRAPPER_ID);
		var _g = 0;
		var _g1 = wrapper.children.length;
		while(_g < _g1) {
			var i = _g++;
			var childGrup = wrapper.children[i];
			console.log("src/Main.hx:175:",childGrup);
			var _g2 = 0;
			var _g3 = childGrup.children.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var child = childGrup.children[j];
				if(child.localName == "h2") {
					console.log("src/Main.hx:180:","child: " + child.innerText);
				} else {
					console.log("src/Main.hx:182:",child);
					var _g4 = 0;
					var _g5 = child.children.length;
					while(_g4 < _g5) {
						var k = _g4++;
						var c = child.children[k];
						console.log("src/Main.hx:185:",c.innerText);
						var badge = c.querySelector(".badge");
						badge.innerHTML = "" + (issueCounter + 1);
						var klBox = c.querySelector(".kl-box");
						klBox.setAttribute("style","left:" + issueCounter * 100 + "px;width:100px;");
						++issueCounter;
					}
				}
			}
		}
	}
	,download: function(content,fileName,contentType) {
		var a = window.document.createElement("a");
		var file = new Blob([content],{ type : contentType});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
	,initTest: function() {
		var _gthis = this;
		var list = window.document.querySelectorAll(".sortable");
		var _g = 0;
		var _g1 = list.length;
		while(_g < _g1) {
			var i = _g++;
			var node = js_Boot.__cast(list[i] , HTMLElement);
			console.log("src/Main.hx:231:",node);
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
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
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
var model_vo_IssueVO = function(title,duration,startDate) {
	this._type = "issue";
	this.set__id(utils_UUID.uuid());
	this.set_title(title);
	this.duration = duration;
	this.startDate = startDate;
};
model_vo_IssueVO.__name__ = true;
model_vo_IssueVO.prototype = {
	get_title: function() {
		return this.title;
	}
	,set_title: function(value) {
		return this.title = value;
	}
	,set__id: function(value) {
		return this._id = value;
	}
	,get__type: function() {
		return this._type;
	}
	,__class__: model_vo_IssueVO
};
var model_vo_MilestoneVO = function(title) {
	this.set__id(utils_UUID.uuid());
	this.set_title(title);
	this.issues = [];
};
model_vo_MilestoneVO.__name__ = true;
model_vo_MilestoneVO.prototype = {
	get_title: function() {
		return this.title;
	}
	,set_title: function(value) {
		return this.title = value;
	}
	,set__id: function(value) {
		return this._id = value;
	}
	,__class__: model_vo_MilestoneVO
};
var model_vo_ProjectVO = function(title,startDate,endDate) {
	this.set__id(utils_UUID.uuid());
	this.set_title(title);
	this.milestones = [];
	this.startDate = startDate;
	this.endDate = endDate;
};
model_vo_ProjectVO.__name__ = true;
model_vo_ProjectVO.prototype = {
	get_title: function() {
		return this.title;
	}
	,set_title: function(value) {
		return this.title = value;
	}
	,set__id: function(value) {
		return this._id = value;
	}
	,__class__: model_vo_ProjectVO
};
var utils_DateUtil = function() { };
utils_DateUtil.__name__ = true;
var utils_UUID = function() { };
utils_UUID.__name__ = true;
utils_UUID.uuid = function() {
	var uid_b = "";
	var a = 8;
	uid_b += Std.string(StringTools.hex(new Date().getTime() | 0,8));
	while(a++ < 36) uid_b += Std.string((a * 51 & 52) != 0 ? StringTools.hex((a ^ 15) != 0 ? 8 ^ (Math.random() * ((a ^ 20) != 0 ? 16 : 4) | 0) : 4) : "-");
	return uid_b.toLowerCase();
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
model_constants_App.NAME = "[Kluez sortable]";
utils_DateUtil.november = 10;
utils_DateUtil.december = 11;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-sortable.js.map