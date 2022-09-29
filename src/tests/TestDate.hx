package tests;

import export.Csv;

using buddy.Should;

@colorize
class TestDate extends buddy.SingleSuite {
	public function new() {
		describe('Test week number', {
			var csv = new Csv();
			var week;
			// week = csv.weekNumber(Date.now());
			it("sa 1 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 1, 0, 0, 0)); //
				week.should.be(52);
			});
			it("mon 3 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 3, 0, 0, 0)); //
				week.should.be(1);
			});
			it("tue 4 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 4, 0, 0, 0)); //
				week.should.be(1);
			});
			it("wed 5 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 5, 0, 0, 0)); //
				week.should.be(1);
			});
			it("thu 6 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 6, 0, 0, 0)); //
				week.should.be(1);
			});
			it("fri 7 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 7, 0, 0, 0)); //
				week.should.be(1);
			});
			it("sat 8 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 8, 0, 0, 0)); //
				week.should.be(1);
			});
			it("sun 9 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 9, 0, 0, 0)); //
				week.should.be(1);
			});
			it("mon 10 januari 2022", {
				week = csv.weekNumber(new Date(2022, 0, 10, 0, 0, 0)); //
				week.should.be(2);
			});
			// feb
			it("di 1 februari 2022", {
				week = csv.weekNumber(new Date(2022, 1, 1, 0, 0, 0)); //
				week.should.be(5);
			});

			//
			it("mon 26 september 2022", {
				week = csv.weekNumber(new Date(2022, 8, 26, 0, 0, 0)); //
				week.should.be(39);
			});
			it("wed 28 september 2022", {
				week = csv.weekNumber(new Date(2022, 8, 28, 0, 0, 0)); //
				week.should.be(39);
			});
			//
			it("mon 3 october 2022", {
				week = csv.weekNumber(new Date(2022, 9, 3, 0, 0, 0)); //
				week.should.be(40);
			});
			// december
			it("mon 26 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 26, 0, 0, 0));
				week.should.be(52);
			});
			it("tue 27 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 27, 0, 0, 0));
				week.should.be(52);
			});
			it("wed 28 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 28, 0, 0, 0));
				week.should.be(52);
			});
			it("thu 29 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 29, 0, 0, 0));
				week.should.be(52);
			});
			it("fri 30 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 30, 0, 0, 0));
				week.should.be(52);
			});
			it("sat 31 december 2022", {
				week = csv.weekNumber(new Date(2022, 11, 31, 0, 0, 0));
				week.should.be(52);
			});

			// jan
			it("sun 1 januari 2023", {
				week = csv.weekNumber(new Date(2023, 0, 1, 0, 0, 0));
				week.should.be(52);
			});
			it("mon 2 januari 2023", {
				week = csv.weekNumber(new Date(2023, 0, 2, 0, 0, 0));
				week.should.be(1);
			});
			it("wed 4 januari 2023", {
				week = csv.weekNumber(new Date(2023, 0, 4, 0, 0, 0));
				week.should.be(1);
			});
		});

		// A test suite:

		// describe("Using Buddy", {
		// 	var experience = "?";
		// 	var mood = "?";

		// 	beforeEach({
		// 		experience = "great";
		// 	});

		// 	it("should be a great testing experience", {
		// 		experience.should.be("great");
		// 	});

		// 	it("should make the tester really happy", {
		// 		mood.should.be("happy");
		// 	});

		// 	afterEach({
		// 		mood = "happy";
		// 	});
		// });
	}
}
