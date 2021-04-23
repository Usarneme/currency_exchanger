import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import CurrencyExchanger from './CurrencyExchanger'
const myCurrencyExchange = new CurrencyExchanger()

// handle currency from and currency to changes
$("#currency-from").on("select change click", "option", (event) => {
  console.log("FROM", event.currentTarget.value)
  myCurrencyExchange.changeFrom(event.currentTarget.value)
})

$("#currency-to").on("select change click", "option", (event) => {
  console.log("TO", event.currentTarget.value)
  myCurrencyExchange.changeTo(event.currentTarget.value)
})

// validate both from and to are selected
const validateReadiness = () => {
  if (myCurrencyExchange.to && myCurrencyExchange.from) showExchangeSubmitButton()
}

const showExchangeSubmitButton = () => {
  $("#exchangeSubmitButton").show()
}
// show submit button
// handle form submission/data retrieval
// check cache for existing exchange rate
// if yes, use cached data to get response/rate (cache invalidation/age of results?)
// update ui
// if no, make api call
// update cache to save result
// update ui
