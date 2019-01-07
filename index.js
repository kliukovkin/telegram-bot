import Telegraf from 'telegraf';
import config from 'config';
import HttpsProxyAgent from 'https-proxy-agent';
import request from 'request';

const TOKEN = config.get('token');
const PROXY = config.get('proxy');
const APIKEY = config.get('apiKey');
console.log(APIKEY);
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

const bot = new Telegraf(TOKEN, {
    telegram: {
        agent: new HttpsProxyAgent({
            host: PROXY.host,
            port: PROXY.port
        })
    },
});
request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        console.log('body:', body);
    }
});

bot.on('message', ctx => {
    return ctx.reply('yo!')
});
bot.startPolling();
