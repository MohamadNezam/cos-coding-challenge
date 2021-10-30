var chai = require("chai");
var expect = chai.expect;
//var sinon = require("sinon");
var nock = require("nock");

import { AuthAPI } from "../../utils/AuthAPI";

describe("WE are going to test AuthAPI.ts", function () {
  const authApiObj = new AuthAPI();
  var email = authApiObj.buyerUserEmail;
  beforeEach((done) => {
    nock.restore();
    nock.cleanAll();
    nock.activate();
    done();
  });

  describe("testing checkIfEmailExist method", function () {
    it("if user has credentials", async function () {
      const url = "/v1/authentication/" + email + "/registered";
      nock(authApiObj.baseURL).persist().get(url).reply(204, {});
      const result = await authApiObj.checkIfEmailExist(email);
      //console.log(result);
      expect(result.status).to.be.equal(204);
    });

    it("if no user found with the provided e-mail address", async function () {
      const url = "/v1/authentication/" + email + "/registered";
      var fail = false;
      nock(authApiObj.baseURL).get(url).reply(404, {});

      try {
        await authApiObj.checkIfEmailExist(email);
        fail = true;
      } catch (e) {}
      if (fail) throw Error("nothing");
      //if (fail === false) throw console.error();

      //console.log(result);
    });
  });

  describe("testing sendAuthenticationRequest method", function () {
    it("Create authentication token for given credentials.", async function () {
      const url = `/v1/authentication/${email}`;
      const responseBody = {
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOLWJ1eWVyLWNoYWxsZW5nZUBjYXJvbnNhbGUuZGUiLCJ1c2VyVXVpZCI6IjA1NGQ0NTc3LTY5YTAtNGU0Yi04ZTVlLTk3NWJjZjhjNjJjNyIsImlhdCI6MTYzNTU5NDYxNiwiZXhwIjoxNjM1ODUzODE2fQ.Y_jmUepTWfRghZq48w_LYnRpY2eNPpHCtfAKRaAqE82j1O9NqXTWxvZR5AKPKei8L854M90uqPZp2nfQy2V8sMBNYBPO8egoDgEsluuvYkun2l5CI-os8CQRj36QxjLireBEF1rFGw_HOZh5rvqIKHIUVeK99P_g_WGnOucF0ew",
        authenticated: true,
        userId: "buyer-challenge@caronsale.de",
        internalUserId: 2324,
        internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
        type: 1,
        privileges: "{SALESMAN_USER}",
      };
      nock(authApiObj.baseURL).put(url).reply(201, responseBody);
      const result = await authApiObj.sendAuthenticationRequest();

      expect(result.status).to.be.equal(201);
      expect(result.data).to.have.property("token");
      //expect(result.data).to.have.property("authenticated").equal(false);
    });
  });

  describe("testing checkAuthToken method", function () {
    it("should returm auth token ", async function () {
      const result = await authApiObj.getAuthToken();
      expect(result.token).to.be.not.equal(null);
    });
  });
});
