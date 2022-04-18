const mongoose = require('../controllers/db').getMongoose();

const TickerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 100
    }
});

TickerModel = mongoose.model('tickers', TickerSchema);

module.exports = {
    Ticker : TickerModel,
    TickerSchema : TickerSchema,
}