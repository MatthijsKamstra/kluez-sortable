package storage;

import js.html.Window;

class LocalStorage {
	var localStorage:js.html.Storage = js.Browser.getLocalStorage();
	var localName:String = 'kluez-sorting-file';

	public function new() {
		trace('LocalStorage');
	}

	/**
	 * get the data from local storage, and return a json
	 *
	 * @example
	 * 		var json = localStorage.setItem('foo'. {hi:'ho'});
	 *
	 * @param 	key 	name of the localstorage
	 * @param 	value 	data structure to store
	 */
	public function setItem(key:String, value:String):Void {
		// localStorage.setItem(key, haxe.Json.stringify(value));
		localStorage.setItem(key, value);
	}

	/**
	 * get the data from local storage, and return a json
	 *
	 * @example
	 * 		var json = localStorage.getItem('foo');
	 *
	 * @param 	key 	name of the localstorage
	 * @return 	json structure or null
	 */
	public function getItem(key:String):Dynamic {
		var str = localStorage.getItem(key);
		if (str == null) {
			return null;
		} else {
			return haxe.Json.parse(str);
		}
	}
}
