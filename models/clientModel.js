var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var clientSchema = new Schema({
	'reference' : String
});

module.exports = mongoose.model('client', clientSchema);
