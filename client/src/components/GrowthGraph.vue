<template>
  <div id="growth-graph">
      GRAPH
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
                ["Yes", 10, 30]
            ],
            chartOptions: {
                chart: {
                    Title: "Investment Performance",
                },
            },
        }
    },
    props: ["shareSummary", "portfolio"],
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
        }
    },
    mounted(){
        this.getTotalInvestedValue(this.shareSummary.symbol);
    }
}
</script>

<style>

</style>