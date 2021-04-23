import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import CurrencyExchanger from './CurrencyExchanger'
const myCurrencyExchange = new CurrencyExchanger()

// handle currency from and currency to changes
$("#currency-from").on("select change click", "option", (event) => {
  myCurrencyExchange.changeFrom(event.currentTarget.value)
  validateReadiness()
})

$("#currency-to").on("select change click", "option", (event) => {
  myCurrencyExchange.changeTo(event.currentTarget.value)
  validateReadiness()
})

// validate both from and to are selected
const validateReadiness = () => {
  if (myCurrencyExchange.to && myCurrencyExchange.from) showExchangeSubmitButton()
}

// show submit button
const showExchangeSubmitButton = () => {
  $("#exchangeSubmitButton").show()
}

// handle form submission/data retrieval
$(".form").on("submit", event => {
  event.preventDefault()
  const cash = $("#original-amount").val()
  if (cash === 0 || cash === "0") return alert("Please enter the cash amount you wish to exchange.")

  console.log("FORM SUBMIT", myCurrencyExchange)
  // check cache for existing exchange rate
  // if yes, use cached data to get response/rate (cache invalidation/age of results?)
  // update ui
  // if no, make api call
  // update cache to save result
  // update ui
})
