package;

import storage.LocalStorage;
import js.lib.intl.RelativeTimeFormat.RelativeTimeFormatSupportedLocalesOfOptions;
import haxe.Log;
import utils.StringUtil;
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

	var header1:InputElement;
	var inputStartDate:InputElement;
	var inputEndDate:InputElement;

	var KLUEZ_WRAPPER_ID:String = 'kluez-sortable-generate';
	var localStorage = new LocalStorage();
	var KLUEZ_LOCAL_STOEAGE_ID = 'kluez-local-storage';

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			setupDataObject();
			setupUX();

			generate();

			// hmmmm, doesn't work yet.
			var csv = new Csv();
			// trace(csv.weekNumber(Date.now()));
			// trace(csv.weekNumber(new Date(2022, 0, 1, 0, 0, 0)));
			// trace(csv.weekNumber(new Date(2022, 8, 1, 0, 0, 0)));
			// trace(csv.weekNumber(new Date(2023, 12, 28, 0, 0, 0))); // ma 28 december week 48
		});
	};

	function setupDataObject() {
		var project1 = new ProjectVO('ProjectName Foobar', new Date(2022, DateUtil.october, 5, 0, 0, 0), new Date(2023, DateUtil.december, 5, 0, 0, 0));

		var milestone1 = new MilestoneVO('first milestone');
		var milestone2 = new MilestoneVO('second milestone');
		var milestone3 = new MilestoneVO('third milestone');
		project1.milestones.push(milestone1);
		project1.milestones.push(milestone2);
		project1.milestones.push(milestone3);

		var issue1 = new IssueVO('a issue', '2d');
		var issue2 = new IssueVO('b issue', '3d');
		var issue3 = new IssueVO('c issue', '1d');
		milestone1.issues = [issue1, issue2, issue3];
		var issue4 = new IssueVO('d issue', '4d');
		var issue5 = new IssueVO('e issue', '2d');
		milestone2.issues = [issue4, issue5];
		var issue6 = new IssueVO('f issue', '1d');
		var issue7 = new IssueVO('g issue', '2d');
		var issue8 = new IssueVO('e issue', '10d');
		milestone3.issues = [issue6, issue7, issue8];

		trace(project1);
		trace(Json.stringify(project1));

		data = project1;
	}

	function setupUX() {
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

		inputStartDate = cast document.getElementById('formControleInputStartDate');
		inputStartDate.value = DateTools.format(data.startDate, "%F");
		inputStartDate.onchange = (e) -> {
			trace('inputStartDate');
			trace(cast(e.target, InputElement).value);
			trace(e);
			data.startDate = Date.fromString(cast(e.target, InputElement).value);
			onUpdate();
		}
		// inputStartDate.min = '';

		inputEndDate = cast document.getElementById('formControleInputEndDate');
		inputEndDate.value = DateTools.format(data.endDate, "%F");
		inputEndDate.onchange = (e) -> {
			trace('inputEndDate');
			trace(cast(e.target, InputElement).value);
			trace(e);
			data.endDate = Date.fromString(cast(e.target, InputElement).value);
			onUpdate();
		}

		var fileSelector:InputElement = cast document.getElementById('formFile');
		fileSelector.addEventListener('change', (event) -> {
			trace(event);
			// If there's no file, do nothing
			if (event.target.files.length <= 0)
				return;

			var fileList:FileList = event.target.files;
			console.log(fileList);
			for (file in fileList) {
				console.log(file);
			}
			var file:File = fileList[0];

			// Create a new FileReader() object
			var reader = new FileReader();

			// Setup the callback event to run when the file is read
			// reader.onload = logFile;
			reader.onload = (e) -> {
				var target = e.target;
				var data = Json.parse(target.result);
				console.log(data);
				// store data
				localStorage.setItem(KLUEZ_LOCAL_STOEAGE_ID, data);
			};

			// Read the file
			reader.readAsText(file);
		});

		var dropArea = document.getElementById('drop-area');

		dropArea.addEventListener('dragover', (event) -> {
			event.stopPropagation();
			event.preventDefault();
			// Style the drag-and-drop as a "copy file" operation.
			event.dataTransfer.dropEffect = 'copy';
		});

		dropArea.addEventListener('drop', (event) -> {
			event.stopPropagation();
			event.preventDefault();
			var fileList = event.dataTransfer.files;
			console.log(fileList);
		});
	}

	// function getMetadataForFileList(fileList) {
	// 	for (var file
	// 	of
	// 	fileList
	// )
	// 	{
	// 		// Not supported in Safari for iOS.
	// 		var name = file.name ? file.name : 'NOT SUPPORTED';
	// 		// Not supported in Firefox for Android or Opera for Android.
	// 		var type = file.type ? file.type : 'NOT SUPPORTED';
	// 		// Unknown cross-browser support.
	// 		var size = file.size ? file.size : 'NOT SUPPORTED';
	// 		console.log({
	// 			file,
	// 			name,
	// 			type,
	// 			size
	// 		});
	// 	}
	// }
	// function readImage(file) {
	// 	// Check if the file is an image.
	// 	if (file.type && !file.type.startsWith('image/')) {
	// 		console.log('File is not an image.', file.type, file);
	// 		return;
	// 	}
	// 	var reader = new FileReader();
	// 	reader.addEventListener('load', (event) -> {
	// 		img.src = event.target.result;
	// 	});
	// 	reader.readAsDataURL(file);
	// }

	function generate() {
		var container:DivElement = cast document.getElementById('wrapper');

		// make sure h1 isn't dragable, set it outside sortable wrapper
		var input:InputElement = cast document.createInputElement();
		input.value = data.title;
		input.dataset.klId = '${data._id}';
		input.dataset.klTitle = '${data.title}';
		input.className = '_form-control h1 form-controle-focus';
		input.onblur = (e) -> {
			trace('focusout' + e.target.value);
			data.title = e.target.value;
			onUpdate();
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
			input.onblur = (e) -> {
				trace('focusout' + e.target.value);
				milestone.title = e.target.value;
				input.dataset.klTitle = e.target.value;
				onUpdate();
			}
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
data-kl-end-date=""
class="goal kl-goal"
title="${issue.title}, ${issue.startDate}, ${issue.duration}"
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

		onUpdate();
	}

	function onUpdate() {
		onEndHandler(null);
		updateM();
	}

	function onEndHandler(?evt:SortableEvent) {
		// console.warn('---------------------------------');
		// trace("onEndHandler " + evt);
		// trace(evt);

		var projectStartDate:Date = data.startDate;
		var currentDate:Date = projectStartDate;

		var mileStoneCounter = 0;
		var issueCounter = 0;
		var offsetinDaysCounter = 0;

		var _mermaid = '';

		var _csv = new export.Csv().init();

		var _projectVO:ProjectVO = new ProjectVO(data.title, data.startDate, data.endDate);
		_projectVO._id = data._id;

		var container = document.getElementById(KLUEZ_WRAPPER_ID);
		for (i in 0...container.children.length) {
			var mileStoneWrapper = container.children[i];
			// trace('---> mileStoneWrapper');
			// trace(mileStoneWrapper);
			// trace(Type.typeof(mileStoneWrapper));

			var _mileStoneVO:MilestoneVO = new MilestoneVO('x');
			_projectVO.milestones.push(_mileStoneVO);
			_mermaid += '\n\n';

			for (j in 0...mileStoneWrapper.children.length) {
				var child = mileStoneWrapper.children[j];
				// trace('child');
				// trace(child);
				// trace(Type.typeof(child));
				// trace(child.localName);
				// var __issue:IssueVO = new IssueVO(child.dataset.klTitle, child.dataset.klDuration, Date.fromString(child.dataset.klStartDate));
				// is an input
				// or
				// is a group div
				if (child.localName == 'input') {
					// title milestone
					var t = cast(child, InputElement).value;
					// trace("child: " + cast(child, InputElement).value);
					_mileStoneVO.title = t;
					_mileStoneVO._id = cast(child, InputElement).dataset.klId; // TODO

					_mermaid += 'section ${mileStoneCounter + 1}-${StringUtil.cap(t)}\n';

					mileStoneCounter++;
				} else {
					// trace(child);
					// issues
					for (k in 0...child.children.length) {
						var c = child.children[k];
						// trace(c.innerText);
						// trace(c.dataset.klId);
						// trace(c.dataset.klType);
						// trace(c.dataset.klDuration);
						// trace(c.dataset.klTitle);
						var _title = c.dataset.klTitle;
						var _duration = c.dataset.klDuration;
						var _durationTimestampDays = DateUtil.convert(_duration);
						var _durationDayInt:Int = DateUtil.convert2DayInt(_duration);

						c.dataset.klStartDate = DateTools.format(currentDate, "%F");
						c.title = '${_title}, ${DateTools.format(currentDate, "%F")}, ${_duration}';

						var _issueVO:IssueVO = new IssueVO(_title, _duration);
						_issueVO._id = c.dataset.klId;
						_issueVO.startDate = currentDate;
						_mileStoneVO.issues.push(_issueVO);

						// 	1.0-Setup-Backend-(Craft) : a0, 2022-02-17, 1d
						_mermaid += '\t${StringUtil.cap(_issueVO.title)} : a${issueCounter}, ${DateTools.format(_issueVO.startDate, "%F")}, ${_issueVO.duration}  \n';

						// change order id
						var badge = c.querySelector('.badge');
						badge.innerHTML = '${issueCounter + 1}';
						var klBox = c.querySelector('.kl-box');
						var offset = 50;
						klBox.setAttribute('style', 'left:${offsetinDaysCounter * offset}px;width:${_durationDayInt * offset}px;');

						// count
						issueCounter++;
						offsetinDaysCounter += _durationDayInt;
						// new starting date
						currentDate = Date.fromTime(currentDate.getTime() + _durationTimestampDays);
					}
				};
			}

			// console.info(_projectVO);
			// console.info(Json.stringify(_projectVO));

			kluezDataJson = Json.stringify(_projectVO, null, '  ');
			kluezDataCsv = _csv;
			kluezDataMermaid = new export.Mermaid().init(data.title, _mermaid);

			var div = document.getElementById('js-json');
			div.innerText = kluezDataJson;
			var div2 = document.getElementById('js-csv');
			div2.innerText = kluezDataCsv;
			var div3 = document.getElementById('js-mermaid');
			div3.innerText = kluezDataMermaid;
		}
	}

	function updateM() {
		trace('updateM');
		// var div4 = document.getElementById('js-inject-mermaid');
		// div4.innerHTML = ''; // reset

		// var clean = kluezDataMermaid.replace('```mermaid', '').replace('```', '').trim();

		// var d = document.createDivElement();
		// d.className = 'mermaid';
		// div4.appendChild(d);

		// // untyped mermaid.mermaidApi.render('js-inject-mermaid', kluezDataMermaid.replace('```mermaid', '').replace('```', ''));

		// // untyped mermaid.mermaidAPI.parse('graph TD
		// // 	A[Client] --> B[Load Balancer]');
		// // untyped mermaid.mermaidAPI.render('js-inject-mermaid', 'graph
		// // TD A[Client]-- > B[Load Balancer]');

		// var insert = function(clean) {
		// 	d.innerHTML = clean;
		// };
		// untyped mermaid.render("js-inject-mermaid", clean, insert);

		// div4.innerHTML = ' graph TD // A[Client] --> B[Load Balancer]

		// B --> C[Server01]
		// B --> D[Server02]';

		// untyped mermaid.initialize();

		// untyped mermaid.mermaidAPI.initialize({startOnLoad: false});
		// $(function() { // Example of using the API var
		// 	element = document.querySelector("#graphDiv");
		// 	var insertSvg = function(svgCode, bindFunctions) {
		// 		element.innerHTML = svgCode;
		// 	};
		// 	var graphDefinition = 'graph TB\na-->b';
		// 	var graph = mermaid.mermaidAPI.render('graphDiv', graphDefinition, insertSvg);
		// });
		// $(function() { // Example of using the API var
		// var element = document.querySelector("#js-mermaid-test");
		// trace(element);
		// var insertSvg = function(svgCode, bindFunctions) {
		// 	element.innerHTML = svgCode;
		// 	// callback(id);

		// 	// bindFunctions(element);
		// };
		// var graphDefinition = 'graph TB\na-->b';
		// trace(graphDefinition);

		// untyped mermaid.mermaidAPI.render('js-mermaid-test', graphDefinition, insertSvg, element);

		// });
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
