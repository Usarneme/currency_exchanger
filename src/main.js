import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import CurrencyExchanger from './CurrencyExchanger'
const myCurrencyExchange = new CurrencyExchanger()

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
  console.log("CASH CHANGED",cash)
  if (!cash || isNaN(cash)) return
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
$(".form").on("submit", event => {
  event.preventDefault()
  console.log("FORM SUBMIT", myCurrencyExchange)
  // check cache for existing exchange rate
  // if yes, use cached data to get response/rate (cache invalidation/age of results?)
  // update ui
  // if no, make api call
  // update cache to save result
  // update ui
})

// check the cache for an existing exchange rate
