import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Declare fields and variables to use
  totalAmount: number;
  annualInterest: number;
  years: number;
  private loanPeriods: number;
  private periodInterest: number;
  private payment: number;
  private principal: number;
  private interest: number;
  private balance: number;
  payments: { period: number, payment: number, principal: number, interest: number, balance: number }[] = [];
  displayedColumns = ['period', 'payment', 'principal', 'interest', 'balance'];

  // Run the constructor
  constructor() {
  }

  ngOnInit() {
    // Our initial state is any empty form, so nothing to do here really
  }

  // Calculations following the equal total payments method below

  // Method to calculate payment. It will be the same for all installments.
  getPayment() {
    return this.periodInterest *
      this.totalAmount * Math.pow(1 + this.periodInterest, this.loanPeriods) /
      (Math.pow(1 + this.periodInterest, this.loanPeriods) - 1);
  }

  // Method to calculate principal amount. It takes one parameter, the period number
  getPrincipal(currPeriod: number) {
    return this.payment / Math.pow(1 + this.periodInterest, 1 + this.loanPeriods - currPeriod);
  }

  // Method to calculate the interest amount paid. Expects period number as parameter
  getInterest(currPeriod: number) {
    return this.payment - this.getPrincipal(currPeriod);
  }

  // Method to calculate the balance amount paid. Expects period number as parameter
  getBalance(currPeriod: number) {
    return (this.getInterest(currPeriod) / this.periodInterest) - this.getPrincipal(currPeriod);
  }

  // Method to run all the calculations.
  // It will run everytime an input value changes
  getPayments() {

    // Empty everything we have
    this.payments = [];

    // Calculate loan periods and period interest
    this.loanPeriods = this.years * 12;
    this.periodInterest = this.annualInterest / 100 / 12;

    // Calculate the equal for all periods payment
    this.payment = this.getPayment();

    // iterate through number of periods calculating all other data
    // and filling the payments array that will show in front end
    for (let i = 1; i <= this.loanPeriods; i++) {

      // Push current payment to payments array
      this.payments.push({
        period: i,
        payment: this.payment,
        principal: this.getPrincipal(i),
        interest: this.getInterest(i),
        balance: this.getBalance(i)
      });

    }
  }

}
