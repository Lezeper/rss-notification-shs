var mongoose = require('mongoose');

var user = new mongoose.Schema({
	rss: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RssPool' }],
	unread: [{ type: mongoose.Schema.Types.ObjectId }],
	created: {
		type: Date,
		default: new Date(),
		required: true
	},
});

mongoose.model('User', user);