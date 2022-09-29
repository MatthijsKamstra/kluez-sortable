package tests;

import export.Csv;

using buddy.Should;

@colorize
class TestDate extends buddy.SingleSuite {
	public function new() {
		describe('test week', {
			var csv = new Csv();
			var week;
			// week = csv.weekNumber(Date.now());
			// week = csv.weekNumber(new Date(2022, 0, 1, 0, 0, 0)); //
			// it("sa 1 januari 2022", {
			// 	week.should.be(52);
			// });
			week = csv.weekNumber(new Date(2022, 0, 3, 0, 0, 0)); //
			it("mon 3 januari 2022", {
				week.should.be(1);
			});
			week = csv.weekNumber(new Date(2022, 0, 10, 0, 0, 0)); //
			it("mon 10 januari 2022", {
				week.should.be(2);
			});
			week = csv.weekNumber(new Date(2022, 9, 28, 0, 0, 0)); //
			it("wed 28 september 2022", {
				week.should.be(39);
			});
			week = csv.weekNumber(new Date(2022, 11, 28, 0, 0, 0));
			it("wed 28 december 2022", {
				week.should.be(52);
			});
			week = csv.weekNumber(new Date(2023, 0, 1, 0, 0, 0));
			it("sun 1 januari 2023", {
				week.should.be(52);
			});
			week = csv.weekNumber(new Date(2023, 0, 2, 0, 0, 0));
			it("mon 2 januari 2023", {
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
