import config from "config";
import request from "request";

const APIKEY = config.get('apiKey');


export function fetchWeather(lat, lon) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;

    return new Promise(resolve => {
        request(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
            } else {
                console.log('body:', body);
                let weather = JSON.parse(body);
                let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

                return resolve(message);
            }
        });
    })
}
