package utils;

class KlTimeUtil {
	static public function convert(val:String):Float {
		if (val.indexOf('d') != -1)
			trace('days');
		if (val.indexOf('w') != -1)
			trace('weeks');
		if (val.indexOf('h') != -1)
			trace('hours');

		return -1;
	}
}
