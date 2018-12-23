import TelegramBot from 'node-telegram-bot-api';
import config from './config/default.json5';

const TOKEN = config.get('token');

const bot = new TelegramBot('731560459:AAEbdZlkGx3MTFOH1jdDZOq7AEgycuibAvg', {polling: true});

bot.on('message', (msg) => {
    const {chat: {id}} = msg;
    bot.sendMessage(id, 'Pong');
});
