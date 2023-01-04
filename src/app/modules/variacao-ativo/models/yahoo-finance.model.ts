export interface YahooFinance {
  chart: {
    error: string;
    result: [
      {
        indicators: { quote: [] };
        meta: {
          chartPreviousClose: number;
          currentTradingPeriod: {
            post: { end: Date; gmtoffset: Date; start: Date; timezone: string };
            pre: { end: Date; gmtoffset: Date; start: Date; timezone: string };
            regular: {
              end: Date;
              gmtoffset: Date;
              start: Date;
              timezone: string;
            };
            dataGranularity: string;
            exchangeName: string;
            exchangeTimezoneName: string;
            firstTradeDate: Date;
            gmtoffset: number;
            instrumentType: string;
            previousClose: number;
            priceHint: number;
            range: string;
            regularMarketPrice: number;
            regularMarketTime: Date;
            scale: number;
            symbol: string;
            timezone: string;
            validRanges: Array<string>;
          };
        };
      }
    ];
  };
}
