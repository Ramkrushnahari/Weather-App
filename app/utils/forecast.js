
const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5474887ccc7ae07f8d39106e1c588a0b&query="+latitude+","+longitude;

    request({url, json: true}, (error,{ body }) => {
        if(error){
            callback("unable to connect to weather service!",undefined)
        }
        else if(body.error){
            callback("Unable to find location",callback)
        }
        else {
            callback(undefined,
            "It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degree out. Weather Description : "+body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast