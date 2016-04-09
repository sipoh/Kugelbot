/**
 * Created by Simon on 09/04/2016.
 */
var irc = require('irc');

module.exports = function (kugelbot) {
    bot = kugelbot;
    bot.on('text', callback);
};