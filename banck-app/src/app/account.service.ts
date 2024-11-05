import { Injectable, signal } from "@angular/core";
import { Observable, of, single, Subject } from "rxjs";
import { Account } from "./account";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accounts : Account[] = [
    {
      owner: 'aaa',
      movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
      interestRate: 1.2, // %
      pin: '1111',

      movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2024-09-20T18:49:59.371Z',
        '2024-09-22T12:01:20.894Z',
      ],
      currency: 'EUR',
      locale: 'pt-PT',
    },

    {
      owner: 'bbb',
      movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
      interestRate: 1.5,
      pin: '2222',

      movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-09-20T18:49:59.371Z',
        '2024-09-22T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
    }
  ]
  currentAccount = signal<Account | null>(null);
  balance = signal<number>(0);
  in = signal<number>(0)
  out = signal<number>(0)
  interst = signal<number>(0)
  date = signal(null)
  wrongLogin = false

  login(name : any, pin: any): boolean {
    let logedinAccount = (this.accounts.find((acc) => {
      return acc.owner === name && acc.pin === pin
    }))



    if(logedinAccount) {
      this.currentAccount.set(logedinAccount)
      return true
    }
  }

  getAccount() {
    return this.currentAccount()
  }

  // getAccount(): Observable<any> {
  //   return  of (this.currentAccount())
  // }


  calcBalance() {
    this.balance.set(Math.trunc(this.currentAccount().movements.reduce((acc: number, curr: number) => acc + curr)))
    return this.balance()
  }

  calcIn() {
    this.in.set(Math.trunc(this.currentAccount().movements.filter((mov: number) => {
      return mov > 0
    }).reduce((acc: number, curr: number) => acc + curr )))

    return this.in()
  }

  calcOut() {
    this.out.set(Math.trunc(this.currentAccount().movements.filter((mov: number) => {
      return mov < 0
    }).reduce((acc: number, curr: number) => ((acc) + (curr)))))

    return this.out()
  }

  calcIntrest() {
    this.interst.set(Math.trunc(this.currentAccount().movements.filter((mov: number) => {
      return mov > 0
    }).map((mov: number) => mov * this.currentAccount().interestRate / 100).
    reduce((acc: number, cur: number) => acc + cur)))

    return this.interst()
  }

  transferMony(reseverAccount: any, amount: any) {
    const resever = this.accounts.find((acc) => {
      return acc.owner === reseverAccount
    })

    if(resever.owner !== this.currentAccount().owner && amount > 0 && this.calcBalance() >= amount ) {
      this.currentAccount().movements.push(-amount)
      resever.movements.push(amount)

      this.currentAccount().movementsDates.push(new Date().toISOString())
      resever.movementsDates.push(new Date().toISOString())
      this.updateData()
    }
  }

  getLoan(amount: number) {
    if(this.currentAccount()) {
      setTimeout(() => {
        this.currentAccount().movements.push(amount)
        this.currentAccount().movementsDates.push(new Date().toISOString())
        this.updateData()
      },3000)
    }
  }

  deleteAccount(name: any, pin: any, index) {
    if(this.currentAccount().owner === name && this.currentAccount().pin === pin) {
      this.accounts.splice(index, 1)

      this.currentAccount.set(null)
    }
  }

  logout(timer: string) {
    if(timer === `00:00`) {
      this.currentAccount.set(null)
    }
  }

  formatDate() {
    const options: any = {day :'2-digit', month: '2-digit', year: 'numeric'}
    const locale = this.currentAccount().locale
    const formatedDates: string[] = []

      this.currentAccount()?.movementsDates.forEach((date) => {
        const formatedDate = new Date(date).toLocaleDateString(locale, options)
        formatedDates.push(formatedDate)
      })
      return formatedDates
  }

  private updateData() {
    this.calcBalance()
    this.calcIn()
    this.calcOut()
    this.calcIntrest()
  }
}


