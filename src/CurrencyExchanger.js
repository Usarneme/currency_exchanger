export default class CurrencyExchanger {
  constructor(from, to) {
    this.from = from,
    this.to = to
  }

  changeFrom(currency) {
    this.from = currency
  }

  changeTo(currency) {
    this.to = currency
  }

  static async getExchangeRateFor(currency) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`
    const response = await fetch(url)
    return await response.json()
  }
}