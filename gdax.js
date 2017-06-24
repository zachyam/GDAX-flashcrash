var request = require('sync-request');
let url = 'https://api.gdax.com/products/eth-usd/trades?after='

var result = [];

(function() {
  try {
    for (let i = 6324501; i < 6326581; i+=100) {
      var res = request('GET', url.concat(i), {
      'headers': {
        'user-agent': 'example-user-agent'
        }
      });
      var pageResult = [];
      let response = JSON.parse(res.getBody());
      for (let j = 0; j < response.length; ++j) {
        let order = Math.round(response[j]["size"] * 100000000) / 100000000;
        pageResult.push(order);
      }
      var totalOnPage = pageResult.reduce((total, amount) => total + amount);
      result.push(totalOnPage);
      var total = result.reduce((total, amount) => total + amount);
      var totalLoss = total * 224.48;
      console.log(totalLoss);
    }
  }
  catch (e) {
    console.log (e);
  }
})()
