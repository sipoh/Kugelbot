var bot;

var callback = function(msg){
    console.log(msg);
    var antwort = 'Danke.';
    bot.sendMessage(msg.chat.id, antwort);
    bot.downloadFile(msg.photo[0].file_id, './thumbnails/');
    bot.downloadFile(msg.photo[msg.photo.length-1].file_id, './fullsize/');
};

module.exports = function(kugelbot) {
    bot = kugelbot;
    bot.on('photo', callback);
};

//{ message_id: 367,
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
