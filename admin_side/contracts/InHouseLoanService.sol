// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract InHouseLoanService {
    using SafeMath for uint256;

    struct Loan {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 start;
        uint256 dueDate;
        bool isApproved;
        bool isDisbursed;
        bool isRepaid;
    }

    mapping(address => Loan) public loans;
    address public owner;
    uint256 public totalLoansDisbursed;

    event LoanApplied(address borrower, uint256 amount);
    event LoanApproved(address borrower);
    event LoanDisbursed(address borrower, uint256 amount);
    event LoanRepaid(address borrower, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    modifier onlyBorrower(address _borrower) {
        require(msg.sender == _borrower, "Unauthorized: Only borrower allowed");
        _;
    }

    function applyForLoan(uint256 _amount, uint256 _interestRate, uint256 _duration) public {
        require(_amount > 0 && _interestRate > 0 && _duration > 0, "Invalid loan parameters");
        require(loans[msg.sender].amount == 0, "Existing loan must be repaid first");
        loans[msg.sender] = Loan(_amount, _interestRate, _duration, 0, 0, false, false, false);
        emit LoanApplied(msg.sender, _amount);
    }

    function approveLoan(address _borrower) public onlyOwner {
        Loan storage loan = loans[_borrower];
        require(loan.amount > 0 && !loan.isApproved, "Invalid loan application");
        loan.isApproved = true;
        emit LoanApproved(_borrower);
    }

    function disburseLoan(address _borrower) public onlyOwner {
        Loan storage loan = loans[_borrower];
        require(loan.isApproved && !loan.isDisbursed, "Loan must be approved and not yet disbursed");
        loan.isDisbursed = true;
        loan.start = block.timestamp;
        loan.dueDate = block.timestamp.add(loan.duration.mul(1 days));
        totalLoansDisbursed = totalLoansDisbursed.add(loan.amount);
        emit LoanDisbursed(_borrower, loan.amount);
    }

    function repayLoan() public payable onlyBorrower(msg.sender) {
        Loan storage loan = loans[msg.sender];
        require(loan.isDisbursed && !loan.isRepaid, "Loan must be disbursed and not yet repaid");
        require(block.timestamp <= loan.dueDate, "Loan repayment is overdue");
        uint256 daysElapsed = (block.timestamp - loan.start) / 1 days;
        uint256 interest = loan.amount.mul(loan.interestRate).mul(daysElapsed).div(36500);
        uint256 totalDue = loan.amount.add(interest);
        require(msg.value >= totalDue, "Insufficient amount to repay the loan");
        loan.isRepaid = true;
        uint256 excessAmount = msg.value - totalDue;
        if (excessAmount > 0) {
            payable(msg.sender).transfer(excessAmount);
        }
        payable(owner).transfer(totalDue.sub(loan.amount));
        emit LoanRepaid(msg.sender, loan.amount);
    }

    function checkLoanStatus(address _borrower) public view returns (string memory) {
        Loan memory loan = loans[_borrower];
        if (loan.isRepaid) return "Repaid";
        if (loan.isDisbursed) return "Disbursed";
        if (loan.isApproved) return "Approved";
        return "Applied or Non-existent";
    }

    function getLoanInfo(address _borrower) public view returns (Loan memory) {
        return loans[_borrower];
    }
}
