const request = require('request')


const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=002c78ed2e91716944b1fcf9b82ca5e1&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
                    console.log('network issues')
                }else if(body.error){
                     console.log('unable to find location')
                }else{
                    console.log(body.current)
                    const temperature = Math.round((body.current.temperature - 32) * 5/9) 
                    const feelslike = Math.round((body.current.feelslike - 32) * 5/9)
            callback(undefined,'It is Currently ' + temperature + ' degree out. It fill like '+ feelslike + ' degree out.' +body.location.localtime)
        }
    })

}

module.exports = forecast