package;

import utils.DateUtil;
import model.vo.ProjectVO;
import model.vo.IssueVO;
import model.vo.MilestoneVO;
import haxe.Json;
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
	var fileName:String;
	var data:ProjectVO;

	var KLUEZ_WRAPPER_ID = 'kluez-sortable-generate';

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			createObje();
			initMenu();

			generateList();

			initTest();
		});
	};

	function createObje() {
		var project1 = new ProjectVO('ProjectName Foobar', new Date(2022, DateUtil.november, 20, 0, 0, 0), new Date(2022, DateUtil.december, 20, 0, 0, 0));
		var milestone1 = new MilestoneVO('first milestone');
		var milestone2 = new MilestoneVO('second milestone');
		var milestone3 = new MilestoneVO('third milestone');
		project1.milestones.push(milestone1);
		project1.milestones.push(milestone2);
		project1.milestones.push(milestone3);

		var issue1 = new IssueVO('a issue', '2d');
		var issue2 = new IssueVO('b issue', '3d');
		var issue3 = new IssueVO('c issue', '10d');
		milestone1.issues = [issue1, issue2, issue3];
		var issue4 = new IssueVO('d issue', '4d');
		var issue5 = new IssueVO('e issue', '2d');
		milestone2.issues = [issue4, issue5];
		var issue6 = new IssueVO('f issue', '1d');
		var issue7 = new IssueVO('g issue', '2d');
		var issue8 = new IssueVO('e issue', '4d');
		milestone3.issues = [issue6, issue7, issue8];

		trace(project1);
		trace(Json.stringify(project1));

		data = project1;
	}

	function initMenu() {
		var btnJson = document.getElementById('btn-download-json');
		var btnCsv = document.getElementById('btn-download-csv');
		var btnMermaid = document.getElementById('btn-download-mermaid');

		btnJson.onclick = () -> download('{}', 'test.json', "text/plain");
		btnCsv.onclick = () -> download('csv', 'test.csv', "text/plain");
		btnMermaid.onclick = () -> download('mermaid', 'mermaid.md', "text/plain");

		var checkMilestone:InputElement = cast document.getElementById('checkDragMilestones');
		var checkIssue:InputElement = cast document.getElementById('checkDragIssues');

		checkMilestone.onchange = (e:MouseEvent) -> {
			trace('toggle milestons' + e);
			trace(cast(e.target, InputElement).id);
		}
		checkIssue.onchange = (e:MouseEvent) -> {
			trace('toggle issue ' + e);
			trace(e);
		}
	}

	function generateList() {
		var container:DivElement = cast document.getElementById('wrapper');

		var div:DivElement = document.createDivElement();
		div.id = KLUEZ_WRAPPER_ID;
		div.className = 'kluez-board kl-sortable';
		container.appendChild(div);
		var heading = document.createElement('h1');
		heading.innerHTML = data.title;
		div.appendChild(heading);

		for (i in 0...data.milestones.length) {
			var milestone:MilestoneVO = data.milestones[i];
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
				var goalTemplate = '<div class="goal kl-goal" data-kl-type="${issue._type}"><span class="badge rounded-pill text-bg-dark">${j}</span><div class="box title">${issue.title}</div><div class="box kl-box ">${issue.title}</div></div>'; // 				// <div class="goal" data-kl-type="issue">issue 1</div>
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

		var mileStoneCounter = 0;
		var issueCounter = 0;

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
						badge.innerHTML = '${issueCounter + 1}';
						var klBox = c.querySelector('.kl-box');
						klBox.setAttribute('style', 'left:${issueCounter * 100}px;width:100px;');
						issueCounter++;
					}
				};
			}
		}
	}

	function filenameUpdate() {
		fileName = 'downloadfile-' + Date.now();
	}

	function download(content:String, fileName:String, contentType:String) {
		var a = document.createAnchorElement();
		var file = new Blob([content], {type: contentType});
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}

	function copy(data:String) {
		console.log('onCopyHandler');
		navigator.clipboard.writeText(data).then(function(f) {
			console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
			console.error('Async: Could not copy text: ', err);
		});
	}

	function onDownloadHandler() {
		this.filenameUpdate();
		this.download(Json.stringify(data), '${this.fileName}.json', "text/plain");
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
