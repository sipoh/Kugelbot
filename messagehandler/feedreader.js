var FeedParser = require('node-feedparser')
    , fs = require('fs')
    , feed = 'https://www.tagesschau.de/xml/rss2';

fs.createReadStream(feed)
    .on('error', function (error) {
        console.error(error);
    })
    .pipe(new FeedParser())
    .on('error', function (error) {
        console.error(error);
    })
    .on('meta', function (meta) {
        console.log('===== %s =====', meta.title);
    })
    .on('readable', function() {
        var stream = this, item;
        while (item = stream.read()) {
            console.log('Got article: %s', item.title || item.description);
        }})