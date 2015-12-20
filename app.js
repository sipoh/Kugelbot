var fs = require('fs'),
    token = fs.readFileSync('./token.txt', 'utf8'),
    telegrambot = require('node-telegram-bot-api'),
    bot = new telegrambot(token, {
        polling: true
    });

bot.on('message', function(msg){
    console.log(msg);
});
