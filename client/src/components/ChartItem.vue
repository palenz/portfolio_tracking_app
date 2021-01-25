<template lang="html">

  <div v-if="portfolioLimitedPerformance">  
  
      <h2>Share Performance Chart</h2>

      <GChart
        type="LineChart"
        :data="shareChartData"
        :options="chartOptions"
      />

  </div>

</template> 

<script>

import { GChart } from 'vue-google-charts';

export default {
  name: "chart-item",

  components: {
    GChart
  },

  data() {
    return {
      shareChartData: [],
//   [ 'date', 'KO' ],
//   [ '2021-01-10', 20 ],
//   [ '2021-01-11', 18 ],
//   [ '2021-01-12', 24 ],
//   [ '2021-01-13', 26 ],
//   [ '2021-01-14', 22 ]
// ],
      chartOptions: {
        chart: {
          Title: 'Share Performance',
          subtitle: 'Last Quarter Daily Closing Price'
        }
      }  
  }
},

props: ['portfolioLimitedPerformance'],

computed: {
  shareChartData: function() {
    const chartData = []

    const headers = ["date"]
    headers.push(portfolioLimitedPerformance["ticker"])

    const shareChartData = Object.entries(portfolioLimitedPerformance["performance"])
    shareChartData.unshift(headers)

    return chartData
  }
},
}

</script>

<style lang="css" scoped>
</style>