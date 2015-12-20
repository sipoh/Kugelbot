var fs = require('fs'),
    token = fs.readFileSync('./token.txt', 'utf8'),
    telegrambot = require('node-telegram-bot-api'),
    kugelbot = new telegrambot(token, {
        polling: true
    });

require('./messagehandler/onMessage')(kugelbot);
require('./messagehandler/onPhoto')(kugelbot);


//{ message_id: 5,
//    from:
//    { id: 40122147,
//        first_name: 'Simon',
//        last_name: 'Pohlmann',
//        username: 'SimonPohlmann' },
//    chat:
//    { id: 40122147,
//        first_name: 'Simon',
//        last_name: 'Pohlmann',
//        username: 'SimonPohlmann',
//        type: 'private' },
//    date: 1450634718,
//        text: 'Okäse' }