package utils;

class StringUtil {
	public function new() {
		trace('StringUtil');
	}

	public static function cap(string:String):String {
		return string.charAt(0).toUpperCase() + string.substring(1, string.length);
	}
}
