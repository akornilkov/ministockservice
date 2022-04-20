const Ticker = require('../models/ticker').Ticker;

//Apple, Tesla, Google, Alibaba, Adobe

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const tempTickers = [
    {
        "name": "Apple",
        "count": 100,
        "price": randomIntFromInterval(100,1000)/100
    },
    {
        "name": "Tesla",
        "count": 100,
        "price": randomIntFromInterval(100,1000)/100
    },
    {
        "name": "Google",
        "count": 100,
        "price": randomIntFromInterval(100,1000)/100
    },
    {
        "name": "Alibaba",
        "count": 100,
        "price": randomIntFromInterval(100,1000)/100
    },
    {
        "name": "Adobe",
        "count": 100,
        "price": randomIntFromInterval(100,1000)/100
    },
]

module.exports = () => {
    Ticker.deleteMany();
    Ticker.insertMany(tempTickers,(error) => {
        console.log(error);
    })
}