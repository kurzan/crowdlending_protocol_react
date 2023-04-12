export type TBorrow = {
    id: string,
    image: string,
    companyName: string,
    description: string,
    status: string,
    totalBorrowed: number,
    interestRate: number,
    info: string;
    goal: number;
};

type TInvestors = {

};

export type TBorrowFromContract = {
  borrowId: BigInt;
  borrower: string;
  borrowingGoal: BigInt;
  borrowingPeriod: BigInt;
  closeTime: BigInt;
  interestRate: BigInt;
  investors: any[];
  startTime: BigInt;
  status: BigInt;
  totalBorrowed: BigInt;
};