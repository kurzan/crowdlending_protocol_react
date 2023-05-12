// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 contract EarlyBirdProtocol{

    event borrowCreated(string message);
    event borrowActivated(string message, uint _Id);
    event borrowClosed(string message, uint _Id);
    event investmentAdd(string message, uint amount, string _message, uint _Id);
    event investmentCancel(string message);
    event borrowOPEN(string message, uint number, string _message);
    event borrowACTIVE(string message, uint number, string _message);
    event borrowCLOSED(string message, uint number, string _message);
    event borrowDeposited(string message, uint number, string _message);

    address public owner;
    uint256 startBorrowId;

    constructor() payable {
        owner = msg.sender;
        startBorrowId = 0;
    }

    enum BorrowStatus {
        OPEN,
        ACTIVE,
        CLOSED,
        CANCELED
    }

    struct Investment {
        address investor;
        uint amount;
    }

    struct Borrow {
        uint borrowId;
        BorrowStatus status;
        address borrower;
        uint borrowingGoal; 
        uint borrowingPeriod;
        uint interestRate;
        uint totalBorrowed;
        uint borrowBalance;
        Investment[] investors;
        uint createTime;
        uint startTime;
        uint closeTime;
    }

    mapping(uint256 => Borrow) borrows;
    mapping(address=>uint []) attempts;
    uint256[] borrowIds;


    modifier onlyBorrower(uint _borrowId) {
        require(msg.sender == borrows[_borrowId].borrower, "Only for borrower");
        _;
    }

    modifier onlyInvestor(uint _borrowId) {
        bool _isInvestor = false;
        for (uint i = 0; i < borrows[_borrowId].investors.length; i++) {
            if (borrows[_borrowId].investors[i].investor == msg.sender) {
                _isInvestor = true;
                break;
            }
        }
        require(_isInvestor, "Only for investors");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only for owner");
        _;
    }

    function createBorrow (uint _borrowingGoal, uint _borrowingPeriod, uint _interestRate) public {
        require(_borrowingGoal!=0 && _borrowingPeriod!=0, "Parametrs should be above 0" );

        uint _borrowId = startBorrowId ++;

        Borrow storage borrow = borrows[_borrowId];

        borrow.borrowId = _borrowId;
        borrow.status= BorrowStatus.OPEN;
        borrow.borrower = msg.sender;
        borrow.borrowingGoal = _borrowingGoal;
        borrow.borrowingPeriod = _borrowingPeriod * 1 days;
        borrow.interestRate = _interestRate;
        borrow.totalBorrowed = 0;
        borrow.investors;
        borrow.createTime = block.timestamp;

        borrowIds.push(_borrowId);
        emit borrowCreated("Borrow created");
    }

    //остановить займ
    function closeBorrow (uint _borrowId) public onlyBorrower(_borrowId) {
        require(borrows[_borrowId].borrowingPeriod!=0,"You havent started yet");
        require(borrows[_borrowId].status!=BorrowStatus.CLOSED, "This borrow is already closed");
        require(borrows[_borrowId].status!=BorrowStatus.CANCELED, "This borrow is already canceled");

        Borrow storage borrow = borrows[_borrowId];
        borrow.closeTime = block.timestamp;

        if(borrows[_borrowId].status == BorrowStatus.ACTIVE) {
            require(borrows[_borrowId].borrowBalance >= (borrows[_borrowId].totalBorrowed * borrows[_borrowId].interestRate/100),"Insufficient funds");

            for (uint i = 0; i < borrow.investors.length; i++) {
                Investment memory investment = borrow.investors[i];
                uint amount = investment.amount + (investment.amount / 100 * borrow.interestRate);

                payable(investment.investor).transfer(amount);
                borrows[_borrowId].borrowBalance -= amount;
            }
            borrow.status = BorrowStatus.CLOSED;
            }

        else if (borrows[_borrowId].status == BorrowStatus.OPEN) {
            require(borrows[_borrowId].borrowBalance >= (borrows[_borrowId].totalBorrowed),"Insufficient funds");

            for (uint i = 0; i < borrow.investors.length; i++) {
                Investment memory investment = borrow.investors[i];
                uint amount = investment.amount;

                payable(investment.investor).transfer(amount);
                investment.amount = 0;
                borrows[_borrowId].borrowBalance -= amount;
                }
            borrow.status = BorrowStatus.CANCELED;
            }

        emit borrowClosed("You successfully closed borrowing procedure", _borrowId);
    }

    function getBorrowIds () public view returns (uint256[] memory) {
        return borrowIds;
    }

    function getBorrow (uint _borrowId) public view returns (Borrow memory) {
        require(borrows[_borrowId].borrowingPeriod!=0,"This borrow doesnt exist");

        Borrow memory borrow = borrows[_borrowId];

        return borrow;
    }

    function startBorrow (uint _borrowId) internal {
        require(borrows[_borrowId].totalBorrowed == borrows[_borrowId].borrowingGoal,"You haven't enough money to start");

        borrows[_borrowId].status = BorrowStatus.ACTIVE;
        borrows[_borrowId].startTime = block.timestamp;

        emit borrowActivated("Borrowing procedure oficially activated", _borrowId);
    }

    function invest(uint _borrowId) public payable {
        require(borrows[_borrowId].status!=BorrowStatus.CLOSED, "This borrow is already closed");
        require(borrows[_borrowId].status!=BorrowStatus.CANCELED, "This borrow is already canceled");     
        require(borrows[_borrowId].borrowingGoal >= borrows[_borrowId].totalBorrowed + msg.value, "Too much invest amount");
        require(msg.value!=0,"The amount equals 0 and cannot be invested in project");

        for(uint i=0;i<borrows[_borrowId].investors.length;i++){
            require(borrows[_borrowId].investors[i].investor != msg.sender,"You already invested in project");
        }

        Investment memory investor; 

        investor.investor = msg.sender;
        investor.amount = msg.value;

        Borrow storage borrow = borrows[_borrowId];

        borrow.totalBorrowed += msg.value;
        borrow.borrowBalance += msg.value;

        if(borrow.totalBorrowed == borrow.borrowingGoal) {
            startBorrow(_borrowId);
        }

        borrow.investors.push(investor);

        emit investmentAdd("You invested", msg.value/10**18, "ethers in project N", _borrowId);
    }

    function cancelInvest(uint _borrowId) public onlyInvestor(_borrowId) {
        require(borrows[_borrowId].status==BorrowStatus.OPEN, "Borrow should be open");

        for(uint i=0;i<borrows[_borrowId].investors.length;i++){
            if(borrows[_borrowId].investors[i].investor == msg.sender) {
                borrows[_borrowId].totalBorrowed -= borrows[_borrowId].investors[i].amount;
                borrows[_borrowId].borrowBalance -= borrows[_borrowId].investors[i].amount;

                payable(borrows[_borrowId].investors[i].investor).transfer(borrows[_borrowId].investors[i].amount);
                delete borrows[_borrowId].investors[i];
            }
        }

        emit investmentCancel("Success cancel invest");
    }


    function depositMoney(uint _borrowId) public payable onlyBorrower(_borrowId){
        require(borrows[_borrowId].status==BorrowStatus.ACTIVE, "This borrow isn't active");
        require(msg.value!=0, "Your deposit equals 0 and can't be deposited");

        borrows[_borrowId].borrowBalance += msg.value;

        emit borrowDeposited("You succesfully deposited", msg.value/10**18,"ethers to borrow");
    }

    function withdrawMoney(uint _borrowId, uint percent) public payable onlyBorrower(_borrowId){
        require(borrows[_borrowId].borrowBalance>0,"You havent anything to withdraw");

        uint amountToWithdraw= borrows[_borrowId].borrowBalance*percent/100;
        borrows[_borrowId].borrowBalance -= amountToWithdraw;
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function getBorrowBalance(uint _borrowId) public view onlyBorrower(_borrowId) returns(uint){
        require(borrows[_borrowId].borrowingPeriod!=0,"This borrow doesnt exist");
        
        return (borrows[_borrowId].borrowBalance);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {
    }
}