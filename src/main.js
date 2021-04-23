import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'

// handle currency from and currency to changes
$("#currency-from").on("select change click", "option", (event) => {
  console.log("FROM")
  console.log(event.currentTarget.value)
})

$("#currency-to").on("select change click", "option", (event) => {
  console.log("TO")
  console.log(event.currentTarget.value)
})
// validate both from and to are selected
// show submit button
// handle form submission/data retrieval
// check cache for existing exchange rate
// if yes, use cached data to get response/rate (cache invalidation/age of results?)
// update ui
// if no, make api call
// update cache to save result
// update ui
