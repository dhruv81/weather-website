const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=002c78ed2e91716944b1fcf9b82ca5e1&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
                    console.log('network issues')
                }else if(body.error){
                     console.log('unable to find location')
                }else{
                    const temperature = Math.round((body.current.temperature - 32) * 5/9) 
                    const feelslike = Math.round((body.current.feelslike - 32) * 5/9)
            callback(undefined,temperature + ' Temprature ' + feelslike + ' Feelling like.'+ body.location.localtime)
        }
    })

}

module.exports = forecast