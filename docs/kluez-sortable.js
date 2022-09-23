(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
DateTools.__name__ = true;
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "A":
		return DateTools.DAY_NAMES[d.getDay()];
	case "B":
		return DateTools.MONTH_NAMES[d.getMonth()];
	case "C":
		return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "Y":
		return Std.string(d.getFullYear());
	case "a":
		return DateTools.DAY_SHORT_NAMES[d.getDay()];
	case "b":case "h":
		return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "e":
		return Std.string(d.getDate());
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) {
			return "PM";
		} else {
			return "AM";
		}
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "s":
		return Std.string(d.getTime() / 1000 | 0);
	case "t":
		return "\t";
	case "u":
		var t = d.getDay();
		if(t == 0) {
			return "7";
		} else if(t == null) {
			return "null";
		} else {
			return "" + t;
		}
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	default:
		throw new haxe_exceptions_NotImplementedException("Date.format %" + e + "- not implemented yet.",null,{ fileName : "DateTools.hx", lineNumber : 101, className : "DateTools", methodName : "__format_get"});
	}
};
DateTools.__format = function(d,f) {
	var r_b = "";
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) {
			break;
		}
		var len = np - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	var len = f.length - p;
	r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
	return r_b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() {
	this.KLUEZ_WRAPPER_ID = "kluez-sortable-generate";
	this.kluezDataMermaid = "";
	this.kluezDataCsv = "";
	this.kluezDataJson = "";
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-09-23 10:26:56" + " ");
		_gthis.createObje();
		_gthis.initMenu();
		_gthis.generateList();
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
		var issue2 = new model_vo_IssueVO("b issue","3d");
		var issue3 = new model_vo_IssueVO("c issue","10d");
		milestone1.issues = [issue1,issue2,issue3];
		var issue4 = new model_vo_IssueVO("d issue","4d");
		var issue5 = new model_vo_IssueVO("e issue","2d");
		milestone2.issues = [issue4,issue5];
		var issue6 = new model_vo_IssueVO("f issue","1d");
		var issue7 = new model_vo_IssueVO("g issue","2d");
		var issue8 = new model_vo_IssueVO("e issue","4d");
		milestone3.issues = [issue6,issue7,issue8];
		console.log("src/Main.hx:65:",project1);
		console.log("src/Main.hx:66:",JSON.stringify(project1));
		this.data = project1;
	}
	,initMenu: function() {
		var _gthis = this;
		var btnJson = window.document.getElementById("btn-download-json");
		var btnCsv = window.document.getElementById("btn-download-csv");
		var btnMermaid = window.document.getElementById("btn-download-mermaid");
		btnJson.onclick = function() {
			_gthis.download(_gthis.kluezDataJson,"kluez_data.json","text/plain");
		};
		btnCsv.onclick = function() {
			_gthis.download(_gthis.kluezDataCsv,"kluez_data.csv","text/plain");
		};
		btnMermaid.onclick = function() {
			_gthis.download(_gthis.kluezDataMermaid,"kluez_data_mermaid.md","text/plain");
		};
		var checkMilestone = window.document.getElementById("checkDragMilestones");
		var checkIssue = window.document.getElementById("checkDragIssues");
		checkMilestone.onchange = function(e) {
			console.log("src/Main.hx:84:","toggle milestons" + Std.string(e));
			console.log("src/Main.hx:85:",(js_Boot.__cast(e.target , HTMLInputElement)).id);
		};
		checkIssue.onchange = function(e) {
			console.log("src/Main.hx:88:","toggle issue " + Std.string(e));
			console.log("src/Main.hx:89:",e);
		};
	}
	,generateList: function() {
		var _gthis = this;
		var container = window.document.getElementById("wrapper");
		var input = window.document.createElement("input");
		input.value = this.data.get_title();
		var tmp = this.data.get__id();
		input.dataset.klId = "" + tmp;
		var tmp = this.data.get_title();
		input.dataset.klTitle = "" + tmp;
		input.className = "_form-control h1 form-controle-focus";
		input.onblur = function(e) {
			console.log("src/Main.hx:105:","focusout" + e.target.value);
			return _gthis.data.set_title(e.target.value);
		};
		container.appendChild(input);
		this.header1 = input;
		var div = window.document.createElement("div");
		div.id = this.KLUEZ_WRAPPER_ID;
		div.className = "kluez-board kl-sortable";
		container.appendChild(div);
		var _g = 0;
		var _g1 = this.data.milestones.length;
		while(_g < _g1) {
			var i = _g++;
			var milestone = this.data.milestones[i];
			var group = window.document.createElement("div");
			var tmp = milestone.get__id();
			group.dataset.klId = "" + tmp;
			var tmp1 = milestone.get_title();
			group.dataset.klTitle = "" + tmp1;
			group.className = "group";
			div.appendChild(group);
			var input = window.document.createElement("input");
			input.value = milestone.get_title();
			input.dataset.klId = milestone.get__id();
			input.dataset.klTitle = milestone.get_title();
			input.className = "_form-control h2 form-controle-focus";
			group.appendChild(input);
			var groupGoals = window.document.createElement("div");
			groupGoals.className = "group__goals kl-sortable";
			group.appendChild(groupGoals);
			var _g2 = 0;
			var _g3 = milestone.issues.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var issue = milestone.issues[j];
				var goalTemplate = "\n<div\ndata-kl-type=\"" + issue.get__type() + "\"\ndata-kl-id=\"" + issue.get__id() + "\"\ndata-kl-title=\"" + issue.get_title() + "\"\ndata-kl-duration=\"" + issue.get_duration() + "\"\ndata-kl-start-date=\"" + Std.string(issue.get_startDate()) + "\"\nclass=\"goal kl-goal\"\n>\n\t<span class=\"badge rounded-pill text-bg-dark\">" + j + "</span>\n\t<div class=\"box title\">" + issue.get_title() + "</div>\n\t<div class=\"box kl-box \">" + issue.get_title() + "</div>\n</div>";
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
		$global.console.warn("---------------------------------");
		console.log("src/Main.hx:191:","onEndHandler " + Std.string(evt));
		console.log("src/Main.hx:192:",evt);
		var mileStoneCounter = 0;
		var issueCounter = 0;
		var _mermaid = new export_Mermaid().init();
		var _csv = new export_Csv().init();
		var _projectVO = new model_vo_ProjectVO(this.data.get_title(),this.data.startDate,this.data.endDate);
		_projectVO.set__id(this.data.get__id());
		var container = window.document.getElementById(this.KLUEZ_WRAPPER_ID);
		var _g = 0;
		var _g1 = container.children.length;
		while(_g < _g1) {
			var i = _g++;
			var mileStoneWrapper = container.children[i];
			console.log("src/Main.hx:207:","---> mileStoneWrapper");
			console.log("src/Main.hx:208:",mileStoneWrapper);
			var _mileStoneVO = new model_vo_MilestoneVO("x");
			_projectVO.milestones.push(_mileStoneVO);
			var _g2 = 0;
			var _g3 = mileStoneWrapper.children.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var child = mileStoneWrapper.children[j];
				console.log("src/Main.hx:216:","child");
				console.log("src/Main.hx:217:",child);
				if(child.localName == "input") {
					var t = (js_Boot.__cast(child , HTMLInputElement)).value;
					console.log("src/Main.hx:227:","child: " + (js_Boot.__cast(child , HTMLInputElement)).value);
					_mileStoneVO.set_title(t);
					_mileStoneVO.set__id((js_Boot.__cast(child , HTMLInputElement)).dataset.klId);
				} else {
					console.log("src/Main.hx:231:",child);
					var _g4 = 0;
					var _g5 = child.children.length;
					while(_g4 < _g5) {
						var k = _g4++;
						var c = child.children[k];
						console.log("src/Main.hx:235:",c.innerText);
						console.log("src/Main.hx:236:",c.dataset.klId);
						console.log("src/Main.hx:237:",c.dataset.klType);
						console.log("src/Main.hx:238:",c.dataset.klDuration);
						console.log("src/Main.hx:239:",c.dataset.klTitle);
						var _issueVO = new model_vo_IssueVO(c.dataset.klTitle,c.dataset.klDuration);
						_issueVO.set__id(c.dataset.klId);
						_mileStoneVO.issues.push(_issueVO);
						var badge = c.querySelector(".badge");
						badge.innerHTML = "" + (issueCounter + 1);
						var klBox = c.querySelector(".kl-box");
						klBox.setAttribute("style","left:" + issueCounter * 100 + "px;width:100px;");
						++issueCounter;
					}
				}
			}
			$global.console.info(_projectVO);
			$global.console.info(JSON.stringify(_projectVO));
			this.kluezDataJson = JSON.stringify(_projectVO,null,"  ");
			this.kluezDataCsv = _csv;
			this.kluezDataMermaid = _mermaid;
			var div = window.document.getElementById("js-json");
			div.innerText = JSON.stringify(_projectVO,null,"  ");
			var div2 = window.document.getElementById("js-csv");
			div2.innerText = _csv;
			var div3 = window.document.getElementById("js-mermaid");
			div3.innerText = _mermaid;
		}
	}
	,download: function(content,fileName,contentType) {
		var t = DateTools.format(new Date(),"%Y%m%d_%H%M%S");
		fileName = StringTools.replace(fileName,".","_" + t + ".");
		var a = window.document.createElement("a");
		var file = new Blob([content],{ type : contentType});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
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
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
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
var export_Csv = function() {
	this.monthArr = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
};
export_Csv.__name__ = true;
export_Csv.prototype = {
	init: function(startDate) {
		if(startDate == null) {
			startDate = new Date(2022,0,3,0,0,0);
		}
		var content = "";
		var string1 = "";
		var string2 = "";
		var string3 = "";
		var string4 = "";
		var string5 = "";
		var string6 = "";
		var weekCounter = 1;
		var nextDate = startDate;
		var _g = 0;
		while(_g < 53) {
			var i = _g++;
			var fiveDays = new Date(nextDate.getTime() + 432000000.);
			string1 += "\"" + this.monthArr[nextDate.getMonth()] + " " + nextDate.getFullYear() + "\",,,,,";
			string3 += "\"Week " + weekCounter + "\",,,,,";
			string4 += "" + nextDate.getDate() + "," + new Date(nextDate.getTime() + 86400000.).getDate() + "," + new Date(nextDate.getTime() + 172800000.).getDate() + "," + new Date(nextDate.getTime() + 259200000.).getDate() + "," + new Date(nextDate.getTime() + 345600000.).getDate() + ",";
			string5 += ",,,,,";
			++weekCounter;
			nextDate = new Date(nextDate.getTime() + 604800000.);
		}
		content += "\"Phase\",\"Title\"," + string1 + "\n";
		content += ",," + string3 + "\n";
		content += ",," + string4 + "\n";
		content += ",," + string5 + "\n";
		return content;
	}
	,__class__: export_Csv
};
var export_Mermaid = function() {
	console.log("src/export/Mermaid.hx:5:","Mermaid");
};
export_Mermaid.__name__ = true;
export_Mermaid.prototype = {
	init: function() {
		return "\n```mermaid\ngantt\n\ttitle A Gantt Diagram\n\tdateFormat YYYY-MM-DD\n\texcludes weekends\n\n\t%% section Section\n\t%% A task : a1, 2022-02-17, 30d\n\t%% Another task : after a1, 20d\n\t%% section Another\n\t%% Task in sec : 2022-02-24, 12d\n\t%% another task : 24d\n\n\n\t1.0-Setup-Backend-(Craft) : a0, 2022-02-17, 1d\n\t1.1-Setup-Server : a1, after a0, 1d\n\t1.2-Setup-Frontend : a2, after a1, 6d\n\t2.0-Start-Backend-(Craft) : a3, after a2, 1d\n\t2.1-Start-Frontend : a4, after a3, 12d\n\t3.0-Frontend : a5, after a4, 9d\n\t3.1-Backend : a6, after a5, 26d\n\t5.0-Search : a7, after a6, 2d\n\t5.2-Testing : a8, after a7, 15d\n\t5.3-Content : a9, after a8, 1d\n\t5.4-Misc : a10, after a9, 6d\n\n```\n\n\t\t";
	}
	,__class__: export_Mermaid
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
	toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
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
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
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
	this.set_duration(duration);
	if(startDate != null) {
		this.set_startDate(startDate);
	}
};
model_vo_IssueVO.__name__ = true;
model_vo_IssueVO.prototype = {
	get_title: function() {
		return this.title;
	}
	,set_title: function(value) {
		return this.title = value;
	}
	,get__id: function() {
		return this._id;
	}
	,set__id: function(value) {
		return this._id = value;
	}
	,get__type: function() {
		return this._type;
	}
	,get_duration: function() {
		return this.duration;
	}
	,set_duration: function(value) {
		return this.duration = value;
	}
	,get_startDate: function() {
		return this.startDate;
	}
	,set_startDate: function(value) {
		return this.startDate = value;
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
	,get__id: function() {
		return this._id;
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
	,get__id: function() {
		return this._id;
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
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
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
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
model_constants_App.NAME = "[Kluez sortable]";
utils_DateUtil.november = 10;
utils_DateUtil.december = 11;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-sortable.js.map