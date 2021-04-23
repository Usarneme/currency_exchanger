export default class CurrencyExchanger {
  constructor(from, to) {
    this.from = from,
    this.to = to,
    this.cash = 0
  }

  changeFrom(currency) {
    this.from = currency
  }

  changeTo(currency) {
    this.to = currency
  }

  setCash(amount) {
    this.cash = amount
  }

  getCash() {
    return this.cash
  }

  static async getExchangeRateFor(currency) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`
    const response = await fetch(url)
    return await response.json()
  }
}