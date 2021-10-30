import "reflect-metadata";
import { FormattingRunningAuction } from "../../utils/FormattingRunningAuction";
import { empty, items } from "../../runningAuction.json";

var chai = require("chai");
var expect = chai.expect;

describe("Testing FormattingRunningAuction", function () {
  describe("test if aggregation running auction done correctly", function () {
    it("should return 0 for numberOfAuctions,averageNumberOfBidsOnAnAuction,averagePercentageOfTheAuctionProgress when no running auctions ", function () {
      const result = FormattingRunningAuction(empty);
      expect(result.numberOfAuctions).to.be.equal(0);
      expect(result.averageNumberOfBidsOnAnAuction).to.be.equal(0);
      expect(result.averagePercentageOfTheAuctionProgress).to.be.equal(0);
    });
    it("should return the calculation for numberOfAuctions,averageNumberOfBidsOnAnAuction,averagePercentageOfTheAuctionProgress when no running auctions ", function () {
      const result = FormattingRunningAuction(items);
      expect(result.numberOfAuctions).to.be.equal(10);
      expect(result.averageNumberOfBidsOnAnAuction).to.be.equal(0.1);
      expect(result.averagePercentageOfTheAuctionProgress).to.be.eql(0.07);
    });
  });
});
