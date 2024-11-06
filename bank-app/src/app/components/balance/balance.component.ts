import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AccountsService } from '../../account.service';
import { Account } from '../../account';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit {
private accountsService: AccountsService = inject(AccountsService)

balance = signal<any>(null)
account = signal<Account | null>(null)

constructor() {
  effect(() => {
    this.balance.set(this.accountsService.calcBalance())
    this.account.set(this.accountsService.currentAccount())
  },{allowSignalWrites: true})
}

ngOnInit(): void {
  this.loginDate()
}

loginDate(): string {
  const options: any = {day :'2-digit', month: '2-digit', year: 'numeric'}
  return new Date().toLocaleDateString(this.account()?.locale, options)
}
}
