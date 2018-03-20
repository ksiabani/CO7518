import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalAmount: number;
  annualInterest: number;
  years: number;
  loanPeriods: number;
  periodInterest: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  payments: { period: number, payment: number, principal: number, interest: number, balance: number }[] = [];
  displayedColumns = ['period', 'payment', 'principal', 'interest', 'balance'];

  constructor() {}

  ngOnInit() {
    this.loanPeriods = this.years * 12;
    this.periodInterest = this.annualInterest / 100 / 12;
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
    return (this.getInterest(currPeriod) / this.periodInterest) - this.getPrincipal(currPeriod);
  }

  getPayments() {
    this.payments = [];
    this.loanPeriods = this.years * 12;
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
  }

}
