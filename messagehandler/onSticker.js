var bot;


var callback;
callback = function (msg) {
    console.log(msg);
    //console.log(ausgabe_text);
    var antwort = 'Hihi. Der ist ja witzig.';
    //var antwort = ausgabe_text;
    bot.sendMessage(msg.chat.id, antwort);
};

module.exports = function(kugelbot) {
    bot = kugelbot;
    bot.on('sticker', callback);
};


//{ message_id: 367,
//    from:
//    { id: 1234,
//        first_name: 'fn',
//        last_name: 'ln',
//        username: 'un' },
//    chat:
//    { id: 1234,
//        first_name: 'fn',
//        last_name: 'ln',
//        username: 'un',
//        type: 'private' },
//    date: 1450639447,
//        photo:
//    [ { file_id: 'AgADAgADAqgxGyM3ZAL5EFkjxK-6BqvygioABKaj-RSMGNxlhHMAAgI',
//        file_size: 1326,
//        width: 90,
//        height: 60 },
//        { file_id: 'AgADAgADAqgxGyM3ZAL5EFkjxK-6BqvygioABHNNsMrlhrbDg3MAAgI',
//            file_size: 12663,
//            width: 320,
//            height: 213 },
//        { file_id: 'AgADAgADAqgxGyM3ZAL5EFkjxK-6BqvygioABAsfQa4tF7V9gnMAAgI',
//            file_size: 36566,
//            width: 800,
//            height: 533 } ] }
