import axios from "axios";
import { IAuthenticationRequest } from "../types/authenticationRequest.type";
import { IAuthenticationResult } from "../types/authenticationResult.type";
export class AuthAPI {
  public baseURL = "https://api-core-dev.caronsale.de/api";
  public buyerUserEmail = "buyer-challenge@caronsale.de";
  private buyerUserPassword = "Test123.";
  private authenticationResult: IAuthenticationResult = {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOLWJ1eWVyLWNoYWxsZW5nZUBjYXJvbnNhbGUuZGUiLCJ1c2VyVXVpZCI6IjA1NGQ0NTc3LTY5YTAtNGU0Yi04ZTVlLTk3NWJjZjhjNjJjNyIsImlhdCI6MTYzNTQ5Mjk4MywiZXhwIjoxNjM1NzUyMTgzfQ.CSmSymSWujx_mGf8QAOFBP-8kCieLN8aNfkMDXE68oT0vJXh-AS1S5Ke4zWF-KMiJrNTbHikBj6MdhA2ixIMxs64MbGy2759vNgolWfKXuZUPT257ytCnqOXH8vBF1sgzmOYNOjWSXa2SG4JyNSO1PNpnkXmFlEELes5CzAYzAc",
    authenticated: true,
    userId: "buyer-challenge@caronsale.de",
    internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
    type: 1,
    privileges: "{SALESMAN_USER}",
  };
  private authenticationRequest: IAuthenticationRequest = {
    password: this.buyerUserPassword,
    meta: "",
  };

  private http = axios.create({ baseURL: this.baseURL });

  /**
   * Verify if the provided e-mail address has credentials in the IdP
   */
  public async checkIfEmailExist(mailAddress: string = this.buyerUserEmail) {
    return await this.http.get(`/v1/authentication/${mailAddress}/registered`);
  }

  /**
   * Create authentication token for given credentials.
   */
  public async sendAuthenticationRequest(
    mailAddress: string = this.buyerUserEmail,
    authenticationRequest = this.authenticationRequest
  ) {
    return await this.http.put(
      `/v1/authentication/${mailAddress}`,
      authenticationRequest
    );
  }

  /**
   * Validate if the given authentication token is expired yet.
   * If it is not expired, session life time is extended.
   */
  public async checkAuthToken(
    mailAddress: string = this.buyerUserEmail,
    authenticationResult = this.authenticationResult
  ) {
    return await this.http.post(
      `/v1/authentication/${mailAddress}`,
      authenticationResult
    );
  }

  /**
   * get auth token for the current users
   */
  public async getAuthToken(): Promise<IAuthenticationResult> {
    let response;
    try {
      // if they current one still availabe return it
      response = await this.checkAuthToken();
      this.authenticationResult = response.data;
      if (response.status === 200) return response.data;
    } catch (err) {
      // otherwise request new one
      response = await this.sendAuthenticationRequest();
      this.authenticationResult = response.data;
      if (response.status === 201) return response.data;
    }

    return this.authenticationResult;
  }
}
