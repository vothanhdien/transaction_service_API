/**
 * Created by HP on 17/11/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Transaction  = new Schema({
    sender : {type: String},
    receiver : {type: String},
    value: {type:Number}
});

module.exports = mongoose.Schema("Transaction",Transaction);