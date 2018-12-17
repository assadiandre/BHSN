var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
     id: String,
     category: String,
     header: String,
     shortdescription: String,
     longdescription: String
});


module.exports = mongoose.model("SportPost",postSchema);
