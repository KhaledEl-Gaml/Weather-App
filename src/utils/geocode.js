const request = require('request')

//this is a reusable function uses the call back fun pattern
const geocode = (address , callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${(encodeURIComponent(address))}.json?access_token=pk.eyJ1Ijoia2hhbGVkZWxnYW1sIiwiYSI6ImNrdzk0cGZrbzEwb3MycHBhMXg4ejZ5aDAifQ.zVmLLuji-nr9EZYzMTL_UQ&limit=1`
    request({url , json:true} , (err,{body}) =>{ //using just url is called obj property shorthand and {is obj destructuring}
        if(err){
            callback(`Can't connect to the weather server ` , undefined)
        }else if(body.message){
            callback((`Unable to find the location` , undefined))
        }else{
            callback(undefined , {  
                latitude  : body.features[0].geometry.coordinates[1],
                longitude : body.features[0].geometry.coordinates[0],
                location  : body.features[0].place_name
            })
        }
    })      
}

module.exports = geocode;