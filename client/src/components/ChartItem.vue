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
      shareChartData: [
        // ["date", "KO"],
        // ["2021-01-10", 20],
        // 2021-01-10: 20
        // date: 2021-01-10, price: 20
        // ["2021-01-11", 18],
        // ["2021-01-12", 24],
        // ["2021-01-13", 26],
        // ["2021-01-14", 22],
      ],


      // portfolioLimitedPerformance: [
      //   {
      //     performance: [
      //       {
      //         date: "2021-01-25",
      //         price: 142.9200
      //       },
      //       {
      //         date: "2021-01-26",
      //         price: 143.9200
      //       },
      //       {
      //         date: "2021-01-27",
      //         price: 122.9200
      //       },
      //     ],
      //     ticker: "AAPL"
      //   }
      // ]

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


      // companyData = this.portfolioLimitedPerformance[0]
      // console.log(this.portfolioLimitedPerformance[0]);
      // const headers = ["date"];
      // headers.push(this.portfolioLimitedPerformance[0]["ticker"]);

      // const chartData = Object.entries(
      //   this.portfolioLimitedPerformance[0]["performance"]
      // );
      // chartData.unshift(headers);

      // this.shareChartData = chartData;

      // console.log(chartData);
    },
  },

  mounted() {
    // this.populateChartData();
  },
};
</script>

<style lang="css" scoped>
</style>