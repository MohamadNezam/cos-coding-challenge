import "reflect-metadata";
import { CarOnSaleClient } from "../../services/CarOnSaleClient/classes/CarOnSaleClient";
import { items } from "../../runningAuction.json";

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");

describe("Testing CarOnSaleClient Class", function () {
  //carOnSaleClient.getGeneralBusinessTerms = sinon.fake.return();

  describe("Testing getGeneralBusinessTerms", function () {
    var carOnSaleClient = new CarOnSaleClient();

    it("should return an object with Get current version of the general business terms.", async function () {
      sinon
        .stub(carOnSaleClient, "getGeneralBusinessTerms")
        .callsFake(function () {
          return {
            id: 44,
            contentAsHtml: "test 29.10",
            createdAt: "2021-10-29T07:42:52.316Z",
            uuid: "fa6026b6-5376-4137-b5ae-1f9967c2042b",
          };
        });

      expect((await carOnSaleClient.getGeneralBusinessTerms()).id).to.be.equal(
        44
      );
    });
  });
  describe("Testing getRunningAuctions", function () {
    var carOnSaleClient = new CarOnSaleClient();

    it("should return an array of objects which containing running auctions", async function () {
      sinon.stub(carOnSaleClient, "getRunningAuctions").callsFake(function () {
        return items;
      });
      // console.log(items);
      const result = await carOnSaleClient.getRunningAuctions();

      expect(result).to.be.an("array");
      expect(result).not.to.be.an("object");
    });
  });
});
