import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../account.service';
import { Account } from '../../account';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private accountsService: AccountsService = inject(AccountsService)
  form: FormGroup = new FormGroup({
    user : new FormControl(''),
    pin : new FormControl('')
  })
  account = input(null)
  wrongLogin = input(false)

  constructor() {
    // effect(() => {
    //   this.account.set(this.accountsService.getAccount())
    //   }, {allowSignalWrites: true})
  }

  ngOnInit(): void {
    // this.welcomeMessage()
  }

  onSubmit(){
    this.accountsService.login(this.form.get('user').value , this.form.get('pin').value)
    this.form.reset()
  }

  welcomeMessage = computed(() => {
    const currentAccount = this.account();
    if (currentAccount) {
      return `Welcome, ${currentAccount.owner}`;
    } else {
      return `Log in to get started`;
    }
  });
}
