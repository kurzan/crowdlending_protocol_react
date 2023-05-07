import { BigNumberish } from "ethers";


export type TInvestors = {
    investor: string,
    amount: number
};

export type TBorrow = {
    borrowId: number,
    borrower: string,
    image: string,
    companyName: string,
    description: string,
    status: number,
    totalBorrowed: BigNumberish,
    interestRate: number,
    info: string;
    borrowingGoal: BigNumberish;
    investors: TInvestors[];
    borrowingPeriod: number;
    startTime: number;
    closeTime: number;
    createTime: BigNumberish;
};
