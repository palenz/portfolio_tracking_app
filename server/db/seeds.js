use shares_portfolio
db.dropDatabase();

db.portfolio.insertOne({name: "Juan", totalCash: 10000});
db.portfolio.insertMany([
    {
        symbol: "AAPL",
        valueAtPurchase: 128.61,
        shares: 20,
        dateOfPurchase: "2021-01-20"
    },
    {
        symbol: "AAPL",
        valueAtPurchase: 133.82,
        shares: 5,
        dateOfPurchase: "2021-01-21"
    },
    {
        symbol: "AAPL",
        valueAtPurchase: 136.26,
        shares: 10,
        dateOfPurchase: "2021-01-22"
    },
    {
        symbol: "AAPL",
        valueAtPurchase: 143.01,
        shares: 5,
        dateOfPurchase: "2021-01-25"
    },
    {
        symbol: "AAPL",
        valueAtPurchase: 143.38,
        shares: 5,
        dateOfPurchase: "2021-01-26"
    },

    {
        symbol: "MSFT",
        valueAtPurchase: 217.76,
        shares: 10,
        dateOfPurchase: "2021-01-20"
    },
    {
        symbol: "MSFT",
        valueAtPurchase: 223.28,
        shares: 5,
        dateOfPurchase: "2021-01-21"
    },
    {
        symbol: "MSFT",
        valueAtPurchase: 227.24,
        shares: 15,
        dateOfPurchase: "2021-01-22"
    },
    {
        symbol: "MSFT",
        valueAtPurchase: 227.38,
        shares: 30,
        dateOfPurchase: "2021-01-25"
    },
    {
        symbol: "MSFT",
        valueAtPurchase: 231.76,
        shares: 10,
        dateOfPurchase: "2021-01-26"
    },

])
