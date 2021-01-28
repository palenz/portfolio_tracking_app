<template lang="html">
  <div id="stocks-list">

    <div id="portfolio-summary">

      <h3 class="h3">Portfolio Summary</h3>
        <h4 v-if="currentPortfolioValue" >Total Portfolio Value: ${{currentPortfolioValue | numberFilter}}</h4>
        <h4 v-if="currentPortfolioValue" >Your total portfolio value has changed by {{portfolioGrowth}}%</h4>
        <button v-on:click="getSharesPrices">Show Summary</button>

        <button v-on:click="showTransactions=portfolio">Show All Transactions</button>
        <table class="portfolio-table">
          <thead class="portfolio-table-header">
            <tr>
              <th>Stock Ticker</th>
              <th>Number of Shares</th>
              <th>More Information</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='share in sharesSummary' class="portfolio-table-row">
              <td>{{share.symbol}}</td>
              <td>{{share.shares}}</td>
              <div v-if='share.latestPrice' class="latest-price">
                <p>The latest price at close is: ${{share.latestPrice | numberFilter}}</p>
                <p>The value of your {{share.symbol}} holdings are: ${{share.latestPrice * share.shares | numberFilter}}</p>
                <growth-graph v-if="sharesSummary" :shareSummary="share" :portfolio="portfolio"></growth-graph>
              </div>
              <td></td>
              <td>
                <button v-on:click="filterTransactions(share.symbol)">Show {{share.symbol}} Transactions</button>
              </td>
            </tr>
          </tbody>
        </table>

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
import GrowthGraph from "./GrowthGraph.vue"

export default {
  name: "stocks-list",
  components: {
    "growth-graph": GrowthGraph
  },
  data() {
    return {
      showTransactions: this.portfolio,
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
      Promise.all(promises).then((data) => {
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
      for (let i = 0; i < this.sharesSummary.length; i++) {
        this.sharesSummary[i].latestPrice = this.prices[i];
      }
    }
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
    },
    portfolioGrowth: function () {
      let growth = (this.currentPortfolioValue - this.investedValue) / this.investedValue * 100;
      return parseFloat(growth.toFixed(2));
    }
  },
  watch: {
    portfolio: function () {
      this.getSharesSummary();
    },
  },
  filters: {
    numberFilter: function (number) {
      return new Intl.NumberFormat().format(number);
    },
  },
};
</script>

<style lang="css" scoped>
  #stocks-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .portfolio-summary {
    background-color: #009879;
  }

  .table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .table th,
  .table td {
    padding: 12px 15px;
  }

  .table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .table tbody tr:nth-of-type(odd) {
    background-color: rgb(223, 219, 219);
  }

  .table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .portfolio-summary {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 50px 50px;
  }

  .portfolio-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .portfolio-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .portfolio-table th,
  .portfolio-table td {
    padding: 12px 15px;
  }

  .portfolio-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .portfolio-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .portfolio-table tbody tr:nth-of-type(odd) {
    background-color: rgb(223, 219, 219);
  }

  .portfolio-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .h3 {
    font-size: 1.25em;
  }

  .higher {
    color: red;
    text-decoration: underline;
  }

  .lower {
    color: green;
  }


</style>