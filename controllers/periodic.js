
const User = require('../models/user').User;
const Ticker = require('../models/ticker').Ticker;
const config = require('../config/config');

module.exports = async function(userId, tickerId) {
    console.log(`Handler for ${userId} about ${tickerId}`);
    const timerId = setInterval(
        () => {
            User.findById(userId).then(
                (user) => {
                    Ticker.findById(tickerId).then(
                        (ticker) => {
                            console.log(`${(new Date()).toISOString()} | Привет ${user.name}! Стоимость акции ${ticker.name} увеличилась на 20% и достигла стоимости ${ticker.price * 1.2}`);
                            /*
                            Если бы было надо - просто раскомментируем эти строки и будет ещё и менять в БД
                            ticker.price *= 1.2;
                            ticker.save();
                            */
                        }
                    ).catch(
                        (error) => {
                            clearInterval(timerId);
                        }
                    )
                }
            ).catch(
                (error) => {
                    clearInterval(timerId);
                }
            )
        }
    , config.PERIOD * 1000)
}