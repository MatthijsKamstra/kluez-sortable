package model.vo;

import utils.UUID;

class ProjectVO {
	@:isVar public var _id(get, set):String;
	@:isVar public var _type(get, set):String = 'project';
	@:isVar public var title(get, set):String;

	public var dateFormat = 'YYYY-MM-DD';

	public var startDate:Date;
	public var endDate:Date;

	// var _startDate:Date;
	// var _endDate:Date;
	// var startDate:String;
	// var endDate:String;
	public var milestones:Array<MilestoneVO>;

	public function new(title, startDate, endDate) {
		this._id = UUID.uuid();
		this.title = title;
		this.milestones = [];
		this.startDate = startDate;
		this.endDate = endDate;
		// this._startDate = startDate;
		// this._endDate = endDate;
		// this.startDate = startDate.toString();
		// this.endDate = endDate.toString();
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

	function set__type(value:String):String {
		return _type = value;
	}
}
// typedef ProjectType = {
// 	@:optional var _id:String;
// 	var title:String;
// 	var milestones:Array<>;
// }
