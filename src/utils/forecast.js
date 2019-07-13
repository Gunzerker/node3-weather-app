const request=require('request')
function forecast(x,y,callback){
    const url='https://api.darksky.net/forecast/bfaca6efc16f269a4b71a0bfdd18772e/'+x+','+y+'?units=si'
    request({url: url,json: true},(error,response)=>{
        if(error){
            callback('unbale to connect to forecast api',undefined)
        }else if (response.body.error){
            callback('unbale to find the location',undefined)
        }else{
            callback(undefined,{
                sum:response.body.daily.data[0].summary,
                temp:response.body.currently.temperature,
                prob:response.body.currently.precipProbability
            })
        }
    })
}
module.exports=forecast