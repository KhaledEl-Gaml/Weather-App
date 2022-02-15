const request = require("request")

const forecast = (lat , lon , callback)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d0de341a19edeb58cc43db55a13637c3&units=metric`
    
    request({url , json:true} , (err,{body})=>{ //using just url it called obj property shorthand and {is an obj destructuring}
        if(err){
            callback(`Can't connect to the weather server `  , undefined)
        }else if(body.message){
            callback(`Unable to find the location` , undefined)
        }else{
            callback(undefined ,
                `Forecast : ${body.weather[0].description} 
                 it's currently ${body.main.temp} degrees out 
                 and the humidity is ${body.main.humidity}`
            )
        }
    })
}
module.exports = forecast
