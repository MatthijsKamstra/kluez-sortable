package;

import js.Browser.*;
import js.Browser;
import js.html.*;
import model.constants.App;
import Sortablejs;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 */
class Main {
	var container:js.html.DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			// var container = document.getElementById("prop");
			// container.innerHTML = 'html';

			var list = document.querySelectorAll(".sortable");

			for (i in 0...list.length) {
				var node:Element = cast(list[i], Element);
				trace(node);

				new Sortablejs(node, {
					group: 'scoreboard',
					direction: 'vertical',
					animation: 250,
					scroll: true,
					bubbleScroll: true,
					onMove: function(evt, originalEvent):Bool {
						if (evt.dragged.classList.contains("group") && evt.to.classList.contains("group__goals")) {
							return false;
						} else {
							return true;
						}
					}
				});
			};
		});
	}

	static public function main() {
		var app = new Main();
	}
}
