import { inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

export class ActivityForms {
  #fb: FormBuilder = inject(FormBuilder)

  

  closeAccount() {
    return this.#fb.group({
      confirmUser: [null],
      confirmPIN: [null]
    })
  }
}
