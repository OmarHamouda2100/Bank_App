export interface Account {
  owner: string,
  movements: number[],
  interestRate: number,
  pin: string,
  movementsDates: string[],
  currency: string,
  locale: string
}
