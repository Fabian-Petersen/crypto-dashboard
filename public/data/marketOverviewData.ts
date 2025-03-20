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
    value: 4587.64,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "nasdaq",
    value: 4587.64,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "bitcoin",
    value: 4587.64,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "euthereum",
    value: 4587.64,
    trend: 0.63,
  },
  {
    id: uuid4(),
    title: "gold",
    value: 4587.64,
    trend: 0.63,
  },
];

export default MarketOverviewData;
