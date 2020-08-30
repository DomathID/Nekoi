
const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.json");

module.exports = mongoose.model("Guild", new Schema({
    id: { type: String }, 
    registeredAt: { type: Number, default: Date.now() }, 
    prefix: { type: String, default: config.prefix },
}));
