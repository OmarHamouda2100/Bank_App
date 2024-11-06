import { Component, effect, EventEmitter, inject, input, Input, OnInit, Output, signal } from '@angular/core';
import { AccountsService } from '../../account.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
private accountService: AccountsService = inject(AccountsService)

incomes = signal<any>(null)
out = signal<any>(null)
intrest = signal<any>(null)
sort = false
account = input(null)
private time: number = 120
timer:string =''
@Output() timerEvent = new EventEmitter<string>();

constructor() {
  effect(() => {
    this.incomes.set(this.accountService.calcIn())
    this.out.set(this.accountService.calcOut())
    this.intrest.set(this.accountService.calcIntrest())
    if(this.account() !== this.accountService.getAccount()){
      this.time = 120
    }
  }, {allowSignalWrites: true})
}

  ngOnInit(): void {
    this.setTimer()
  }

  setTimer() {
    let countTimer = setInterval(() => {
      this.time--

      const min = String(Math.trunc(this.time / 60)).padStart(2, '0')
      const sec = String(this.time % 60).padStart(2, '0')

      this.timer = `${min}:${sec}`

      this.timerEvent.emit(this.timer)

      if(this.time <= 0) {
        clearInterval(countTimer)
      }
    },1000)
  }

}
