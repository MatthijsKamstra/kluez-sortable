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
	this.KLUEZ_LOCAL_STORAGE_ID = "kluez-local-storage";
	this.localStorage = new storage_LocalStorage();
	this.KLUEZ_WRAPPER_ID = "kluez-sortable-generate";
	this.kluezDataMermaidHTML = "";
	this.kluezDataMermaid = "";
	this.kluezDataCsv = "";
	this.kluezDataJson = "";
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2022-10-02 16:58:10" + " ");
		var json = _gthis.localStorage.getItem(_gthis.KLUEZ_LOCAL_STORAGE_ID);
		if(json == null) {
			$global.console.info("Create dummy test data");
			_gthis.setupDataObject();
		} else {
			$global.console.info("Use local-storage data");
			_gthis.projectVO = model_vo_ProjectVO.parse(json);
		}
		_gthis.setupUX();
		_gthis.generate();
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
		haxe_Log.trace(project1,{ fileName : "src/Main.hx", lineNumber : 89, className : "Main", methodName : "setupDataObject"});
		haxe_Log.trace(JSON.stringify(project1),{ fileName : "src/Main.hx", lineNumber : 90, className : "Main", methodName : "setupDataObject"});
		this.projectVO = project1;
		this.localStorage.setItem(this.KLUEZ_LOCAL_STORAGE_ID,JSON.stringify(this.projectVO));
	}
	,setupUX: function() {
		var _gthis = this;
		var btnJson = window.document.getElementById("btn-download-json");
		var btnCsv = window.document.getElementById("btn-download-csv");
		var btnMermaid = window.document.getElementById("btn-download-mermaid");
		var btnMermaidWrapper = window.document.getElementById("btn-download-mermaid-wrapper");
		btnJson.onclick = function() {
			_gthis.download(_gthis.kluezDataJson,"kluez_data.json","text/plain");
		};
		btnCsv.onclick = function() {
			_gthis.download(_gthis.kluezDataCsv,"kluez_data.csv","text/plain");
		};
		btnMermaid.onclick = function() {
			_gthis.download(_gthis.kluezDataMermaid,"kluez_data_mermaid.md","text/plain");
		};
		btnMermaidWrapper.onclick = function() {
			_gthis.download(_gthis.kluezDataMermaidHTML,"kluez_data_mermaid.html","text/plain");
		};
		var checkMilestone = window.document.getElementById("checkDragMilestones");
		var checkIssue = window.document.getElementById("checkDragIssues");
		checkMilestone.onchange = function(e) {
			haxe_Log.trace("toggle milestons" + Std.string(e),{ fileName : "src/Main.hx", lineNumber : 112, className : "Main", methodName : "setupUX"});
			haxe_Log.trace((js_Boot.__cast(e.target , HTMLInputElement)).id,{ fileName : "src/Main.hx", lineNumber : 113, className : "Main", methodName : "setupUX"});
		};
		checkIssue.onchange = function(e) {
			haxe_Log.trace("toggle issue " + Std.string(e),{ fileName : "src/Main.hx", lineNumber : 116, className : "Main", methodName : "setupUX"});
			haxe_Log.trace(e,{ fileName : "src/Main.hx", lineNumber : 117, className : "Main", methodName : "setupUX"});
		};
		this.inputStartDate = window.document.getElementById("formControleInputStartDate");
		var tmp = HxOverrides.strDate(StringTools.replace(StringTools.replace("" + Std.string(this.projectVO.startDate),"T"," "),".000Z",""));
		this.projectVO.startDate = tmp;
		var tmp = HxOverrides.strDate(StringTools.replace(StringTools.replace("" + Std.string(this.projectVO.endDate),"T"," "),".000Z",""));
		this.projectVO.endDate = tmp;
		(js_Boot.__cast(window.document.getElementById("js-date-start") , HTMLSpanElement)).innerHTML = this.readableDate(this.projectVO.startDate);
		this.inputStartDate.value = DateTools.format(this.projectVO.startDate,"%F");
		this.inputStartDate.onchange = function(e) {
			haxe_Log.trace("inputStartDate",{ fileName : "src/Main.hx", lineNumber : 129, className : "Main", methodName : "setupUX"});
			haxe_Log.trace((js_Boot.__cast(e.target , HTMLInputElement)).value,{ fileName : "src/Main.hx", lineNumber : 130, className : "Main", methodName : "setupUX"});
			haxe_Log.trace(e,{ fileName : "src/Main.hx", lineNumber : 131, className : "Main", methodName : "setupUX"});
			var tmp = HxOverrides.strDate((js_Boot.__cast(e.target , HTMLInputElement)).value);
			_gthis.projectVO.startDate = tmp;
			_gthis.onUpdate();
		};
		(js_Boot.__cast(window.document.getElementById("js-date-end") , HTMLSpanElement)).innerHTML = this.readableDate(this.projectVO.endDate);
		this.inputEndDate = window.document.getElementById("formControleInputEndDate");
		this.inputEndDate.value = DateTools.format(this.projectVO.endDate,"%F");
		this.inputEndDate.onchange = function(e) {
			haxe_Log.trace("inputEndDate",{ fileName : "src/Main.hx", lineNumber : 141, className : "Main", methodName : "setupUX"});
			haxe_Log.trace((js_Boot.__cast(e.target , HTMLInputElement)).value,{ fileName : "src/Main.hx", lineNumber : 142, className : "Main", methodName : "setupUX"});
			haxe_Log.trace(e,{ fileName : "src/Main.hx", lineNumber : 143, className : "Main", methodName : "setupUX"});
			var tmp = HxOverrides.strDate((js_Boot.__cast(e.target , HTMLInputElement)).value);
			_gthis.projectVO.endDate = tmp;
			_gthis.onUpdate();
		};
		var fileSelector = window.document.getElementById("formFile");
		fileSelector.addEventListener("change",function(event) {
			haxe_Log.trace(event,{ fileName : "src/Main.hx", lineNumber : 150, className : "Main", methodName : "setupUX"});
			if(event.target.files.length <= 0) {
				return;
			}
			var fileList = event.target.files;
			$global.console.log(fileList);
			var _g = 0;
			while(_g < fileList.length) {
				var file = fileList[_g];
				++_g;
				$global.console.log(file);
			}
			var file = fileList[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var target = e.target;
				var data = JSON.parse(target.result);
				$global.console.log(data);
				_gthis.localStorage.setItem(_gthis.KLUEZ_LOCAL_STORAGE_ID,data);
			};
			reader.readAsText(file);
		});
		var dropArea = window.document.getElementById("drop-area");
		dropArea.addEventListener("dragover",function(event) {
			event.stopPropagation();
			event.preventDefault();
			return event.dataTransfer.dropEffect = "copy";
		});
		dropArea.addEventListener("drop",function(event) {
			event.stopPropagation();
			event.preventDefault();
			haxe_Log.trace(event,{ fileName : "src/Main.hx", lineNumber : 191, className : "Main", methodName : "setupUX"});
			var fileList = event.dataTransfer.files;
			$global.console.log(fileList);
			var _g = 0;
			while(_g < fileList.length) {
				var file = fileList[_g];
				++_g;
				$global.console.log(file);
			}
			var file = fileList[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var target = e.target;
				var data = JSON.parse(target.result);
				$global.console.log(data);
				_gthis.localStorage.setItem(_gthis.KLUEZ_LOCAL_STORAGE_ID,data);
			};
			reader.readAsText(file);
		});
	}
	,readableDate: function(current) {
		var str = "";
		str += "" + utils_DateUtil.dayNames[current.getDay()] + " " + current.getDate() + " " + utils_DateUtil.monthNames[current.getMonth()] + " " + current.getFullYear();
		return str;
	}
	,generate: function() {
		var _gthis = this;
		var container = window.document.getElementById("wrapper");
		var input = window.document.createElement("input");
		input.value = this.projectVO.get_title();
		var tmp = this.projectVO.get__id();
		input.dataset.klId = "" + tmp;
		var tmp = this.projectVO.get_title();
		input.dataset.klTitle = "" + tmp;
		input.className = "_form-control h1 form-controle-focus";
		input.onblur = function(e) {
			haxe_Log.trace("focusout" + e.target.value,{ fileName : "src/Main.hx", lineNumber : 269, className : "Main", methodName : "generate"});
			_gthis.projectVO.set_title(e.target.value);
			_gthis.onUpdate();
		};
		container.appendChild(input);
		this.header1 = input;
		var div = window.document.createElement("div");
		div.id = this.KLUEZ_WRAPPER_ID;
		div.className = "kluez-board kl-sortable";
		container.appendChild(div);
		var _g = 0;
		var _g1 = this.projectVO.milestones.length;
		while(_g < _g1) {
			var i = _g++;
			var milestone = [this.projectVO.milestones[i]];
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
					haxe_Log.trace("focusout" + e.target.value,{ fileName : "src/Main.hx", lineNumber : 301, className : "Main", methodName : "generate"});
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
				_gthis.generateOutput();
			}});
		}
		this.onUpdate();
	}
	,onUpdate: function() {
		$global.console.info("???? onUpdate");
		this.generateOutput();
		this.localStorage.setItem(this.KLUEZ_LOCAL_STORAGE_ID,JSON.stringify(this.projectVO));
	}
	,generateOutput: function() {
		var projectStartDate = this.projectVO.startDate;
		var currentDate = projectStartDate;
		var mileStoneCounter = 0;
		var issueCounter = 0;
		var offsetinDaysCounter = 0;
		var _mermaid = "";
		_mermaid += "section " + utils_StringUtil.cap("Start and Finish project") + "\n";
		_mermaid += "\t" + utils_StringUtil.cap("Start date (" + this.readableDate(this.projectVO.startDate) + ")") + " : " + DateTools.format(this.projectVO.startDate,"%F") + ", 1d\n";
		_mermaid += "\t" + utils_StringUtil.cap("End date (" + this.readableDate(this.projectVO.endDate) + ")") + " : " + DateTools.format(this.projectVO.endDate,"%F") + ", 1d\n";
		var c = new export_Csv();
		var _csv = c.init(this.projectVO.startDate,this.projectVO.endDate);
		_csv += c.add("","",0,0);
		_csv += c.add("phase","title",0,0);
		var _projectVO = new model_vo_ProjectVO(this.projectVO.get_title(),this.projectVO.startDate,this.projectVO.endDate);
		_projectVO.set__id(this.projectVO.get__id());
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
						var ch = child.children[k];
						var _title = ch.dataset.klTitle;
						var _duration = ch.dataset.klDuration;
						var _durationTimestampDays = utils_DateUtil.convert(_duration);
						var _durationDayInt = utils_DateUtil.convert2DayInt(_duration);
						ch.dataset.klStartDate = DateTools.format(currentDate,"%F");
						ch.title = "" + _title + ", " + DateTools.format(currentDate,"%F") + ", " + _duration;
						_csv += c.add(_mileStoneVO.get_title(),_title + (" (" + _duration + " - " + DateTools.format(currentDate,"%F") + ")"),offsetinDaysCounter,_durationDayInt);
						var _issueVO = new model_vo_IssueVO(_title,_duration);
						_issueVO.set__id(ch.dataset.klId);
						_issueVO.set_startDate(currentDate);
						_mileStoneVO.issues.push(_issueVO);
						if(issueCounter == 0) {
							_mermaid += "\t" + utils_StringUtil.cap(_issueVO.get_title()) + " : a" + issueCounter + ", " + DateTools.format(_issueVO.get_startDate(),"%F") + ", " + _issueVO.get_duration() + "  \n";
						} else {
							_mermaid += "\t" + utils_StringUtil.cap(_issueVO.get_title()) + " : a" + issueCounter + ", after a" + (issueCounter - 1) + ", " + _issueVO.get_duration() + "  \n";
						}
						var badge = ch.querySelector(".badge");
						badge.innerHTML = "" + (issueCounter + 1);
						var klBox = ch.querySelector(".kl-box");
						var offset = 50;
						klBox.setAttribute("style","left:" + offsetinDaysCounter * offset + "px;width:" + _durationDayInt * offset + "px;");
						++issueCounter;
						offsetinDaysCounter += _durationDayInt;
						currentDate = new Date(currentDate.getTime() + _durationTimestampDays);
					}
				}
			}
			this.projectVO = _projectVO;
			this.kluezDataJson = JSON.stringify(this.projectVO,null,"  ");
			this.kluezDataCsv = _csv;
			this.kluezDataMermaid = new export_Mermaid().init(this.projectVO.get_title(),_mermaid);
			this.kluezDataMermaidHTML = new export_Mermaid().html(this.projectVO.get_title(),_mermaid);
			var div = window.document.getElementById("js-json");
			div.innerText = this.kluezDataJson;
			var div2 = window.document.getElementById("js-csv");
			div2.innerText = this.kluezDataCsv;
			var div3 = window.document.getElementById("js-mermaid");
			div3.innerText = this.kluezDataMermaid;
			this.localStorage.setItem(this.KLUEZ_LOCAL_STORAGE_ID,JSON.stringify(this.projectVO));
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
	this.weeks = 53;
	this.days = -1;
};
export_Csv.__name__ = true;
export_Csv.prototype = {
	init: function(startDate,endDate) {
		if(startDate == null) {
			startDate = new Date(2022,0,3,0,0,0);
		}
		if(endDate == null) {
			endDate = new Date(startDate.getTime() + 31536000000.);
		}
		var ms = endDate.getTime() - startDate.getTime();
		var sec = ms / 1000;
		var min = sec / 60;
		var hour = min / 60;
		var day = hour / 24;
		var week = day / 7;
		this.days = Math.ceil(day);
		this.weeks = Math.ceil(week);
		var content = "";
		var string1 = "";
		var string2 = "";
		var string3 = "";
		var string4 = "";
		var string5 = "";
		var string6 = "";
		var weekCounter = 1;
		weekCounter = this.weekNumber(startDate);
		var nextDate = startDate;
		this.weeks = Math.ceil(week);
		var _g = 0;
		var _g1 = this.weeks;
		while(_g < _g1) {
			var i = _g++;
			var fiveDays = new Date(nextDate.getTime() + 432000000.);
			string1 += "\"" + utils_DateUtil.monthNames[nextDate.getMonth()] + " " + nextDate.getFullYear() + "\",,,,,";
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
	,add: function(phase,title,offsetDay,duration) {
		haxe_Log.trace("add",{ fileName : "src/export/Csv.hx", lineNumber : 121, className : "export.Csv", methodName : "add"});
		haxe_Log.trace(phase,{ fileName : "src/export/Csv.hx", lineNumber : 122, className : "export.Csv", methodName : "add", customParams : [title,offsetDay,duration]});
		var str = "";
		var _g = 0;
		var _g1 = offsetDay;
		while(_g < _g1) {
			var i = _g++;
			str += ",";
		}
		var _g = 0;
		var _g1 = duration;
		while(_g < _g1) {
			var i = _g++;
			str += "x,";
		}
		var _g = 0;
		var _g1 = this.days - offsetDay - duration;
		while(_g < _g1) {
			var i = _g++;
			str += ",";
		}
		var content = "";
		if(phase == "" && title == "") {
			content = "" + phase + "," + title + "," + str + "\n";
		} else {
			content = "\"" + phase + "\",\"" + title + "\"," + str + "\n";
		}
		return content;
	}
	,weekNumber: function(today) {
		var firstDayOfYear = new Date(today.getFullYear(),0,1,0,0,0);
		today = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);
		var jan4 = new Date(today.getFullYear(),0,4,0,0,0);
		var firstMondayOfYear = new Date(today.getFullYear(),0,4 - (jan4.getDay() - 1),0,0,0);
		var dayNr2 = (today.getTime() - firstMondayOfYear.getTime()) / 86400000;
		haxe_Log.trace("dayNr2 : " + dayNr2 + " ",{ fileName : "src/export/Csv.hx", lineNumber : 162, className : "export.Csv", methodName : "weekNumber"});
		var weekNr = dayNr2 / 7;
		haxe_Log.trace("weekNr: " + weekNr,{ fileName : "src/export/Csv.hx", lineNumber : 166, className : "export.Csv", methodName : "weekNumber"});
		if(dayNr2 < 0) {
			weekNr = 52;
		} else {
			weekNr = Math.floor(weekNr) + 1;
		}
		haxe_Log.trace("after weekNr: " + weekNr,{ fileName : "src/export/Csv.hx", lineNumber : 173, className : "export.Csv", methodName : "weekNumber"});
		haxe_Log.trace("---------------",{ fileName : "src/export/Csv.hx", lineNumber : 174, className : "export.Csv", methodName : "weekNumber"});
		return Math.floor(weekNr);
	}
	,__class__: export_Csv
};
var export_Mermaid = function() {
};
export_Mermaid.__name__ = true;
export_Mermaid.prototype = {
	init: function(title,content) {
		var markdown = "\n```mermaid\ngantt\n\ttitle " + title + "\n\tdateFormat  YYYY-MM-DD\n\texcludes    weekends\n\n\t%% section Section\n\t%% A task           : a1, 2014-01-01, 30d\n\t%% Another task     : after a1, 20d\n\t%% section Another\n\t%% Task in sec      : 2014-01-12, 12d\n\t%% another task\t\t: 24d\n\n" + content + "\n\n```\n";
		return markdown;
	}
	,html: function(title,content) {
		var md = new export_Mermaid().init(title,content);
		var c = StringTools.replace(StringTools.replace(md,"```mermaid",""),"```","");
		var template = "<html>\n    <body>\n        <script src=\"https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js\"></script>\n        <script>\n            mermaid.initialize({ startOnLoad: true });\n        </script>\n\t\t<!-- title: " + title + " -->\n\t\t<!--\n\t\t" + md + "\n\t\t-->\n\n\n\t\t<div class=\"mermaid\">\n           " + c + "\n        </div>\n\n    </body>\n</html>";
		return template;
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
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
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
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		return null;
	}
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
model_vo_IssueVO.parse = function(arr) {
	var array = [];
	var _g = 0;
	var _g1 = arr.length;
	while(_g < _g1) {
		var i = _g++;
		var _issueObj = arr[i];
		var issue = new model_vo_IssueVO(_issueObj.title,_issueObj.duration,_issueObj.startDate);
		issue.set__id(_issueObj._id);
		array.push(issue);
	}
	return array;
};
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
model_vo_MilestoneVO.parse = function(arr) {
	var array = [];
	var _g = 0;
	var _g1 = arr.length;
	while(_g < _g1) {
		var i = _g++;
		var _milestoneObj = arr[i];
		var milestone = new model_vo_MilestoneVO(_milestoneObj.title);
		milestone.set__id(_milestoneObj._id);
		milestone.issues = model_vo_IssueVO.parse(_milestoneObj.issues);
		array.push(milestone);
	}
	return array;
};
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
model_vo_ProjectVO.parse = function(json) {
	var p = new model_vo_ProjectVO(json.title,json.startDate,json.endDate);
	p.set__id(json._id);
	p.set_title(json.title);
	p.milestones = model_vo_MilestoneVO.parse(json.milestones);
	p.startDate = json.startDate;
	p.endDate = json.endDate;
	return p;
};
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
var storage_LocalStorage = function() {
	this.localStorage = js_Browser.getLocalStorage();
	haxe_Log.trace("LocalStorage",{ fileName : "src/storage/LocalStorage.hx", lineNumber : 10, className : "storage.LocalStorage", methodName : "new"});
};
storage_LocalStorage.__name__ = true;
storage_LocalStorage.prototype = {
	setItem: function(key,value) {
		this.localStorage.setItem(key,value);
	}
	,getItem: function(key) {
		var str = this.localStorage.getItem(key);
		if(str == null) {
			return null;
		} else {
			return JSON.parse(str);
		}
	}
	,__class__: storage_LocalStorage
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
utils_DateUtil.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
utils_DateUtil.dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
utils_DateUtil.october = 9;
utils_DateUtil.december = 11;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=kluez-sortable.js.map