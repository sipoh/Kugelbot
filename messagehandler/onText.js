var bot,
    feed   = require('feed-read'),  // require the feed-read module
    moment = require('moment'),
    irc    = require('irc'),
    url    = ['https://www.tagesschau.de/xml/rss2', 'www.tagesschau.de']; // RSS Feed
var client = new irc.Client('irc.hamburg.ccc.de', 'Nodebot', {
    autoConnect: false,
    username:    'Nodebot',
    channels:    ['#+Punkt']
});
var ircstatus = false;

var ausgabe = function(req, msg, ausgabe_text) {
    console.log(req);
    // fetch rss feed for the url:
    feed(req[0], function(err, articles) {
        //Set amount of articles to be listed.
        var max;
        if(articles.length > 5) {
            max = 5;
        }
        else {
            max = articles.length;
        }
        // loop through the list of articles returned
        for(var i = 0; i < max; i++) {
            // stream article title (and what ever else you want) to client
            //console.log(articles[i]);
            //ausgabe_text.push(articles[i].title);
            //bot.sendMessage(msg.chat.id, articles[i].title);
            ausgabe_text = ausgabe_text + '[' + articles[i].title + '](' + articles[i].link + ')\n';
            console.log(ausgabe_text);
        } //  end inner for loop
        //ausgabe_text = ausgabe_text + '\n' + req[1];
        options = { parse_mode: 'Markdown' };
        bot.sendMessage(msg.chat.id, ausgabe_text, options);
    }); // end call to feed (feed-read) method
};

var busabfrage = function(busstop, msg, cb) {
    var busstoplist = [
        { 'mastid': '4545102', 'shortname': '13er Str', 'name': 'Dreizehnerstraße' },
        { 'mastid': '4100002', 'shortname': 'Hbf', 'name': 'Hauptbahnhof B1' }
    ];
    var busstopprint;
    for(var i in busstoplist) {
        if(busstoplist[i].mastid == busstop) {
            busstopprint = busstoplist[i].shortname;
        }
    }
    if(busstopprint) {
        var antwort = '*FISMS*\n' +
            'Die nächsten Busse ab Haltestelle ' + busstopprint + '\n';
        options = { parse_mode: 'Markdown' };
        bot.sendMessage(msg.chat.id, antwort, options);
    }
    else {
        var options = { reply_to_message_id: msg.message_id };
        bot.sendMessage(msg.chat.id, 'Keine Busse gefunden', options);
    }

    cb = antwort;
};

