// $ Mock Data for the stocks, this data will be retrieved from the API Alpha Vantage or CoinMarketCap

export type StockIndicatorProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
};

const Stockitems: StockIndicatorProps[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 218.27, change: 1.94 },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 417.88,
    change: 0.35,
  },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.71, change: 5.26 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 117.7, change: -0.7 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 187.42, change: 0.82 },
];

export default Stockitems;
