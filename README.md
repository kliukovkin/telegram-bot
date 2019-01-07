To make your bot works firstly you need to creat bot via @BotFather
in telegram. After you get a token you should write it down to your
json5 config(create file _config/default.json5_). Telegram API is 
blocked in some countries, so you may need to use proxy. To get weather
forecast you also need to get apiKey. Config file should look like:
```
{
   token: '12345:ABCDEFG',//telegram token
   proxy: {
     host: '100.100.100.00',
     port: 3000
   },
   apiKey: '1314asd12312qwe' //openWeatherMap
 }
```
**_npm install_**

then

**_npm start_**

Enjoy :)
