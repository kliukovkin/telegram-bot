import Telegraf from 'telegraf';
import config from 'config';
import HttpsProxyAgent from 'https-proxy-agent';

const TOKEN = config.get('token');
const proxy = config.get('proxy');

const bot = new Telegraf(TOKEN, {
    telegram: {
        agent: new HttpsProxyAgent({
            host: proxy.host,
            port: proxy.port
        })
    },
});

bot.hears('hi', ctx => {
    return ctx.reply('Hey!');
});
bot.startPolling();
