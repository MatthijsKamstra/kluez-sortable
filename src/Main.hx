package;

import Data.KluezSortableObj;
import haxe.Log;
import sortablejs.SortableEvent;
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

	var KLUEZ_WRAPPER_ID = 'kluez-sortable-generate';

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			initTest();
			generateList();
		});
	};

	function generateList() {
		var container:DivElement = cast document.getElementById('wrapper');
		var checkMilestone:InputElement = cast document.getElementById('checkDragMilestones');
		var checkIssue:InputElement = cast document.getElementById('checkDragIssues');

		var dataArr:Array<KluezSortableObj> = cast Data.getData();
		console.log(dataArr);

		var div:DivElement = document.createDivElement();
		div.id = KLUEZ_WRAPPER_ID;
		div.className = 'kluez-board kl-sortable';
		container.appendChild(div);

		for (i in 0...dataArr.length) {
			var milestone:KluezSortableObj = dataArr[i];
			// trace(milestone);
			var group = document.createDivElement();
			group.className = 'group';
			group.dataset.klMilestoneName = '${milestone.title}';
			div.appendChild(group);
			var heading = document.createElement('h2');
			heading.innerHTML = '${milestone.title}';
			group.appendChild(heading);
			var groupGoals = document.createDivElement();
			// groupGoals.dataset.klMilestoneName = '${milestone.title}';
			groupGoals.className = 'group__goals kl-sortable';
			group.appendChild(groupGoals);
			for (j in 0...milestone.issues.length) {
				var issue = milestone.issues[j];
				// var goal = document.createDivElement();
				// goal.className = 'goal';
				// goal.innerHTML = issue.title;
				// goal.dataset.klType = '${issue.type}';
				// groupGoals.appendChild(goal);
				var goalTemplate = '<div class="goal kl-goal" data-kl-type="${issue.type}"><span class="badge rounded-pill text-bg-dark">${j}</span><div class="box title">${issue.title}</div><div class="box kl-box ">${issue.title}</div></div>'; // 				// <div class="goal" data-kl-type="issue">issue 1</div>
				var frag = document.createRange().createContextualFragment(goalTemplate);
				groupGoals.appendChild(frag);
			}
		}

		var list = document.querySelectorAll(".kl-sortable");
		for (i in 0...list.length) {
			var node:Element = cast(list[i], Element);
			new Sortablejs(node, {
				group: 'scoreboard',
				direction: 'vertical',
				animation: 250,
				scroll: true,
				bubbleScroll: true,
				onMove: function(evt, originalEvent) {
					if (evt.dragged.classList.contains("group") && evt.to.classList.contains("group__goals")) {
						return false;
					} else {
						return true;
					}
				},
				onEnd: function(evt:SortableEvent) {
					// console.log(evt);
					// console.log(evt.to);
					onEndHandler(evt);
				}
			});
		};

		onEndHandler(null);
	}

	function onEndHandler(?evt:SortableEvent) {
		trace("onEndHandler " + evt);
		trace(evt);
		// // var list = document.querySelectorAll(".kl-sortable");
		// // for (i in 0...list.length) {
		// // 	var node:Element = cast(list[i], Element);
		// // 	console.info(node.innerText);
		// // }
		// var list = document.querySelectorAll(".kl-sortable");
		// console.log(list.length);
		// for (i in 0...list.length) {
		// 	var node:Element = cast(list[i], Element);
		// 	console.info(node.children.length);
		// }

		var mileStoneCounter = 1;
		var issueCounter = 1;

		var wrapper = document.getElementById(KLUEZ_WRAPPER_ID);
		for (i in 0...wrapper.children.length) {
			var childGrup = wrapper.children[i];
			trace(childGrup);
			for (j in 0...childGrup.children.length) {
				var child = childGrup.children[j];
				// trace(Type.typeof(child));
				if (child.localName == 'h2') {
					trace("child: " + child.innerText);
				} else {
					trace(child);
					for (k in 0...child.children.length) {
						var c = child.children[k];
						trace(c.innerText);
						var badge = c.querySelector('.badge');
						badge.innerHTML = '${issueCounter}';
						var klBox = c.querySelector('.kl-box');
						klBox.setAttribute('style', 'left:${issueCounter * 100}px;width:100px;');
						issueCounter++;
					}
				};
			}
		}
	}

	function initTest() {
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
				onMove: function(evt, originalEvent) {
					if (evt.dragged.classList.contains("group") && evt.to.classList.contains("group__goals")) {
						return false;
					} else {
						return true;
					}
				},
				onEnd: function(evt:SortableEvent) {
					onEndHandler(evt);
				}
			});
		};
	};

	static public function main() {
		var app = new Main();
	}
}
