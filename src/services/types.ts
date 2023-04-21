import { BigNumberish } from "ethers";

export type TBorrow = {
    borrowId: number,
    image: string,
    companyName: string,
    description: string,
    status: number,
    totalBorrowed: BigNumberish,
    interestRate: number,
    info: string;
    borrowingGoal: BigNumberish;
    investors: any[];
    borrowingPeriod: number;
    startTime: number;
};
