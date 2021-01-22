use shares_portfolio
db.dropDatabase();

db.portfolio.insertOne({name: "Juan", portfolioValue: 10000});
db.portfolio.insertMany([
    {
        symbol: "KO",
        valueAtPurchase: 48.9500,
        shares: 30,
        dateOfPurchase: "2021-01-21"
    },
    {
        symbol: "TWTR",
        valueAtPurchase: 47.1200,
        shares: 20,
        dateOfPurchase: "2021-01-21"
    },
    {
        symbol: "NFLX",
        valueAtPurchase: 579.8400,
        shares: 5,
        dateOfPurchase: "2021-01-21"
    },

])
