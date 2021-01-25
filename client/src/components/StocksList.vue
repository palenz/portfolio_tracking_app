<template lang="html">
  <div id="stocks-list">

    <div id="transaction-history">
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
          <tr class="table-row" v-for='share in sharesList'>
            <td>{{share.symbol}}</td>
            <td>{{share.shares}}</td>
            <td>{{share.valueAtPurchase}}</td>
            <td>{{share.dateOfPurchase}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if='sharesList.length > 0'id="portfolio-summary">
      <h3>Portfolio Summary</h3>
      <table class="port-table">
        <thead class="port-table-header">
          <tr>
            <th>Ticker</th>
            <th>Number of Shares</th>
          </tr>
        </thead>
        <tbody>
          <tr class="port-table-row" v-for='share in sharesSummary'>
            <td>{{share.symbol}}</td>
            <td>{{share.shares}}</td>
          </tr>
        </tbody>
      </table>

      <!-- <ul>
        <li v-for='share in sharesSummary'>
          <p>{{share.symbol}}: {{share.shares}} shares </p>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "stocks-list",
  props: ['portfolio'],

  computed: {
    sharesList: function () {
      return this.portfolio.filter(function (item) {
        return !item.name 
      } )
    },

    sharesSummary: function() {
      // new array to push to
      const sharesSummary = [];
      
      // Push first object to sharesSummary to allow looping
      sharesSummary.push({
            symbol: this.sharesList[0].symbol,
            shares: this.sharesList[0].shares
          });
      // loop through this.sharesList
      for (let i = 1; i < this.sharesList.length; i++) {
        let pushShare = true;
        // loop through existing items in sharesSummary
        for (let j of sharesSummary) {
          // if symbol exists, add shares
          if (j.symbol === this.sharesList[i].symbol) {
            j.shares += this.sharesList[i].shares;
            pushShare = false;
          } 
        };
        // if symbol does not exist (appendShare = false), add symbol and shares
        if (pushShare) {
          sharesSummary.push({
            symbol: this.sharesList[i].symbol,
            shares: this.sharesList[i].shares
          })
        }
      };
      return sharesSummary;
    }
  }

};
</script>

<style lang="css" scoped>
  #stocks-list {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
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

  .table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .port-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .port-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }
  .port-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .port-table th,
  .port-table td {
    padding: 12px 15px;
  }

  .port-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .port-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .port-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

</style>