var callback = function(msg) {
    console.log(msg);
    var text = msg.text.split('@kugel_bot');
    console.log('text: ' + text);
    var command = text[0].split('-');
    console.log('command 0: ' + command[0]);
    console.log('command 1: ' + command[1]);
    console.log('command 2: ' + command[2]);
    var antwort;
    var options;
    switch(command[0].toLowerCase()) {
        case '/fick dich':
            antwort = 'Hier und jetzt? Nee. Lieber nicht.';
            options = { reply_to_message_id: msg.message_id };
            bot.sendMessage(msg.chat.id, antwort, options);
            break;
        //case ('/ja@kugel_bot'):
        case '/ja':
            antwort = 'Okay';
            options = { reply_to_message_id: msg.message_id };
            bot.sendMessage(msg.chat.id, antwort, options);
            break;
        case '/start':
            antwort = 'Hallo. Ich bin der Kugelbot.';
            options = { reply_to_message_id: msg.message_id };
            bot.sendMessage(msg.chat.id, antwort, options);
            break;
        case '/tagesschau':
            //case '/tagesschau@kugel_bot':
            var ausgabe_text = '*Die fünf neusten Beiträge auf* [Tagesschau.de](www.tagesschau.de) *heißen*: \n \n';
            ausgabe(url, msg, ausgabe_text);
            break;
        case '/troj':
            switch(command[1].toLowerCase()) {
                case 'uni':
                    antwort = 'http://trojmiasto.jakdojade.pl/?apv=train&as=true&apl=122&aro=1&t=2&fn=hestii&tn=bazynskiego';
                    break;
                case 'heim':
                    antwort = 'http://trojmiasto.jakdojade.pl?fn=54%C2%B023\'57%22%2C+18%C2%B034\'18%22&fs=&fsc=&fc=54.39944:18.5719&tn=Hestii+&ts=Hestii+&tsc=&tc=54.43195:18.58374&ia=false&t=2&n=0&ri=0&as=true&apl=122&apv=train&aro=1';
                    break;
                default:
                    antwort = 'http://trojmiasto.jakdojade.pl/?as=true&aro=1&t=2&fn=' + command[1] + '&tn=' + command[2];
                    break;
            }
            bot.sendMessage(msg.chat.id, antwort);
            break;
        case '/irc':
            switch(command[1].toLowerCase()) {
                case 'start':
                    client.connect();
                    //console.log('test0');
                    //require('irc_test')(client);
                    //console.log('test1');
                    client.addListener('registered', function(message) {
                        console.log(message);
                        antwort = message.server + ': ' + message.args[1];
                        bot.sendMessage(msg.chat.id, antwort);
                    });
                    client.addListener('error', function(message) {
                        console.log('error: ', message);
                        fs.writeFile('../log.txt', message + '\n', function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });
                    });
                    client.addListener('invite', function(channel, from) {
                        options = {
                            reply_markup: JSON.stringify({
                                keyboard:          [['/irc-join-' + channel, 'Cancel']],
                                one_time_keyboard: true,
                                resize_keyboard:   true,
                                force_reply:       true
                            })
                        };
                        bot.sendMessage(msg.chat.id, 'Einladung in den Kanal ' + channel + ' von ' + from + ' erhalten.', options);
                    });
                    ircstatus = true;
                    break;
                case 'listen':
                    if(ircstatus) {
                        antwort = 'IRC hört';
                        bot.sendMessage(msg.chat.id, antwort);
                        client.addListener('message', function(from, to, message) {
                            antwort = from + ' => ' + to + ': ' + message;
                            console.log(antwort);
                            bot.sendMessage(msg.chat.id, antwort);

                            require('./test2')(bot, client, from, to, message);

                        });
                    }
                    else {
                        return console.log('Fehler');
                    }
                    break;
                case 'join':
                    if(ircstatus) {
                        antwort = 'Okay';
                        client.join(command[2].toLowerCase());
                        bot.sendMessage(msg.chat.id, antwort);
                    }
                    break;
                case 'part':
                    antwort = 'Okay';
                    client.part(command[2].toLowerCase());
                    bot.sendMessage(msg.chat.id, antwort);
                    break;
                case 'say':
                    antwort = 'Okay';
                    client.say(command[2].toLowerCase(), command[3]);
                    bot.sendMessage(msg.chat.id, antwort);
                    break;
                case 'stop':
                    antwort = 'IRC getrennt';
                    var reason = toString('@' + msg.from.username + ' via telegram');
                    console.log(reason);
                    client.disconnect(reason);
                    options = { reply_to_message_id: msg.message_id };
                    bot.sendMessage(msg.chat.id, antwort, options);
                    break;
            }
            break;
        case '1337':
            var msgTime = moment.unix(msg.date),
                time    = parseInt(msgTime.format('HHmm'));

            if(time === 1337) {        // 1337
                antwort = '1337';
            } else if(time < 1337) {  // zu früh
                antwort = 'Zu früh.';
            } else {                   // zu spät
                antwort = 'Zu spät.';
            }

            options = { reply_to_message_id: msg.message_id };
            bot.sendMessage(msg.chat.id, antwort, options);
            break;
        case 'bus hbf':
            busabfrage('4100002', msg, function(cb) {
                console.log(cb);
            });
            break;
        case 'gute nacht':
        case 'gute nacht!':
        case 'gute n8':
        case 'good night':
        case 'good night!':
        case 'good n8':
            bot.sendSticker(msg.chat.id, 'BQADAwADrQIAAqbJWAABfU1XyeWYp6gC');
            break;
    }
};

module.exports = function(kugelbot) {
    bot = kugelbot;
    bot.on('text', callback);
};