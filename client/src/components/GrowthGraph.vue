<template>
  <div id="growth-graph">
      <h4>Your investment has changed by {{investmentGrowth}}%</h4>
      <div v-if="shareSummary">
        <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
        />
      </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
    name: "growth-graph",
    components: {
        GChart,
    },
    data(){
        return{
            currentTotalShareValue: this.shareSummary.latestPrice * this.shareSummary.shares,
            investedTotalShareValue: null,
            chartData: [
                ["Test", "Axis", "Axis2"],
                ["Yes", 10.00, 30.00]
            ],
            chartOptions: {
                title: 'Investment Performance',
                colors: ["blue", "red"],
                vAxis: {format: 'currency'},
                legend: {position: 'top'}
            },
        }
    },
    props: ["shareSummary", "portfolio"],
    computed: {
        investmentGrowth: function() {
            let growth = (this.currentTotalShareValue - this.investedTotalShareValue) / this.investedTotalShareValue * 100;
            return parseFloat(growth.toFixed(2));
        }
    },
    methods: {
        getTotalInvestedValue: function(symbol){
            const filterPortfolio = this.portfolio.filter((share) => {
                return share.symbol === symbol;
            })
            let totalValue = 0;
            for (let share of filterPortfolio){
                totalValue += share.valueAtPurchase * share.shares;
            }
            this.investedTotalShareValue = parseFloat(totalValue.toFixed(2));
            console.log('mounted')
        },
        populateChartData: function(){
            const chartData = [];
            const headers = ["Comapny", "Invested ($)", "Current Investment Value ($)"]
            const values = [this.shareSummary.symbol, this. investedTotalShareValue, this.currentTotalShareValue]
            chartData.push(headers);
            chartData.push(values);
            this.chartData = chartData
        }   
    },
    mounted(){
        this.getTotalInvestedValue(this.shareSummary.symbol);
        this.populateChartData();
    }
}
</script>

<style>

</style>