export type StockPriceDataTypes = {
  month: string;
  price: number;
};

const StockPriceData: StockPriceDataTypes[] = [
  { month: "Jan", price: 150.32 },
  { month: "Feb", price: 180.45 },
  { month: "Mar", price: 170.12 },
  { month: "Apr", price: 190.78 },
  { month: "May", price: 195.34 },
  { month: "Jun", price: 180.56 },
  { month: "Jul", price: 170.89 },
  { month: "Aug", price: 190.23 },
  { month: "Sept", price: 200.67 },
  { month: "Oct", price: 210.45 },
  { month: "Nov", price: 225.78 },
  { month: "Dec", price: 220.12 },
];

export default StockPriceData;
