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
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
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
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-09-23 20:57:48" + " ");
		_gthis.setupDataObject();
		_gthis.setupMenu();
		_gthis.generate();
		var csv = new export_Csv();
	});
};
Main.__name__ = true;
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	setupDataObject: function() {
		var project1 = new model_vo_ProjectVO("ProjectName Foobar",new Date(2022,utils_DateUtil.october,5,0,0,0),new Date(2023,utils_DateUtil.december,5,0,0,0));
		var milestone1 = new model_vo_MilestoneVO("first milestone");
		var milestone2 = new model_vo_MilestoneVO("second milestone");
		var milestone3 = new model_vo_MilestoneVO("third milestone");
		project1.milestones.push(milestone1);
		project1.milestones.push(milestone2);
		project1.milestones.push(milestone3);
		var issue1 = new model_vo_IssueVO("a issue","2d");
		var issue2 = new model_vo_IssueVO("b issue","3d");
		var issue3 = new model_vo_IssueVO("c issue","1d");
		milestone1.issues = [issue1,issue2,issue3];
		var issue4 = new model_vo_IssueVO("d issue","4d");
		var issue5 = new model_vo_IssueVO("e issue","2d");
		milestone2.issues = [issue4,issue5];
		var issue6 = new model_vo_IssueVO("f issue","1d");
		var issue7 = new model_vo_IssueVO("g issue","2d");
		var issue8 = new model_vo_IssueVO("e issue","10d");
		milestone3.issues = [issue6,issue7,issue8];
		console.log("src/Main.hx:78:",project1);
		console.log("src/Main.hx:79:",JSON.stringify(project1));
		this.data = project1;
	}
	,setupMenu: function() {
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
			console.log("src/Main.hx:97:","toggle milestons" + Std.string(e));
			console.log("src/Main.hx:98:",(js_Boot.__cast(e.target , HTMLInputElement)).id);
		};
		checkIssue.onchange = function(e) {
			console.log("src/Main.hx:101:","toggle issue " + Std.string(e));
			console.log("src/Main.hx:102:",e);
		};
		this.inputStartDate = window.document.getElementById("formControleInputStartDate");
		this.inputStartDate.value = DateTools.format(this.data.startDate,"%F");
		this.inputStartDate.onchange = function(e) {
			console.log("src/Main.hx:108:","inputStartDate");
			console.log("src/Main.hx:109:",(js_Boot.__cast(e.target , HTMLInputElement)).value);
			console.log("src/Main.hx:110:",e);
			var tmp = HxOverrides.strDate((js_Boot.__cast(e.target , HTMLInputElement)).value);
			_gthis.data.startDate = tmp;
			_gthis.onUpdate();
		};
		this.inputEndDate = window.document.getElementById("formControleInputEndDate");
		this.inputEndDate.value = DateTools.format(this.data.endDate,"%F");
		this.inputEndDate.onchange = function(e) {
			console.log("src/Main.hx:119:","inputEndDate");
			console.log("src/Main.hx:120:",(js_Boot.__cast(e.target , HTMLInputElement)).value);
			console.log("src/Main.hx:121:",e);
			var tmp = HxOverrides.strDate((js_Boot.__cast(e.target , HTMLInputElement)).value);
			_gthis.data.endDate = tmp;
			_gthis.onUpdate();
		};
	}
	,generate: function() {
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
			console.log("src/Main.hx:138:","focusout" + e.target.value);
			_gthis.data.set_title(e.target.value);
			_gthis.onUpdate();
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
			var milestone = [this.data.milestones[i]];
			var group = window.document.createElement("div");
			var tmp = milestone[0].get__id();
			group.dataset.klId = "" + tmp;
			var tmp1 = milestone[0].get_title();
			group.dataset.klTitle = "" + tmp1;
			group.className = "group";
			div.appendChild(group);
			var input = [window.document.createElement("input")];
			input[0].value = milestone[0].get_title();
			input[0].dataset.klId = milestone[0].get__id();
			input[0].dataset.klTitle = milestone[0].get_title();
			input[0].className = "_form-control h2 form-controle-focus";
			input[0].onblur = (function(input,milestone) {
				return function(e) {
					console.log("src/Main.hx:170:","focusout" + e.target.value);
					milestone[0].set_title(e.target.value);
					input[0].dataset.klTitle = e.target.value;
					_gthis.onUpdate();
				};
			})(input,milestone);
			group.appendChild(input[0]);
			var groupGoals = window.document.createElement("div");
			groupGoals.className = "group__goals kl-sortable";
			group.appendChild(groupGoals);
			var _g2 = 0;
			var _g3 = milestone[0].issues.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var issue = milestone[0].issues[j];
				var goalTemplate = "\n<div\ndata-kl-type=\"" + issue.get__type() + "\"\ndata-kl-id=\"" + issue.get__id() + "\"\ndata-kl-title=\"" + issue.get_title() + "\"\ndata-kl-duration=\"" + issue.get_duration() + "\"\ndata-kl-start-date=\"" + Std.string(issue.get_startDate()) + "\"\ndata-kl-end-date=\"\"\nclass=\"goal kl-goal\"\ntitle=\"" + issue.get_title() + ", " + Std.string(issue.get_startDate()) + ", " + issue.get_duration() + "\"\n>\n\t<span class=\"badge rounded-pill text-bg-dark\">" + j + "</span>\n\t<div class=\"box title\">" + issue.get_title() + "</div>\n\t<div class=\"box kl-box \">" + issue.get_title() + "</div>\n</div>";
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
		this.onUpdate();
	}
	,onUpdate: function() {
		this.onEndHandler(null);
		this.updateM();
	}
	,onEndHandler: function(evt) {
		var projectStartDate = this.data.startDate;
		var currentDate = projectStartDate;
		var mileStoneCounter = 0;
		var issueCounter = 0;
		var offsetinDaysCounter = 0;
		var _mermaid = "";
		var _csv = new export_Csv().init();
		var _projectVO = new model_vo_ProjectVO(this.data.get_title(),this.data.startDate,this.data.endDate);
		_projectVO.set__id(this.data.get__id());
		var container = window.document.getElementById(this.KLUEZ_WRAPPER_ID);
		var _g = 0;
		var _g1 = container.children.length;
		while(_g < _g1) {
			var i = _g++;
			var mileStoneWrapper = container.children[i];
			var _mileStoneVO = new model_vo_MilestoneVO("x");
			_projectVO.milestones.push(_mileStoneVO);
			_mermaid += "\n\n";
			var _g2 = 0;
			var _g3 = mileStoneWrapper.children.length;
			while(_g2 < _g3) {
				var j = _g2++;
				var child = mileStoneWrapper.children[j];
				if(child.localName == "input") {
					var t = (js_Boot.__cast(child , HTMLInputElement)).value;
					_mileStoneVO.set_title(t);
					_mileStoneVO.set__id((js_Boot.__cast(child , HTMLInputElement)).dataset.klId);
					_mermaid += "section " + (mileStoneCounter + 1) + "-" + utils_StringUtil.cap(t) + "\n";
					++mileStoneCounter;
				} else {
					var _g4 = 0;
					var _g5 = child.children.length;
					while(_g4 < _g5) {
						var k = _g4++;
						var c = child.children[k];
						var _title = c.dataset.klTitle;
						var _duration = c.dataset.klDuration;
						var _durationTimestampDays = utils_DateUtil.convert(_duration);
						var _durationDayInt = utils_DateUtil.convert2DayInt(_duration);
						c.dataset.klStartDate = DateTools.format(currentDate,"%F");
						c.title = "" + _title + ", " + DateTools.format(currentDate,"%F") + ", " + _duration;
						var _issueVO = new model_vo_IssueVO(_title,_duration);
						_issueVO.set__id(c.dataset.klId);
						_issueVO.set_startDate(currentDate);
						_mileStoneVO.issues.push(_issueVO);
						_mermaid += "\t" + utils_StringUtil.cap(_issueVO.get_title()) + " : a" + issueCounter + ", " + DateTools.format(_issueVO.get_startDate(),"%F") + ", " + _issueVO.get_duration() + "  \n";
						var badge = c.querySelector(".badge");
						badge.innerHTML = "" + (issueCounter + 1);
						var klBox = c.querySelector(".kl-box");
						var offset = 50;
						klBox.setAttribute("style","left:" + offsetinDaysCounter * offset + "px;width:" + _durationDayInt * offset + "px;");
						++issueCounter;
						offsetinDaysCounter += _durationDayInt;
						currentDate = new Date(currentDate.getTime() + _durationTimestampDays);
					}
				}
			}
			this.kluezDataJson = JSON.stringify(_projectVO,null,"  ");
			this.kluezDataCsv = _csv;
			this.kluezDataMermaid = new export_Mermaid().init(_mermaid);
			var div = window.document.getElementById("js-json");
			div.innerText = this.kluezDataJson;
			var div2 = window.document.getElementById("js-csv");
			div2.innerText = this.kluezDataCsv;
			var div3 = window.document.getElementById("js-mermaid");
			div3.innerText = this.kluezDataMermaid;
		}
	}
	,updateM: function() {
		console.log("src/Main.hx:345:","updateM");
		mermaid.mermaidAPI.initialize({ startOnLoad : false});
		var element = window.document.querySelector("#js-mermaid-test");
		console.log("src/Main.hx:385:",element);
		var insertSvg = function(svgCode,bindFunctions) {
			element.innerHTML = svgCode;
		};
		var graphDefinition = "graph TB\na-->b";
		console.log("src/Main.hx:393:",graphDefinition);
		mermaid.mermaidAPI.render("js-mermaid-test",graphDefinition,insertSvg,element);
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
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
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
};
export_Mermaid.__name__ = true;
export_Mermaid.prototype = {
	init: function(content) {
		var markdown = "\n```mermaid\ngantt\n\ttitle A Gantt Diagram\n\tdateFormat  YYYY-MM-DD\n\texcludes    weekends\n\n\t%% section Section\n\t%% A task           :a1, 2014-01-01, 30d\n\t%% Another task     :after a1  , 20d\n\t%% section Another\n\t%% Task in sec      :2014-01-12  , 12d\n\t%% another task      : 24d\n\n" + content + "\n\n```\n";
		return markdown;
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
utils_DateUtil.convert = function(val) {
	var tmp = val.indexOf("v") != -1;
	if(val.indexOf("d") != -1) {
		var days = parseFloat(StringTools.replace(val,"d",""));
		return days * 24.0 * 60.0 * 60.0 * 1000.0;
	}
	var tmp = val.indexOf("w") != -1;
	return -1;
};
utils_DateUtil.convert2DayInt = function(val) {
	if(val.indexOf("d") != -1) {
		var days = Std.parseInt(StringTools.replace(val,"d",""));
		return days;
	}
	return -1;
};
var utils_StringUtil = function() { };
utils_StringUtil.__name__ = true;
utils_StringUtil.cap = function(string) {
	return string.charAt(0).toUpperCase() + string.substring(1,string.length);
};
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
utils_DateUtil.october = 9;
utils_DateUtil.december = 11;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-sortable.js.map