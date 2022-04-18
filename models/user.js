const mongoose = require('../controllers/db').getMongoose();

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false,
    },
    user_type_id: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    package: {
        type: Map,
        of: {
            amount: {
                type: Number
            },
            last_update_dt: {
                type: Date,
                default: Date.now
            }
        },
        default: {}
    }
});

UserSchema.methods.addTickers = function(tickerId, amount) {
    if (tickerId in this.package) {
        this.package[tickerId].amount = this.package[tickerId].amount + amount;
    } else {
        this.package[tickerId] = {amount};
    }
    this.package[tickerId].last_update_dt = Date.now();
};

const UserModel = mongoose.model('users', UserSchema, 'users');
module.exports = {
    User : UserModel,
    UserSchema : UserSchema,
}