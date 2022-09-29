package export;

import haxe.Log;

using DateTools;

class Csv {
	var monthArr = [
		'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'
	];
	var dayArr = [
		'zondag',
		'maandag',
		'dinsdag',
		'woensdag',
		'donderdag',
		'vrijdag',
		'zaterdag',
		'zondag'
	];

	public function new() {
		// trace('Csv');

		// exportPlanningDay('export_masterfiles/planning_2021_day.csv', new Date(2021, 0, 4, 0, 0, 0));
		// exportPlanningDay('export_masterfiles/planning_2022_day.csv', new Date(2022, 0, 3, 0, 0, 0));
	}

	// public function exportPlanningDay(startDate:Date) {
	// 	trace('-- exportPlanningDay -- ${startDate}');
	public function init(?startDate:Date) {
		if (startDate == null)
			startDate = new Date(2022, 0, 3, 0, 0, 0);

		var content = '';

		// var jan1 = new Date(2022, 0, 1, 0, 0, 0);
		// trace(jan1.getDay());
		// trace(dayArr[jan1.getDay()]);
		// var jan3 = new Date(2022, 0, 3, 0, 0, 0);
		// trace(jan3.getDay());
		// trace(dayArr[jan3.getDay()]);

		// trace(jan3.delta(7.days()));

		var string1 = '';
		var string2 = '';
		var string3 = '';
		var string4 = '';
		var string5 = '';
		var string6 = '';

		var weekCounter = 1;

		// var startDate = new Date(2022, 0, 3, 0, 0, 0);
		var nextDate = startDate;

		for (i in 0...53) {
			var fiveDays = nextDate.delta(5.days());
			string1 += '"${monthArr[nextDate.getMonth()]} ${nextDate.getFullYear()}",,,,,';
			// string2 += '"${monthArr[nextDate.getMonth()]}",,,,,';
			string3 += '"Week ${weekCounter}",,,,,';
			// string1 += '"Week ${weekCounter}\n${nextDate.getDate()}-${(nextDate.getMonth() + 1)} / ${fiveDays.getDate()}-${(fiveDays.getMonth() + 1)}",';
			// string2 += '"${nextDate.getDate()} ${monthArr[nextDate.getMonth()]}",';
			string4 += '${nextDate.getDate()},${nextDate.delta(1.days()).getDate()},${nextDate.delta(2.days()).getDate()},${nextDate.delta(3.days()).getDate()},${nextDate.delta(4.days()).getDate()},';
			string5 += ',,,,,';

			// var random = Math.floor(Math.random() * 100);
			// if (random >= 90) {
			// 	string3 += 'x';
			// }

			weekCounter++;
			nextDate = nextDate.delta(7.days());
		}

		content += '"Phase","Title",' + string1 + '\n';
		// content += ',,' + string2 + '\n';
		content += ',,' + string3 + '\n';
		content += ',,' + string4 + '\n';
		content += ',,' + string5 + '\n';
		// for (i in 0...10) {
		// 	var strLength = string3.length;
		// 	var random = Math.floor(Math.random() * strLength);
		// 	var arr = string5.split(',');
		// 	arr[random] = 'x';
		// 	var _string5 = arr.join(',');

		// 	content += '"${sectionArr[i]}","${titleArr[i]}",' + _string5 + '\n';
		// }

		// sys.io.File.saveContent(source, content);

		return content;
	}

	public function weekNumber(today:Date):Int {
		var firstDayOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0); // set hours, min, sec to zero
		today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // set hours, min, sec to zero
		// trace('today: ' + today + ' - formated(${DateTools.format(today, "%F")})');

		// var dayNr = Math.floor((today.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
		// trace('dayNr : ${dayNr} ');

		// 4janarie is week 1, count vandaar
		var jan4 = new Date(today.getFullYear(), 0, 4, 0, 0, 0);
		// trace('4 jan: ' + jan4.getDay(), dayArr[jan4.getDay()]); // 0  sundayu, 1 monday

		var firstMondayOfYear = new Date(today.getFullYear(), 0, (4 - (jan4.getDay() - 1)), 0, 0, 0);
		// trace('first monday of year: ' + firstMondayOfYear.getDay(), dayArr[firstMondayOfYear.getDay()]);

		// var dayNr2 = Math.floor((today.getTime() - firstMondayOfYear.getTime()) / (24 * 60 * 60 * 1000));
		var dayNr2 = ((today.getTime() - firstMondayOfYear.getTime()) / (24 * 60 * 60 * 1000));
		trace('dayNr2 : ${dayNr2} ');

		// var weekNr = Math.ceil(dayNr2 / 7);
		var weekNr = (dayNr2 / 7);
		trace('weekNr: ${weekNr}');

		if (dayNr2 < 0) {
			weekNr = 52;
		} else {
			weekNr = Math.floor(weekNr) + 1;
		}
		trace('after weekNr: ${weekNr}');
		trace('---------------');
		return Math.floor(weekNr);
	}
}
