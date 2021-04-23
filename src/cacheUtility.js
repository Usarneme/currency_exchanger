// check the cache for an existing exchange rate
export const checkCache = currency => {
  console.log("CHECKING CACHE")
  return JSON.parse(window.sessionStorage.getItem(currency))
}
// update the cache with data retrieved from exchange rate api
export const updateCache = (currency, exchangeRates) => {
  console.log("UPDATING CACHE")
  window.sessionStorage.setItem(currency, exchangeRates)
}
