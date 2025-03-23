import { v4 as uuid4 } from "uuid";

export type WishlistDataTypes = {
  id: string;
  title: string;
  symbol: string;
  price: number;
  change: number;
};

const WishlistData: WishlistDataTypes[] = [
  {
    id: uuid4(),
    title: "apple inc",
    symbol: "AAPL",
    price: 197.57,
    change: 0.63,
  },
  {
    id: uuid4(),
    title: "tesla inc",
    symbol: "TSLA",
    price: 238.83,
    change: -1.55,
  },
  {
    id: uuid4(),
    title: "bitcoin",
    symbol: "BTC",
    price: 42637.3,
    change: 2.14,
  },
  {
    id: uuid4(),
    title: "ethereum",
    symbol: "ETH",
    price: 2274.16,
    change: 1.87,
  },
  {
    id: uuid4(),
    title: "amazon.com, inc",
    symbol: "AMZN",
    price: 153.42,
    change: 1.53,
  },
];

export default WishlistData;
