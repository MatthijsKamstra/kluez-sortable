package model.vo;

import utils.UUID;

class IssueVO {
	@:isVar public var _id(get, set):String;
	@:isVar public var _type(get, null):String = 'issue';
	@:isVar public var title(get, set):String;
	@:isVar public var duration(get, set):String;
	@:isVar public var startDate(get, set):Date;

	public function new(title, duration, ?startDate) {
		this._id = UUID.uuid();
		this.title = title;
		this.duration = duration; // 2d
		if (startDate != null)
			this.startDate = startDate;
	}

	public static function parse(arr:Array<IssueVOType>):Array<IssueVO> {
		var array = [];

		for (i in 0...arr.length) {
			var _issueObj = arr[i];
			var issue = new IssueVO(_issueObj.title, _issueObj.duration, _issueObj.startDate);
			issue._id = _issueObj._id;
			array.push(issue);
		}

		return array;
	}

	// ____________________________________ getter/setter ____________________________________

	function get_title():String {
		return title;
	}

	function set_title(value:String):String {
		return title = value;
	}

	function get__id():String {
		return _id;
	}

	function set__id(value:String):String {
		return _id = value;
	}

	function get__type():String {
		return _type;
	}

	// function set__type(value:String):String {
	// 	return _type = value;
	// }

	function get_duration():String {
		return duration;
	}

	function set_duration(value:String):String {
		return duration = value;
	}

	function get_startDate():Date {
		return startDate;
	}

	function set_startDate(value:Date):Date {
		return startDate = value;
	}
}

typedef IssueVOType = {
	@:optional var _id:String;
	var title:String;
	var duration:String;
	var startDate:Date;
}
