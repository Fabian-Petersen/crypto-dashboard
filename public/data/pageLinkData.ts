import {
  Home,
  TrendingUp,
  DollarSign,
  Briefcase,
  CreditCard,
  BarChart3,
  Settings,
  PieChart,
} from "lucide-react";
import { v4 as uuid4 } from "uuid";

export type PageLinksTypes = {
  id: string;
  name: string;
  tooltip_content: string;
  url: string;
  icon: React.ComponentType;
};

const pageLinkData: PageLinksTypes[] = [
  {
    id: uuid4(),
    url: "/",
    name: "overview",
    icon: Home,
    tooltip_content: "Overview",
  },
  {
    id: uuid4(),
    url: "/stocks",
    name: "stocks",
    icon: TrendingUp,
    tooltip_content: "Stocks",
  },
  {
    id: uuid4(),
    url: "/cryptocurrencies",
    name: "cryptocurrencies",
    icon: DollarSign,
    tooltip_content: "Cryptocurrencies",
  },
  {
    id: uuid4(),
    url: "/portfolio",
    name: "portfolio",
    icon: Briefcase,
    tooltip_content: "portfolio",
  },
  {
    id: uuid4(),
    url: "/transactions",
    name: "transactions",
    icon: CreditCard,
    tooltip_content: "Transactions",
  },
  {
    id: uuid4(),
    url: "/analytics",
    name: "analytics",
    icon: BarChart3,
    tooltip_content: "analytics",
  },
  {
    id: uuid4(),
    url: "/reports",
    name: "reports",
    icon: PieChart,
    tooltip_content: "reports",
  },
  {
    id: uuid4(),
    url: "/settings",
    name: "settings",
    icon: Settings,
    tooltip_content: "settings",
  },
];

export default pageLinkData;
