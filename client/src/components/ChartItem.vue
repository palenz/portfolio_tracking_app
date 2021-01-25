<template lang="html">
  <div>
<div>
  
  <h2>Share Performance Chart</h2>

  <GChart
    type="LineChart"
    :data="chartData"
    :options="chartOptions"
  />
    

</div>
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
      chartData: [
  [ 'date', 'KO' ],
  [ '2021-01-10', 20 ],
  [ '2021-01-11', 22 ],
  [ '2021-01-12', 24 ],
  [ '2021-01-13', 26 ],
  [ '2021-01-14', 22 ]
],
      chartOptions: {
        chart: {
          Title: 'Share Performance',
          subtitle: 'Last Quarter Daily Closing Price'
        }
      }  
  }
},
}

</script>

<style lang="css" scoped>
</style>