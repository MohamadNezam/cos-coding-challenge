/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { IGeneralBusinessTerms } from "../../../types/generalBusinessTerms.type";
import { IBuyerAuctionView } from "../../../types/buyerAuctionView.type";

export interface ICarOnSaleClient {
  getRunningAuctions(): Promise<IBuyerAuctionView[]>;
  getGeneralBusinessTerms(): Promise<IGeneralBusinessTerms>;
}
