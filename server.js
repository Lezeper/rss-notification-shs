var express = require('express');
var app = express();

app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res){
    res.sendFile("index.html");
});

var FeedSub = require('feedsub');
var rssMap = new Map();
var urls = [
    'http://rss.cnn.com/rss/cnn_latest.rss',
    'https://www.uscreditcardguide.com/en/feed/',
    'http://lorem-rss.herokuapp.com/feed'
];

var runRSSSubServer = function(urls) {
    urls.forEach(function(url){
        var feedSub = new FeedSub(url, {
            interval: 1,
            emitOnStart: true,
            forceInterval: true,
            autoStart: true 
        });
        feedSub.on('item', function(item) {
            console.dir(item.title);
        });
        rssMap.set(url, feedSub);
    });
}

var stopRSSSubServer = function(urls) {
    urls.forEach(function(url){
        rssMap.get(url).stop();
    });
}

runRSSSubServer(urls);


app.listen(8123);
console.log("Server stated")