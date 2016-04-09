var fs = require('fs'),
    token = fs.readFileSync('./token.txt', 'utf8').split('\n')[0],
    telegrambot = require('node-telegram-bot-api'),
    kugelbot = new telegrambot(token, {
        polling: true
    });

require('./messagehandler/onText')(kugelbot);
require('./messagehandler/onPhoto')(kugelbot);
require('./messagehandler/onSticker')(kugelbot);

//{ message_id: 5,
//    from:
//    { id: 1243,
//        first_name: 'fn',
//        last_name: 'ln',
//        username: 'un' },
//    chat:
//    { id: 123,
//        first_name: 'fn',
//        last_name: 'ln',
//        username: 'un',
//        type: 'private' },
//    date: 1450634718,
//        text: 'Okäse' }