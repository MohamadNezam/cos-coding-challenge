import { IBuyerAuctionView } from "../types/buyerAuctionView.type";
import { IRunningAuctionFormat } from "../types/runningAuctionFormat.type";

/*
 * This function aggregate running auction information
 * and retun the result in an object of type IRunningAuctionFormat
 */

export function FormattingRunningAuction(
  runningAuction: IBuyerAuctionView[]
): IRunningAuctionFormat {
  if (runningAuction.length === 0)
    return {
      numberOfAuctions: 0,
      averageNumberOfBidsOnAnAuction: 0,
      averagePercentageOfTheAuctionProgress: 0,
    };
  let numberOfAuctions: number = runningAuction.length;
  let totalNumBids: number = 0.0;
  //Sum of the ratio of current highest bid value and minimum required ask
  let totalPercentageOfTheAuctionProgress: number = 0.0;
  for (const element of runningAuction) {
    totalNumBids += element.numBids;
    if (element.minimumRequiredAsk) {
      totalPercentageOfTheAuctionProgress +=
        element.currentHighestBidValue / element.minimumRequiredAsk;
    } else {
      console.log(
        // TODO
        // minimumRequiredAsk is not set ( null ) ignor right now
        "error: " +
          element.numBids.toString() +
          " " +
          element.currentHighestBidValue.toString() +
          " " +
          element.minimumRequiredAsk +
          " " +
          element.currentHighestBidValue / element.minimumRequiredAsk
      );
    }
  }

  let averageNumberOfBidsOnAnAuction = totalNumBids / numberOfAuctions;

  let averagePercentageOfTheAuctionProgress =
    totalPercentageOfTheAuctionProgress / numberOfAuctions;

  //round result to two digit before return it
  return {
    numberOfAuctions:
      Math.round((numberOfAuctions + Number.EPSILON) * 100) / 100,
    averageNumberOfBidsOnAnAuction:
      Math.round((averageNumberOfBidsOnAnAuction + Number.EPSILON) * 100) / 100,
    averagePercentageOfTheAuctionProgress:
      Math.round(
        (averagePercentageOfTheAuctionProgress + Number.EPSILON) * 100
      ) / 100,
  };
}
