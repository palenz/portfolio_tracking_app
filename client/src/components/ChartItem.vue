<template lang="html">

  <div v-if="portfolioLimitedPerformance">  
  
      <h2>Share Performance Chart</h2>

      <input type="button" value="Chart" v-on:click="populateChartData"/>

      <GChart
        type="LineChart"
        :data="shareChartData"
        :options="chartOptions"
      />

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
      shareChartData: [],



      chartOptions: {
        chart: {
          Title: "Share Performance",
          subtitle: "Last Quarter Daily Closing Price",
        },
      },
    };
  },

  props: ["portfolioLimitedPerformance"],

  methods: {
    populateChartData: function () {
      const headers = ["date"]
      headers.push(this.portfolioLimitedPerformance[0]["ticker"])

      const prices = []
      for (let share of this.portfolioLimitedPerformance[0]["performance"]) {
        let number = Object.values(share)
        prices.push(number)
      }

      prices.unshift(headers)

      this.shareChartData = prices

      console.log(prices)


    },
  },

  mounted() {
  },
};
</script>

<style lang="css" scoped>
</style>