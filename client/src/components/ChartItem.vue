<template lang="html">

  <div>  
  
      <h2>Share Performance Chart</h2>

    <div v-if='stockData'>
      <p></p>
      <GChart
        type="AreaChart"
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
          title: "US Dollars ($)",
          format: 'currency',
          gridlines: {color: '#CCC', minSpacing: 10, count: -1},
          textStyle: {fontSize: 12}
          },
        hAxis: {
          title: "Last Quarter Daily Closing Price",
          showTextEvery: 10,
          slantedText: false,
          textStyle: {fontSize: 10},
        },
        
        legend: {
          position: 'top'
        },

        chartArea: {
          width: '80%',
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