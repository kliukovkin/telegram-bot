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


bot.on('message', async ctx => {
    if (ctx.message.text && ctx.message.text.includes('weather')) {
        return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
            return markup.resize()
                .keyboard([
                    markup.locationRequestButton('Send location')
                ])
        }))
    }

    if (ctx.message.location) {
        const {latitude, longitude} = ctx.message.location;
        const weather = await fetchWeather(latitude, longitude);
        return ctx.reply(weather);
    }
    return ctx.reply('yo!')
});
bot.startPolling();
bot.command('special', (ctx) => {
    return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
        return markup.resize()
            .keyboard([
                markup.locationRequestButton('Send location')
            ])
    }))
});
