package utils;

using StringTools;
using DateTools;

class DateUtil {
	public function new() {
		trace('DateUtil');
	}

	static public var october = 9;
	static public var november = 10;
	static public var december = 11;

	/**
	 * 		Converts a number of days to a timestamp.
	 * @param val
	 * @return Float
	 */
	public static function convert(val:String):Float {
		if (val.indexOf('v') != -1) {
			// hours
		}
		if (val.indexOf('d') != -1) {
			// days
			var days = Std.parseFloat(val.replace('d', ''));
			return DateTools.days(days);
		}
		if (val.indexOf('w') != -1) {
			// days
		}

		return -1;
	}

	public static function convert2DayInt(val:String):Int {
		if (val.indexOf('d') != -1) {
			// days
			var days = Std.parseInt(val.replace('d', ''));
			return days;
		}
		return -1;
	}
}
