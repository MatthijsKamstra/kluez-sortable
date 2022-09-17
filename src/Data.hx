class Data {
	public function new() {
		// your code
	}

	public static function getData() {
		return [
			{
				title: 'Milestone A',
				type: "milestone",
				issues: [
					{
						title: 'issue 1',
						type: "issue",
					},
					{
						title: 'issue 2',
						type: "issue",
					},
					{
						title: 'issue 3',
						type: "issue",
					},
				]
			},
			{
				title: 'Milestone B',
				type: "milestone",
				issues: [
					{
						title: 'issue 4',
						type: "issue",
					},
					{
						title: 'issue 5',
						type: "issue",
					},
					{
						title: 'issue 6',
						type: "issue",
					},
				]
			}
		];
	}
}

typedef KluezSortableObj = {
	@:optional var _id:String;
	var title:String;
	var type:String;
	var issues:Array<Issues>;
}

typedef Issues = {
	@:optional var _id:String;
	var title:String;
	var type:String;
}

enum KlType {
	MILESTONE;
	ISSUE;
}
