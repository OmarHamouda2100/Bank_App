import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { AccountsService } from '../../account.service';
import { CommonModule } from '@angular/common';
import { Account } from '../../account';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityForms } from './forms';


@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent implements OnInit {
private accountService: AccountsService = inject(AccountsService)

  activityForms = new ActivityForms()
  account = input(null);
  amount: number;
  formatedDates: string[] = [];

  transferForm: FormGroup = new FormGroup({
    transferTo: new FormControl(''),
    amount: new FormControl('')
  })

  closeForm: FormGroup = this.activityForms.closeAccount()

  constructor() {
    effect(() => {
      if(this.account()) {
        this.formatedDates = this.accountService.formatDate()
        this.formateCur()
      }
    }, { allowSignalWrites: true })

  }

  ngOnInit(): void {

  }

  transferMoney() {
    this.accountService.transferMony(this.transferForm.get('transferTo').value, this.transferForm.get('amount').value)
    this.transferForm.reset()
  }

  getLoan() {
    this.accountService.getLoan(this.amount)
    this.amount;
  }

  closeAccount(index) {
    this.accountService.deleteAccount(this.closeForm.getRawValue().confirmUser, this.closeForm.getRawValue().confirmPIN, index)
    this.closeForm.reset()
  }

  formatDate() {
    const options: any = {day :'2-digit', month: '2-digit', year: 'numeric'}
    const locale = this.account().locale
    const formatedDates: string[] = []
    const today =  new Date()

      this.account()?.movementsDates.forEach((date) => {
        const passedDate = new Date(date)
        const passedDays = this.passedDays(today, passedDate)
        const formatedDate = new Date(date).toLocaleDateString(locale, options)
        let newDate: string;

        if(passedDays === 0) {
          newDate =  'Today'
        }else if(passedDays === 1) {
          newDate =  'Yesterday'
        }else if(passedDays <= 7 ) {
          newDate = `${passedDays} days ago`
        } else {
          newDate = formatedDate
        }

        formatedDates.push(newDate)

      })
      return formatedDates
  }

  passedDays(date1, date2): number {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)))
  }

  formateCur() {
    const newMovements = []
    this.account().movements.forEach((mov) => {
      new Intl.NumberFormat(this.account().locale, {style: 'currency', currency: this.account().currency})
      .format(mov
      )
      newMovements.push(mov)
    })
    return newMovements
  }

}
