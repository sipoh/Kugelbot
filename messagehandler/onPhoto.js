var bot;

var callback = function(msg){
    //console.log(msg);
    if(msg.chat.type == 'private'){
        var antwort = 'Danke.';
        bot.sendMessage(msg.chat.id, antwort);
    }

    //var path = 'L:/Fotos vom Fotobot'; //TODO
    var path = '.'; //TODO
    bot.downloadFile(msg.photo[0].file_id, path + '/thumbnails/');
    bot.downloadFile(msg.photo[msg.photo.length-1].file_id, path + '/fullsize')
        .then(function() {
            if(msg.chat.type == 'private') {
                bot.sendMessage(msg.chat.id, 'Download abgeschlossen!');
            }
            else{
                if(msg.chat.type == 'group'){
                    bot.sendMessage(msg.from.id, 'Dein Foto in der ' + msg.chat.title + '-Gruppe wurde archiviert.');
                }
            }
        });
};

module.exports = function(kugelbot) {
    bot = kugelbot;
    bot.on('photo', callback);
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
