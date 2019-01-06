import Telegraf from 'telegraf';
import config from 'config';

const TOKEN = config.get('token');
const proxy = config.get('proxy');
const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
    socksHost: proxy.host,
    socksPort: proxy.port,
});
const bot = new Telegraf(TOKEN, {
    telegram: {
        agent: socksAgent,
    },
});

bot.hears('hi', ctx => {
    return ctx.reply('Hey!');
});
bot.startPolling();
