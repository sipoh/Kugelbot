var merke = false,
    bot;

var callback = function(msg){
    console.log(msg);
    var text = msg.text;
    var antwort;
    var option;
    switch(text.toLowerCase()) {
        case '/fick dich':
            antwort = 'Hier und jetzt? Nee. Lieber nicht.';
            break;
        case ('/ja@kugel_bot'):
            antwort = 'Okay';
            break;
        case '/start':
            antwort = 'Hallo. Ich bin der Kugelbot.';
            break;
        case 'ja':
        case 'jop':
        case 'jo':
        case 'jap':
        case 'genau':
            if (merke) {
                antwort = 'Okay';
                merke = false;
                break;
            };
        default:
            //antwort = 'Hast du gerade ' + text + ' gesagt?';
            merke = true;
    }
    option = {reply_to_message_id: msg.message_id};
    bot.sendMessage(msg.chat.id, antwort, option);
};

module.exports = function(kugelbot) {
    bot = kugelbot;
    bot.on('text', callback);
};