const apistockdata =
    {
        "ticker": "KO",
        "performance": {
            "2021-01-10": 20,
            "2021-01-11": 22,
            "2021-01-12": 24,
            "2021-01-13": 26,
            "2021-01-14": 22
        }}

// console.log(apistockdata[1]["ticker"]);


const headers = ["date"]
headers.push(apistockdata["ticker"])

const chartData = Object.entries(apistockdata["performance"])
chartData.unshift(headers)


console.log(chartData)