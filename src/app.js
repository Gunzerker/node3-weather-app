const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public')))

//paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'hz'
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about dynamic",
        name:"hz"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        text:'help text',
        name:'hz'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adresse){
        return res.send({
            error:"You didn't provide an adresse"
        })
    }
    
    geocode(req.query.adresse,(error,data)=>{
        if(error){
            return res.send({
                error:("could not get to geocode API")
            })
        }
        forecast(data.latitude,data.long, (error, Forecastdata) => {
            res.send({
                forecast:Forecastdata,
                location:data.location
            })
          })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        par:'help paragraph not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        par:'404 not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})