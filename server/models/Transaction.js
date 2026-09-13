const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ['income', 'expense'],
        required: true
        // we only need two fields since, we are either generating/losing money.
        // the 'required: true' means mongoose will reject saving a transaction if this is missing.
    },
    amount: {
        type: Number,
        required: true
        // # of currency
    },
    category: {
        type: String,
        required: true
        // specifies the product/service such as food/transportation
    },
    description: {
        type: String,
        default: ''
        // works as optional text in case it's needed by user.
    },
    date: {
        type: Date,
        default: Date.now
        // time of transaction that deafults to time of use if no time is provided.
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
// this turns my schema into a usable "Model". Moongoose will
// automatically create a collection in MongoDB called transactions
// whenever I first save something.