import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'

import CurrencyExchanger from './CurrencyExchanger'
const myCurrencyExchange = new CurrencyExchanger()
import { checkCache, updateCache } from './cacheUtility'

const resetValues = () => {
  $("#currency-from")[0].selectedIndex = 0
  $("#currency-to")[0].selectedIndex = 0
  $("#original-amount").val(0)
  myCurrencyExchange.setCash(0)
  myCurrencyExchange.setFrom("")
  myCurrencyExchange.setTo("")
}
// reset all values after page load/refresh
resetValues()

// handle currency from and currency to changes
$("#currency-from").on("select change click blur", "option", (event) => {
  myCurrencyExchange.setFrom(event.currentTarget.value)
  if (validateForm()) showExchangeSubmitButton()
})
$("#currency-to").on("select change click blur", "option", (event) => {
  myCurrencyExchange.setTo(event.currentTarget.value)
  if (validateForm()) showExchangeSubmitButton()
})
// handle changes to the original cash input
$("#original-amount").on("change blur", () => {
  const cash = Number($("#original-amount").val())
  if (!cash || isNaN(cash)) return renderError("Please enter an amount of money to be exchanged.")
  myCurrencyExchange.setCash(cash)
  if (validateForm()) showExchangeSubmitButton()
})

// validate cash, to, and from currencies have been set before allowing submit/request
const validateForm = () => {
  return (myCurrencyExchange.getTo() && myCurrencyExchange.getFrom() && myCurrencyExchange.getCash())
}

const showExchangeSubmitButton = () => {
  $("#exchangeSubmitButton").show()
}

// handle form submission/data retrieval
$(".form").on("submit", async event => {
  event.preventDefault()
  // check cache for existing exchange rate
  let exchangeRateData = checkCache(myCurrencyExchange.getFrom())
  if (exchangeRateData) {
    // if yes, use cached data to get response/rate
    return updateUi(exchangeRateData)
  } else {
    // if no, make api call
    try {
      exchangeRateData = await CurrencyExchanger.getExchangeRatesFor(myCurrencyExchange.getFrom())
      if (exchangeRateData.result !== "success") throw new Error(`API call failed: ${exchangeRateData.result} - ${exchangeRateData["error-type"]}`)
      updateCache(exchangeRateData.base_code, JSON.stringify(exchangeRateData.conversion_rates))
      return updateUi(exchangeRateData.conversion_rates)
    } catch (error) {
      renderError(error)
    }
  }
})

const updateUi = exchangeRateData => {
  const from = myCurrencyExchange.getFrom()
  const to = myCurrencyExchange.getTo()
  // From spec: "If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist."
  // THIS IS IMPOSSIBLE WHEN USING SELECT OPTIONS^^^^^^ I did my best to account for this impossible condition on the next line. -Tom
  if (!to) return renderError("Please select a currency to which you want to exchange funds.")
  const originalCash = myCurrencyExchange.getCash()
  const exchangeRatedCash = originalCash * exchangeRateData[to]
  let html = `<h2>From $${originalCash} ${from} to $${exchangeRatedCash.toFixed(2)} ${to}.</h2>`
  $(".results").html(html).show()
}

const renderError = errorMessage => {
  if (errorMessage.message === "NetworkError when attempting to fetch resource.") errorMessage = "Error retrieving data. Did you forget to select currency types for both from and to which you want to exchange? Please try again."
  $(".error-span").text(errorMessage)
  $(".alert").show()
}

$(".alert-close-button").on("click", () => {
  $(".alert").hide()
})
