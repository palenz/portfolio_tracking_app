<template lang="html">

  <div>  
  
      <h2>Share Performance Chart</h2>

    <div v-if='stockData'>
      <p></p>
      <GChart
        type="LineChart"
        :data="shareChartData"
        :options="chartOptions"
      />
    </div>
  </div>

</template> 

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "chart-item",

  components: {
    GChart,
  },

  data() {
    return {
      shareChartData: null,
      stockData: null,
      chartOptions: {
        chart: {
          Title: "Share Performance",
          subtitle: "Last Quarter Daily Closing Price",
        },
        vAxis: {
          title: "US Dollars ($)"
          },
        hAxis: {
          title: 'date',
        },
      },
    };
  },

  props: ["stockLimitedPerformance"],

  methods: {
    populateChartData: function () {
      const headers = ["date"]
      headers.push(this.stockLimitedPerformance["ticker"])

      const reversedPrices = []
      for (let share of this.stockLimitedPerformance["performance"]) {
        let number = Object.values(share)
        reversedPrices.push(number)
      }

      const prices = reversedPrices.reverse();

      prices.unshift(headers)
      this.shareChartData = prices

    },
  },

  watch:{
    stockLimitedPerformance: function() {
      this.stockData = this.stockLimitedPerformance;
      this.populateChartData()
    }
  },

};
</script>

<style lang="css" scoped>
</style>