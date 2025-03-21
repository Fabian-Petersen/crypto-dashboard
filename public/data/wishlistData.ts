import { v4 as uuid4 } from "uuid";

export type WishlistDataTypes = {
  id: string;
  title: string;
  name: string;
  value: number;
  trend: number;
};

const WishlistData: WishlistDataTypes[] = [
  {
    id: uuid4(),
    title: "apple inc",
    name: "AAPL",
    value: 197.57,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "tesla inc",
    name: "TSLA",
    value: 238.83,
    trend: -1.55,
  },
  {
    id: uuid4(),
    title: "bitcoin",
    name: "BTC",
    value: 42637.3,
    trend: 2.14,
  },
  {
    id: uuid4(),
    title: "ethereum",
    name: "ETH",
    value: 2274.16,
    trend: 1.87,
  },
  {
    id: uuid4(),
    title: "amazon.com, inc",
    name: "AMZN",
    value: 153.42,
    trend: 1.53,
  },
];

export default WishlistData;
