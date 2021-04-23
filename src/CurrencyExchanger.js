export default class CurrencyExchanger {
  constructor(from, to) {
    this.from = from,
    this.to = to,
    this.cash = 0
  }

  getFrom() {
    return this.from
  }

  setFrom(currency) {
    this.from = currency
  }

  getTo() {
    return this.to
  }

  setTo(currency) {
    this.to = currency
  }

  getCash() {
    return this.cash
  }

  setCash(amount) {
    this.cash = amount
  }

  static async getExchangeRatesFor(currency) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`
    const response = await fetch(url)
    return await response.json()
  }
}