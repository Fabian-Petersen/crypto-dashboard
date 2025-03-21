import { v4 as uuid4 } from "uuid";

export type MarketOverviewTypes = {
  id: string;
  title: string;
  value: number;
  trend: number;
};

const MarketOverviewData: MarketOverviewTypes[] = [
  {
    id: uuid4(),
    title: "S&P 500",
    value: 4587.64,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "dow jones",
    value: 37306.02,
    trend: 0.86,
  },
  {
    id: uuid4(),
    title: "nasdaq",
    value: 14403.97,
    trend: -0.23,
  },
  {
    id: uuid4(),
    title: "bitcoin",
    value: 42637.3,
    trend: 2.14,
  },
  {
    id: uuid4(),
    title: "euthereum",
    value: 2274.16,
    trend: 1.87,
  },
  {
    id: uuid4(),
    title: "gold",
    value: 2032.3,
    trend: -0.12,
  },
];

export default MarketOverviewData;
