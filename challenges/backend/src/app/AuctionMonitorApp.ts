import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { FormattingRunningAuction } from "./utils/FormattingRunningAuction";
import { exit } from "process";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CARONSALECLIENT)
    private carOnSaleClient: ICarOnSaleClient
  ) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
    try {
      // get current running auction information from the API
      const runningAuction = await this.carOnSaleClient.getRunningAuctions();

      // get aggregated information of current running auction
      const runningAuctionFormat = FormattingRunningAuction(runningAuction);

      // display aggregated information
      console.log(`
      Number Of Auctions: ${runningAuctionFormat.numberOfAuctions}
      Average Number Of Bids On An Auction: ${runningAuctionFormat.averageNumberOfBidsOnAnAuction}
      Average Percentage Of The Auction Progress: ${runningAuctionFormat.averagePercentageOfTheAuctionProgress}
      `);

      this.logger.log("App ended with no error");
      exit(0);
    } catch (e) {
      this.logger.log(`App ended with error ${e}`);
      exit(-1);
      //this.logger.log(e.message);
    }
  }
}
