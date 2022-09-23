package export;

class Mermaid {
	public function new() {
		trace('Mermaid');
	}

	public function init() {
		return '
```mermaid
gantt
	title A Gantt Diagram
	dateFormat YYYY-MM-DD
	excludes weekends

	%% section Section
	%% A task : a1, 2022-02-17, 30d
	%% Another task : after a1, 20d
	%% section Another
	%% Task in sec : 2022-02-24, 12d
	%% another task : 24d


	1.0-Setup-Backend-(Craft) : a0, 2022-02-17, 1d
	1.1-Setup-Server : a1, after a0, 1d
	1.2-Setup-Frontend : a2, after a1, 6d
	2.0-Start-Backend-(Craft) : a3, after a2, 1d
	2.1-Start-Frontend : a4, after a3, 12d
	3.0-Frontend : a5, after a4, 9d
	3.1-Backend : a6, after a5, 26d
	5.0-Search : a7, after a6, 2d
	5.2-Testing : a8, after a7, 15d
	5.3-Content : a9, after a8, 1d
	5.4-Misc : a10, after a9, 6d

```

		';

	}
}
