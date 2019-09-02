var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const articleModel = new Schema({
    title: { type: String   },
    author: { type: String },
    data: { type: String },
    genre: { type: String },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})
module.exports =mongoose.model('article', articleModel)