package storage;

import js.html.Window;

class LocalStorage {
	var localStorage:js.html.Storage = js.Browser.getLocalStorage();
	var localName:String = 'kluez-sorting-file';

	public function new() {
		trace('LocalStorage');
	}

	public function setItem(key:String, value:Dynamic) {
		localStorage.setItem(key, haxe.Json.stringify(value));
	}

	function getItem(key:String) {
		return haxe.Json.parse(localStorage.getItem(key));
	}
}
