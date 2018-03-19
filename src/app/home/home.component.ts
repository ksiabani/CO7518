import {Component, OnInit} from '@angular/core';
import {MatTable, MatCell, MatTableDataSource, MatCellDef} from '@angular/material';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  totalAmount = 100000;
  annualInterest = 5;
  loanPeriods = 36;
  periodInterest: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  payments: { period: number, payment: number, principal: number, interest: number, balance: number }[] = [];

  displayedColumns = ['period', 'payment', 'principal', 'interest', 'balance'];
  dataSource = new MatTableDataSource(this.payments);

  constructor() {
  }

  ngOnInit() {
    // this.isLoading = true;
    // this.quoteService.getRandomQuote({ category: 'dev' })
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((quote: string) => { this.quote = quote; });
    this.periodInterest = this.annualInterest / 100 / 12;
    // this.payment = this.getPayment();
    // this.principal = this.getPrincipal();
    // this.interest = this.getInterest();
    // this.balance = this.getBalance();
    this.getPayments();
  }

  getPayment() {
    return this.periodInterest *
      this.totalAmount * Math.pow(1 + this.periodInterest, this.loanPeriods) /
      (Math.pow(1 + this.periodInterest, this.loanPeriods) - 1);
  }

  getPrincipal(currPeriod: number) {
    return this.payment / Math.pow(1 + this.periodInterest, 1 + this.loanPeriods - currPeriod);
  }

  getInterest(currPeriod: number) {
    return this.payment - this.getPrincipal(currPeriod);
  }

  getBalance(currPeriod: number) {
    return this.getInterest(currPeriod) / this.periodInterest - this.getPrincipal(currPeriod);
  }

  getPayments() {
    this.payments = [];
    this.periodInterest = this.annualInterest / 100 / 12;
    this.payment = this.getPayment();
    for (let i = 1; i <= this.loanPeriods; i++) {
      this.payments.push({
        period: i,
        payment: this.payment,
        principal: this.getPrincipal(i),
        interest: this.getInterest(i),
        balance: this.getBalance(i)
      });
    }
    this.dataSource = new MatTableDataSource(this.payments);
  }


//   const periodInterest = 0.004; annualInterest / 100 / 12;
// //let currPeriod = 2;
//
//   const payment =
//     periodInterest *
//     totalAmount *
//     Math.pow(1 + periodInterest, loanPeriods) /
//     (Math.pow(1 + periodInterest, loanPeriods) - 1);
//
//   const principal = currPeriod =>
//     payment / Math.pow(1 + periodInterest, 1 + loanPeriods - currPeriod);
//
//   const interest = currPeriod => payment - principal(currPeriod);
//
//   const balance = currPeriod =>
//     interest(currPeriod) / periodInterest - principal(currPeriod);

}
