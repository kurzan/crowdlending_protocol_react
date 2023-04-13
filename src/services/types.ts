import { BigNumberish } from "ethers";

export type TBorrow = {
    borrowId: number,
    image: string,
    companyName: string,
    description: string,
    status: string,
    totalBorrowed: BigNumberish,
    interestRate: number,
    info: string;
    borrowingGoal: BigNumberish;
    investors: any[];
    borrowingPeriod: number;
    startTime: number;
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