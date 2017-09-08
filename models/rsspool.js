var mongoose = require('mongoose');

var rssPool = new mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RssContent' }],
	created: {
		type: Date,
		default: new Date(),
		required: true
	},
});

mongoose.model('RssPool', rssPool);