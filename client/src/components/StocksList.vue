<template lang="html">
  <div id="stocks-list">

    <div id="portfolio-summary">

      <h3>Portfolio Summary</h3>
      <h4 v-if="currentPortfolioValue" >Total Portfolio Value: ${{currentPortfolioValue | numberFilter}}</h4>
      <button v-on:click="getSharesPrices">update summary</button>

      <button v-on:click="showTransactions=portfolio">Show All Transactions</button>
      <ul>
        <li v-for='share in sharesSummary'>
          <p>{{share.symbol}}: {{share.shares}} shares </p>
          <div v-if='share.latestPrice' class="latest-price">
            <p>The price at close is: ${{share.latestPrice | numberFilter}}</p>
            <p>The value of your {{share.symbol}} holdings are: ${{share.latestPrice * share.shares | numberFilter}}</p>
          </div>
          <button v-on:click="filterTransactions(share.symbol)">Show {{share.symbol}} Transactions</button>
        </li>
      </ul>
    </div>

    <div v-if='showTransactions'id="transaction-history">
      <h3>Transaction History</h3>
      <h4 v-bind:class="{higher: isHigher, lower: !isHigher}">Investment Value: ${{ investedValue | numberFilter }}</h4>
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
import keys from "../../.env/keys.js";

export default {
  name: "stocks-list",
  data() {
    return {
      showTransactions: null,
      prices: [],
      ownedShareSymbols: [],
      sharesSummary: null,
    };
  },
  props: ["portfolio"],
  methods: {
    filterTransactions: function (tickerSymbol) {
      this.showTransactions = this.portfolio.filter((share) => {
        return share.symbol === tickerSymbol;
      });
    },
    fetchMultiplePrices: function (symbolList) {
      const promises = symbolList.map((ticker) => {
        return fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${keys.key2}`
        ).then((res) => res.json());
      });
      console.log(promises);
      Promise.all(promises).then((data) => {
        console.log(data);
        for (let item of data) {
          const obj = item["Time Series (Daily)"];
          const arr = Object.values(obj);
          const latestEntry = arr[0];
          this.prices.push(parseFloat(latestEntry["4. close"]));
        }
      });
    },
    getSharesSummary: function () {
      // new array to push to
      const sharesSummary = [];

      // Push first object to sharesSummary to allow looping
      sharesSummary.push({
        symbol: this.portfolio[0].symbol,
        shares: this.portfolio[0].shares,
        latestPrice: 0,
      });
      this.ownedShareSymbols.push(this.portfolio[0].symbol);
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
        }
        // if symbol does not exist (pushShare = false), add symbol and shares
        if (pushShare) {
          sharesSummary.push({
            symbol: this.portfolio[i].symbol,
            shares: this.portfolio[i].shares,
            latestPrice: 0,
          });
          this.ownedShareSymbols.push(this.portfolio[i].symbol);
        }
      }
      this.sharesSummary = sharesSummary;
    },

    getSharesPrices: function () {
      console.log("hello");
      for (let i = 0; i < this.sharesSummary.length; i++) {
        console.log(this.prices[i]);
        this.sharesSummary[i].latestPrice = this.prices[i];
      }
    },
  },
  created() {
    this.getSharesSummary();
    this.fetchMultiplePrices(this.ownedShareSymbols);
  },
  computed: {
    currentPortfolioValue: function () {
      let total = 0;
      for (let share of this.sharesSummary) {
        total += share.latestPrice * share.shares;
      }
      return total;
    },

    investedValue: function () {
      let total = 0;
      for (let share of this.portfolio) {
        total += share.valueAtPurchase * share.shares;
      }
      return total;
    },

    isHigher: function () {
      return this.investedValue > this.currentPortfolioValue;
    }
  },
  watch: {
    portfolio: function (val) {
      this.getSharesSummary();
    },
  },
  filters: {
    numberFilter: function (number) {
      return number.toFixed(2);
    },
  },
};
</script>

<style lang="css">
#stocks-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.higher {
  color: red;
  text-decoration: underline;
}

.lower {
  color: green;
}
</style>