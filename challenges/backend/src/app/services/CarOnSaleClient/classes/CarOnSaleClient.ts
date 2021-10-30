import { injectable } from "inversify";
import { IBuyerAuctionView } from "../../../types/buyerAuctionView.type";
import { IGeneralBusinessTerms } from "../../../types/generalBusinessTerms.type";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { AuthAPI } from "../../../utils/AuthAPI";
import axios from "axios";
import { IAuthenticationResult } from "../../../types/authenticationResult.type";
//import staticJsondata from "../../../runningAuction.json";
//import http from "../../../utils/http-common";
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  async getRunningAuctions(): Promise<IBuyerAuctionView[]> {
    const authAPI = new AuthAPI();

    // get auth token to be able to access runnin auctin
    const authenticationResult: IAuthenticationResult =
      await authAPI.getAuthToken();
    /**
     * The result contains a "userId" and a "token" field that have to be set as "userid" / "authtoken"
     * HTTP header in further requests.
     */

    const http = axios.create({
      baseURL: authAPI.baseURL,
      headers: {
        userid: `${authenticationResult.userId}`,
        authtoken: `${authenticationResult.token}`,
      },
    });

    const response = await http.get("/v2/auction/buyer/?count=false");

    //TODO change staticJsondata with response
    const buyerAuctionView: IBuyerAuctionView[] = [];

    for (const element of response.data.items) {
      buyerAuctionView.push({
        id: element.id,
        label: element.label,
        numBids: element.numBids,
        currentHighestBidValue: element.currentHighestBidValue,
        minimumRequiredAsk: element.minimumRequiredAsk,
      });
    }
    return buyerAuctionView;
  }

  // Get current version of the general business terms.
  async getGeneralBusinessTerms(): Promise<IGeneralBusinessTerms> {
    const authAPI = new AuthAPI();
    const http = axios.create({ baseURL: authAPI.baseURL });
    const response = await http.get("/v1/public/general-business-terms");
    return response.data;
  }
}
