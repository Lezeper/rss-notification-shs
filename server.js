var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname + "/public"));

app.use(function(req, res){
    res.sendFile(__dirname + "/app/index.html");
});

var firstRun = true;
var FeedSub = require('feedsub');
var rssMap = new Map();
var urls = [
    // 'http://rss.cnn.com/rss/cnn_latest.rss',
    // 'https://www.uscreditcardguide.com/en/feed/',
    'http://lorem-rss.herokuapp.com/feed?unit=second&interval=30'
];

io.on('connection', function(socket){
    console.log("user connected");
    var runRSSSubServer = function(urls) {
        urls.forEach(function(url){
            var feedSub = new FeedSub(url, {
                interval: 1,
                emitOnStart: true,
                forceInterval: true,
                autoStart: true 
            });
            feedSub.on('items', function(items) {
                if(!firstRun) {
                    io.emit("new contents", items);
                }
                firstRun = false;
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

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('delete notify', function(index){
        newContentList.splice(index, 1);
    });
});

http.listen(8123);
console.log("Server stated")