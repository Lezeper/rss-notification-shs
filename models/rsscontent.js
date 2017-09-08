var mongoose = require('mongoose');

var rssContent = new mongoose.Schema({
	rss: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RssPool',
		required: true
  },
  title: {
    type: String,
		required: true
  },
  content: {
    type: String,
		required: true
  },
  url: {
    type: String,
		required: true
  },
	created: {
    type: Date,
    default: new Date(),
		required: true
	},
});

mongoose.model('RssContent', rssContent);