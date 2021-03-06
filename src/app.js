const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')

const app = express()
const port = 3000

//setup static directory to serve
app.use(express.static(publicDirectory))

//setup handlebars engine and views location
app.set('views', viewDirectory)
app.set('view engine','hbs')
hbs.registerPartials(partialsDirectory)

app.get('/',(req,res) => {
    res.render('index',{
        title : "Weather App",
        name : "Ramhari Kenjale"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
            title : 'About Me',
            name : 'Ramhari Kenjale'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : "Weather is the state of the atmosphere, describing for example the degree to which it is hot or cold, wet or dry, calm or stormy, clear or cloudy. On Earth, most weather phenomena occur in the lowest layer of the planet's atmosphere, the troposphere, just below the stratosphere.",
        title : 'Help',
        name : 'Ramhari Kenjale'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location }) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title : "404",
        name : "Ramhari Kenjale",
        errorMessage : "Help Artical Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title : "404",
        name : "Ramhari Kenjale",
        errorMessage : "Page Not Found"
    })
})


app.listen(process.env.PORT ||port, () =>{
    console.log("Server is up on the port 3000")
})















