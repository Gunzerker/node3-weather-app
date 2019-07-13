const request=require('request')
const geocode=(adresse,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+adresse+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiaDdvdXNzZW0iLCJhIjoiY2p4ZzcwcnBmMDhtajN5bDl4cnV2NXY1MiJ9.WgehNezMKH-df4fhnJjO-w&limit=1'
    request ({url: geourl,json: true},(error,response)=>{
        if(error){
            callback('unable to connect to geo url',undefined)
        }
        else if (response.body.features.length==0){
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                long:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
    }
})
}
module.exports=geocode