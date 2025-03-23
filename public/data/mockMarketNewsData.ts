// $ Type for a single topic
export type NewsTopic = {
  topic: string;
  relevance_score: string;
};

// $ Type for a single news item
export type NewsItem = {
  title: string;
  url: string;
  time_published: string;
  source: string;
  summary: string;
  topics: NewsTopic[];
  banner_image?: string; // Optional, some items might not have images
  source_domain?: string; // Optional domain information
  overall_sentiment_score?: number; // Optional sentiment analysis
  overall_sentiment_label?:
    | "Bearish"
    | "Somewhat-Bearish"
    | "Neutral"
    | "Somewhat-Bullish"
    | "Bullish"; // Optional sentiment label
};

// $ Type for the complete news feed response
export type NewsData = {
  feed: NewsItem[];
};

// $ Type for the mock data used in development
export type MockNewsData = NewsData;

// $ Export a default empty state for initialization
export const emptyNewsData: NewsData = {
  feed: [],
};

const mockMarketNewsData: MockNewsData = {
  feed: [
    {
      title: "Apple Announces New MacBook Pro with M3 Chip",
      url: "https://example.com/apple-m3-chip",
      time_published: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      source: "Financial Times",
      topics: [
        { topic: "Technology", relevance_score: "0.95" },
        { topic: "Consumer Electronics", relevance_score: "0.89" },
      ],
      summary:
        "Apple unveiled its latest MacBook Pro featuring the new M3 chip, promising significant performance improvements and better power efficiency than previous models.",
    },
    {
      title: "Federal Reserve Signals Interest Rate Cut by End of Year",
      url: "https://example.com/fed-rate-cut",
      time_published: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      source: "Bloomberg",
      topics: [
        { topic: "Economy", relevance_score: "0.98" },
        { topic: "Federal Reserve", relevance_score: "0.95" },
      ],
      summary:
        "The Federal Reserve has indicated it may cut interest rates by the end of the year, citing improving inflation figures and concerns about economic growth.",
    },
    {
      title: "Amazon Expands Healthcare Offerings with New Acquisition",
      url: "https://example.com/amazon-healthcare",
      time_published: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
      source: "CNBC",
      topics: [
        { topic: "Healthcare", relevance_score: "0.92" },
        { topic: "Business", relevance_score: "0.88" },
      ],
      summary:
        "Amazon announced today the acquisition of a healthcare technology startup, further expanding its footprint in the healthcare industry and signaling its continued interest in disrupting traditional healthcare models.",
    },
    {
      title: "Oil Prices Drop Amid Supply Concerns",
      url: "https://example.com/oil-prices",
      time_published: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
      source: "Reuters",
      topics: [
        { topic: "Energy", relevance_score: "0.94" },
        { topic: "Commodities", relevance_score: "0.91" },
      ],
      summary:
        "Global oil prices fell sharply today following reports of increased production from major oil-producing countries, raising concerns about oversupply in an already fragile market.",
    },
    {
      title: "Tesla Beats Quarterly Earnings Expectations",
      url: "https://example.com/tesla-earnings",
      time_published: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
      source: "Wall Street Journal",
      topics: [
        { topic: "Automotive", relevance_score: "0.93" },
        { topic: "Earnings", relevance_score: "0.89" },
      ],
      summary:
        "Tesla reported quarterly earnings that exceeded analyst expectations, with revenue up 20% year-over-year. The company cited strong vehicle deliveries and improvements in its energy business as key drivers.",
    },
  ],
};

export default mockMarketNewsData;
