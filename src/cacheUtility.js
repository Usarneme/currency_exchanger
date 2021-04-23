export const checkCache = currency => {
  return JSON.parse(window.sessionStorage.getItem(currency))
}
export const updateCache = (currency, exchangeRates) => {
  window.sessionStorage.setItem(currency, exchangeRates)
}
