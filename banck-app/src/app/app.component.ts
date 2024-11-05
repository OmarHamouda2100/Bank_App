import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BalanceComponent } from './components/balance/balance.component';
import { MovementsComponent } from './components/movements/movements.component';
import { SummaryComponent } from "./components/summary/summary.component";
import { CommonModule } from '@angular/common';
import { AccountsService } from './account.service';
import { Account } from './account';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    BalanceComponent,
    MovementsComponent,
    SummaryComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
title(title: any) {
  throw new Error('Method not implemented.');
}
private accountsService: AccountsService = inject(AccountsService)

account = signal<Account | null>(null)
wrongLogin = false


constructor() {
  effect(() => {
      const newAccount = this.accountsService.getAccount()
      this.account.set(newAccount)
  }, {allowSignalWrites: true})

}

ngOnInit(): void {

}

logout(timer: string) {
  this.accountsService.logout(timer)
}

}
