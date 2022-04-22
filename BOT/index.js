


const BOT_TOKEN = "5340330245:AAFXGFFlJ-72WvzJrfa-bKF-hA3kNnQC0Jo";



const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const server = express();
const { Keyboard } = require('telegram-keyboard')
const bot = new TelegramBot(BOT_TOKEN, {
    polling: true
});
const port = process.env.PORT || 5000;
const gameName = "wheel";
const gameName2 = "plinko"
const queries = {};
server.use(express.static(path.join(__dirname, 'BOT')));
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a T-Rex jumping game. Say /game if you want to play."));
bot.onText(/wheel/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.onText(/plinko/, (msg) => bot.sendGame(msg.from.id, gameName2));
bot.onText(/name/, (msg) => bot.sendGame(msg.from.id, query.id.username));

bot.onText(/start/, (msg) => bot.sendMessage(msg.from.id, "This is casino bot"));



bot.onText(/^\/start$/, function (msg) {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [ ['Level 1'] ]
        }
    };

    bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
});

//
// const keyboard = [
//     [
//         {
//             text: 'Plinko', // текст на кнопке
//             url: "https://dimakpa.github.io/"
//         }
//     ],
//     [
//         {
//             text: 'Wheel',
//             url: "https://dimakpa.github.io/koleso/"
//         }
//     ]
// ];

// const keyboard = Keyboard.reply(['Button 1', 'Button 2'])


// bot.on('message', (msg) => {
//     const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
//
//     // отправляем сообщение
//     bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
//         reply_markup: {
//             remove_keyboard: keyboard
//         }
//     });
// });



bot.on("callback_query", function (query) {
    if (query.game_short_name == gameName) {
        queries[query.id] = query;
        let gameurl = "https://dimakpa.github.io/koleso/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    } else if (query.game_short_name == gameName2) {
        queries[query.id] = query;
        let gameurl = "https://dimakpa.github.io/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});
server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options,
        function (err, result) {});
});
server.listen(port);
























