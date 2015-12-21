rsj = require('rsj');

rsj.r2j('https://www.tagesschau.de/xml/rss2',function(json) { console.log(json);});

exports.r2j = r2j;

var FeedParser = require('feedparser');
parser = new FeedParser();

module.exports = function (uri, cb) {
    parser.parseUrl(uri, function (err, meta, articles) {
        if (err) return console.error(err);
        cb(JSON.stringify(articles));
    });
};

