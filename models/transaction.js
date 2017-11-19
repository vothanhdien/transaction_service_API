/**
 * Created by HP on 17/11/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Transaction  = new Schema({
    sender : {type: String , require: true},
    receiver : {type: String,require: true},
    value: {type: Number, require: true},
    time: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction",Transaction);