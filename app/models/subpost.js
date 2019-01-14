var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subPostSchema = new Schema({
     message: String,
     category_id: String
});


module.exports = mongoose.model("SubPost",subPostSchema);
