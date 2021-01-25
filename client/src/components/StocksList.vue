<template lang="html">
  <div id="stocks-list">


    <div id="portfolio-summary">

      <button v-on:click="fetchLatestPrice('KO')">Test Fetch</button>

      <h3>Portfolio Summary</h3>
      <button v-on:click="showTransactions=portfolio">Show All Transactions</button>
      <ul>
        <li v-for='share in sharesSummary'>
          <p>{{share.symbol}}: {{share.shares}} shares </p>
          <button v-on:click="filterTransactions(share.symbol)">Show {{share.symbol}} Transactions</button>
        </li>
      </ul>
    </div>

    <div v-if='showTransactions'id="transaction-history">
      <h3>Transaction History</h3>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th>Ticker Symbol</th>
            <th>Shares Purchased/Sold</th>
            <th>Value at Transaction</th>
            <th>Date of Transaction</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row" v-for='share in showTransactions'>
            <td>{{share.symbol}}</td>
            <td>{{share.shares}}</td>
            <td>{{share.valueAtPurchase}}</td>
            <td>{{share.dateOfPurchase}}</td>
          </tr>
        </tbody>

      </table>
    </div>


  </div>
</template>

<script>
import keys from '../keys.js'

export default {
  name: "stocks-list",
  data() {
    return {
      showTransactions: null,
      price: null,
      sharesSummary: null,
    }
  },
  props: ['portfolio'],
  methods: {
    filterTransactions: function(tickerSymbol) {
      this.showTransactions = this.portfolio.filter(share => {
        return share.symbol === tickerSymbol;
      })
    },
    fetchLatestPrice: function(ticker){
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${keys.key2}`

      fetch(url)
      .then(res => res.json())
      .then(data => {
        const obj = data['Time Series (Daily)'];
        const arr = Object.values(obj);
        const latestEntry = arr[0];
      this.price = latestEntry['4. close']
      })
    },
    getSharesSummary: function() {
      // new array to push to
      const sharesSummary = [];
      // Fetch latest price of first share in portfolio
      // this.fetchLatestPrice(this.portfolio[0].symbol);
      
      // Push first object to sharesSummary to allow looping
      sharesSummary.push({
        symbol: this.portfolio[0].symbol,
            shares: this.portfolio[0].shares,
            latestPrice: this.price
          });
      // loop through this.portfolio
      for (let i = 1; i < this.portfolio.length; i++) {
        let pushShare = true;
        // loop through existing items in sharesSummary
        for (let j of sharesSummary) {
          // if symbol exists, add shares
          if (j.symbol === this.portfolio[i].symbol) {
            j.shares += this.portfolio[i].shares;
            pushShare = false;
          } 
        };
        // if symbol does not exist (appendShare = false), add symbol and shares
        if (pushShare) {
          console.log('i: ', i, ' symbol: ', this.portfolio[i].symbol)
          sharesSummary.push({
            symbol: this.portfolio[i].symbol,
            shares: this.portfolio[i].shares,
          })
        }
      };
      console.log('end loop')
      this.sharesSummary = sharesSummary;
    }
  },
  created(){
    this.getSharesSummary();
  },
  computed: {
    
  }

};
</script>

<style lang="css" scoped>
  #stocks-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>