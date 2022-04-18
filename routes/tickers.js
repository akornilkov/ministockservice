var express = require('express');
var router = express.Router();

const {verifyUserToken, IsUser, IsAdmin} = require('../controllers/middleware');
const Ticker = require('../models/ticker').Ticker;

// Auth user only
router.get('/', verifyUserToken, async (req,res) => {
    const tickers = await Ticker.find({});
    if (tickers) {
        res.status(200).json(tickers);
    } else {
        res.status(404).json({"error": "No tickers in DB"});
    }
});

router.get('/:tickerId', verifyUserToken, async (req,res) => {
    const ticker = await Ticker.findByID(req.params.tickerId);
    if (ticker) {
        res.status(200).json(ticker);
    } else {
        res.status(404).json({"error": "No tickers in DB"});
    }
});


/* ONLY ADMIN CAN ADD NEW TICKERS */
router.post('/', verifyUserToken, IsAdmin, async (req,res) => {
    const {name, price} = req.body;
    if (!name || !price) {
        res.status(400).json({"error": "wrong parameters in body"});
    } else {
        const result = Ticker.create(req.body);
        res.status(201).json(result);
    }
});

module.exports = router;