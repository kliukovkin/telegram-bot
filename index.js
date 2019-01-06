import TelegramBot from 'node-telegram-bot-api';
import  Agent from 'socks5-https-client/lib/Agent';
import config from 'config';

const TOKEN = config.get('token');
const proxy = config.get('proxy');
const bot = new TelegramBot(TOKEN, {
    polling: true,
    request: {
        agentClass: Agent,
        agentOptions: {
            socksHost: proxy.host,
            socksPort: proxy.port,
            // If authorization is needed:
            // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
            // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
        }
    }
});

bot.on('message', (msg) => {
    const {chat: {id}} = msg;
    bot.sendMessage(id, 'Pong');
});
