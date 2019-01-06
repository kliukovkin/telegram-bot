const Telegraf = require('telegraf');
import config from 'config';

const TOKEN = config.get('token');
const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
    socksHost: '103.206.97.70',
    socksPort: 4145,
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
