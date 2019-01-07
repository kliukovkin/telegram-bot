import Telegraf from 'telegraf';
import config from 'config';
import HttpsProxyAgent from 'https-proxy-agent';
import Extra from 'telegraf/extra';
import {fetchWeather} from './weather';

const TOKEN = config.get('token');
const PROXY = config.get('proxy');


const bot = new Telegraf(TOKEN, {
    telegram: {
        agent: new HttpsProxyAgent({
            host: PROXY.host,
            port: PROXY.port
        })
    },
});

bot.start((ctx) => {
    return ctx.reply('Get forecast', Extra.markup((markup) => {
        return markup.resize()
            .keyboard([
                markup.locationRequestButton('Send location')
            ])
    }))
});

bot.on('message', async ctx => {
    if (ctx.message.location) {
        const {latitude, longitude} = ctx.message.location;
        const weather = await fetchWeather(latitude, longitude);
        return ctx.reply(weather);
    }
    else {
        if (ctx.message.text &&
            (ctx.message.text[1] === 'е' ||
                ctx.message.text[2] === 'е' ||
                ctx.message.text[3] === 'е')) {
            let {text} = ctx.message;
            return ctx.reply('ху' + text.slice(text.indexOf('е')));
        }
        return ctx.reply('Nothing to answer yet');
    }
});

bot.startPolling();
//TODO what is webhooks?
//TODO parse github profiles to calculate amount of code and repos
