package;

import export.Csv;
import utils.DateUtil;
import model.vo.ProjectVO;
import model.vo.IssueVO;
import model.vo.MilestoneVO;
import haxe.Json;
import sortablejs.SortableEvent;
import js.Browser.*;
import js.html.*;
import model.constants.App;
import Sortablejs;

using StringTools;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 */
class Main {
	var container:js.html.DivElement;
	var fileName:String;
	var data:ProjectVO;

	var kluezDataJson = '';
	var kluezDataCsv = '';
	var kluezDataMermaid = '';

	var KLUEZ_WRAPPER_ID:String = 'kluez-sortable-generate';

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			createObje();
			initMenu();

			generateList();
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

		btnJson.onclick = () -> download(kluezDataJson, 'kluez_data.json', "text/plain");
		btnCsv.onclick = () -> download(kluezDataCsv, 'kluez_data.csv', "text/plain");
		btnMermaid.onclick = () -> download(kluezDataMermaid, 'kluez_data_mermaid.md', "text/plain");

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

	var header1:InputElement;

	function generateList() {
		var container:DivElement = cast document.getElementById('wrapper');

		// make sure h1 isn't dragable
		var input:InputElement = cast document.createInputElement();
		input.value = data.title;
		input.dataset.klId = '${data._id}';
		input.dataset.klTitle = '${data.title}';
		input.className = '_form-control h1 form-controle-focus';
		input.onblur = (e) -> {
			trace('focusout' + e.target.value);
			data.title = e.target.value;
		}
		container.appendChild(input);
		header1 = input;

		var div:DivElement = document.createDivElement();
		div.id = KLUEZ_WRAPPER_ID;
		div.className = 'kluez-board kl-sortable';
		container.appendChild(div);

		// generate the list/milestonesn/issues
		for (i in 0...data.milestones.length) {
			var milestone:MilestoneVO = data.milestones[i];
			// trace(milestone);
			var group = document.createDivElement();
			group.dataset.klId = '${milestone._id}';
			group.dataset.klTitle = '${milestone.title}';
			group.className = 'group';
			div.appendChild(group);

			// var heading = document.createElement('h2');
			// heading.innerHTML = '${milestone.title}';
			// group.appendChild(heading);

			var input:InputElement = cast document.createInputElement();
			input.value = milestone.title;
			input.dataset.klId = milestone._id;
			input.dataset.klTitle = milestone.title;
			input.className = '_form-control h2 form-controle-focus';
			group.appendChild(input);

			var groupGoals = document.createDivElement();
			// groupGoals.dataset.klMilestoneName = '${milestone.title}';
			groupGoals.className = 'group__goals kl-sortable';
			group.appendChild(groupGoals);
			for (j in 0...milestone.issues.length) {
				var issue = milestone.issues[j];
				var goalTemplate = '
<div
data-kl-type="${issue._type}"
data-kl-id="${issue._id}"
data-kl-title="${issue.title}"
data-kl-duration="${issue.duration}"
data-kl-start-date="${issue.startDate}"
class="goal kl-goal"
>
	<span class="badge rounded-pill text-bg-dark">${j}</span>
	<div class="box title">${issue.title}</div>
	<div class="box kl-box ">${issue.title}</div>
</div>'; // <div class="goal" data-kl-type="issue">issue 1</div>
				var frag = document.createRange().createContextualFragment(goalTemplate);
				groupGoals.appendChild(frag);
			}
		}

		// setup sortable
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
		console.warn('---------------------------------');
		trace("onEndHandler " + evt);
		trace(evt);

		var mileStoneCounter = 0;
		var issueCounter = 0;

		var _mermaid = new export.Mermaid().init();

		var _csv = new export.Csv().init();

		var _projectVO:ProjectVO = new ProjectVO(data.title, data.startDate, data.endDate);
		_projectVO._id = data._id;

		var container = document.getElementById(KLUEZ_WRAPPER_ID);
		for (i in 0...container.children.length) {
			var mileStoneWrapper = container.children[i];
			trace('---> mileStoneWrapper');
			trace(mileStoneWrapper);
			// trace(Type.typeof(mileStoneWrapper));

			var _mileStoneVO:MilestoneVO = new MilestoneVO('x');
			_projectVO.milestones.push(_mileStoneVO);

			for (j in 0...mileStoneWrapper.children.length) {
				var child = mileStoneWrapper.children[j];
				trace('child');
				trace(child);
				// trace(Type.typeof(child));
				// trace(child.localName);
				// var __issue:IssueVO = new IssueVO(child.dataset.klTitle, child.dataset.klDuration, Date.fromString(child.dataset.klStartDate));
				// is an input
				// or
				// is a group div
				if (child.localName == 'input') {
					// title milestone
					var t = cast(child, InputElement).value;
					trace("child: " + cast(child, InputElement).value);
					_mileStoneVO.title = t;
					_mileStoneVO._id = cast(child, InputElement).dataset.klId; // TODO
				} else {
					trace(child);
					// issues
					for (k in 0...child.children.length) {
						var c = child.children[k];
						trace(c.innerText);
						trace(c.dataset.klId);
						trace(c.dataset.klType);
						trace(c.dataset.klDuration);
						trace(c.dataset.klTitle);
						var _issueVO:IssueVO = new IssueVO(c.dataset.klTitle, c.dataset.klDuration);
						_issueVO._id = c.dataset.klId;
						_mileStoneVO.issues.push(_issueVO);

						// change order id
						var badge = c.querySelector('.badge');
						badge.innerHTML = '${issueCounter + 1}';
						var klBox = c.querySelector('.kl-box');
						klBox.setAttribute('style', 'left:${issueCounter * 100}px;width:100px;');
						issueCounter++;
					}
				};
			}

			console.info(_projectVO);
			console.info(Json.stringify(_projectVO));

			kluezDataJson = Json.stringify(_projectVO, null, '  ');
			kluezDataCsv = _csv;
			kluezDataMermaid = _mermaid;

			var div = document.getElementById('js-json');
			div.innerText = (Json.stringify(_projectVO, null, '  '));
			var div2 = document.getElementById('js-csv');
			div2.innerText = _csv;
			var div3 = document.getElementById('js-mermaid');
			div3.innerText = _mermaid;
		}
	}

	function filenameUpdate() {
		fileName = 'downloadfile-' + Date.now();
	}

	function download(content:String, fileName:String, contentType:String) {
		var t = DateTools.format(Date.now(), "%Y%m%d_%H%M%S");
		// 20160708_144405

		fileName = fileName.replace('.', '_${t}.');

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

	static public function main() {
		var app = new Main();
	}
}
