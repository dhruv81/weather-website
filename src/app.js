const express = require('express')
const path =require('path')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000

//difine path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const pathTemplet = path.join(__dirname,'../templet/views')
const partialsPath = path.join(__dirname,'../templet/partials')

//setup handlers engine and view location
app.set('view engine','hbs')
app.set('views',pathTemplet)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dhruv Hirani'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Robot'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Us',
        name:'Robo'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must be enter the address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location } = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must be enter search'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        dicription:'Help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        dicription:'Page Not Fond'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})