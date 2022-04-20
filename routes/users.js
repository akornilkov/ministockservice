var express = require('express');
var router = express.Router();

const {verifyUserToken, IsUser, IsAdmin} = require('../controllers/middleware');
const User = require('../models/user').User;
const Ticker = require('../models/ticker').Ticker;

const periodicHandler = require('../controllers/periodic');

/* ALL USER`s TICKER COLLECTION  */

router.get('/collection', verifyUserToken, (req,res) => {
    User.findById(req.user.id).then(
        (user) => {
            res.status(200).json(user.package);
        }
    ).catch(
        (error) => {
            res.status(500).json(error);
        }
    );
});

router.post('/collection', verifyUserToken, (req,res) => {
    const nowHours = (new Date()).getHours();
    if (nowHours < 10 || nowHours > 22) {
        res.status(403).json({
            "error": "Stock is closed from 23:00 till 10:00"
        })
    } else {
        const {tickerId, count_tickers} = req.body;
        User.findById(req.user.id).then(
            (user) => {
                Ticker.findById(tickerId).then(
                    async (ticker) => {
                        if (ticker.count >= count_tickers) {
                            ticker.count -= count_tickers;
                            let tickerPackage = user.package.get(tickerId);
                            if (tickerPackage) {
                                tickerPackage.amount += count_tickers;
                                tickerPackage.last_update_dt = new Date();
                                user.package.set(tickerId, tickerPackage);
                            } else {
                                user.package.set(tickerId, {
                                    amount: count_tickers,
                                    last_update_dt: new Date(),
                                });
                            }
                            await ticker.save();
                            const result = await user.save();
                            await periodicHandler(user.id, ticker.id);
                            return res.status(200).json(result.package);
                        } else {
                            return res.status(403).json({
                                "error": `There is only ${ticker.count} of ${ticker.name} in Stock, but you asked to withdraw ${count_tickers}`
                            })
                        }
                    }
                ).catch(
                    (error) => {
                        res.status(500).json(error);
                    }
                )
            }
        ).catch(
            (error) => {
                res.status(500).json(error);
            }
        );
    }
});

/* CONCRETE TICKER */

router.get('/collection/:tickerId', verifyUserToken, async (req,res) => {
    User.findById(req.user.id).then(
        async (user) => {
            const result = user.package.get(req.params.tickerId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({"error": `Ticker with id ${req.params.tickerId} was not found on your collection`})
            }
        }
    ).catch(
        (error) => {
            res.status(500).json(error);
        }
    );
});

router.delete('/collection/:tickerId', verifyUserToken, async (req,res) => {
    User.findById(req.user.id).then(
        async (user) => {
            user.package.delete(req.params.tickerId);
            await user.save();
            res.status(204).end();
        }
    ).catch(
        (error) => {
            res.status(500).json(error);
        }
    );
});

module.exports = router;