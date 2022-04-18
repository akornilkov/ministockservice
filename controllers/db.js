const mongoose = require('mongoose');
const config = require('../config/config');

const defaults = {
    url: config.DB_HOST,
    retryMaxCount: 10,
    retryPeriod : 5,
    mongooseOptions : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
}

class MongooseService {
    constructor({url,retryMaxCount,retryPeriod}) {
        this.count = 0;
        this.url = (url) ? (url) : (defaults.url);
        this.retryMaxCount = (retryMaxCount) ? (retryMaxCount) : (defaults.retryMaxCount);
        this.retryPeriod = (retryPeriod) ? (retryPeriod) : (defaults.retryPeriod);
        this.mongooseOptions = defaults.mongooseOptions;
        console.log('===========Connecting to MongoDB===========');
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        const service = this;
        console.log('Attempting MongoDB connection (will retry if needed)');
        let retrySeconds = service.retryPeriod;
        mongoose
            .connect(service.url, service.mongooseOptions)
            .then(() => {
                console.log('===========Connected to MongoDB===========');
            })
            .catch((err) => {
                if (service.count != service.retryMaxCount) {
                    console.log(
                        `MongoDB connection unsuccessful (will retry #${++service
                            .count} after ${retrySeconds} seconds):`,
                        err
                    );
                    setTimeout(service.connectWithRetry, retrySeconds * 1000);
                } else {
                    throw new Error(`MongoDB connection unsuccessful (retried ${++service.count} times after ${retrySeconds} seconds each): ${err}`);
                }
            });
    };
}

module.exports = new MongooseService(defaults);