export default class CurrencyExchanger {
  static async getExchangeRateFor(currency) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`
    const response = await fetch(url)
    return await response.json()
  }
}