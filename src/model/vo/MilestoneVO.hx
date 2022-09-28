package model.vo;

import model.vo.IssueVO.IssueVOType;
import utils.UUID;

class MilestoneVO {
	@:isVar public var _id(get, set):String;
	@:isVar public var _type(get, null):String = 'milestone';
	@:isVar public var title(get, set):String;

	public var issues:Array<IssueVO>;

	public function new(title) {
		this._id = UUID.uuid();
		this.title = title;
		this.issues = [];
	}

	public static function parse(arr:Array<MilestoneVOType>):Array<MilestoneVO> {
		var array = [];

		for (i in 0...arr.length) {
			var _milestoneObj = arr[i];
			var milestone = new MilestoneVO(_milestoneObj.title);
			milestone._id = _milestoneObj._id;
			milestone.issues = IssueVO.parse(_milestoneObj.issues);
			array.push(milestone);
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
}

typedef MilestoneVOType = {
	@:optional var _id:String;
	var title:String;
	var issues:Array<IssueVOType>;
}
