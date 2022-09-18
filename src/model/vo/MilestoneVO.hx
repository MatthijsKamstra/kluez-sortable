package model.vo;

import utils.UUID;

class MilestoneVO {
	@:isVar public var _id(get, set):String;
	@:isVar public var _type(get, set):String = 'milestone';
	@:isVar public var title(get, set):String;

	public var issues:Array<IssueVO>;

	public function new(title) {
		this._id = UUID.uuid();
		this.title = title;
		this.issues = [];
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
