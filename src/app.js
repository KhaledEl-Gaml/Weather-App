const path    = require("path")
const express = require('express')
const hbs     = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")


const app  = express() //express is just a function 
const port = process.env.port || 3000 

//Define paths for express configurations 
const static    = path.join(__dirname , "../public");
const viewPath  = path.join(__dirname , "../templates/views")
const partials  = path.join(__dirname , "../templates/partials")

// Serve static directory 
app.use(express.static(static))// to server static files

// Setup handlebars engine and views locations
app.set('views' , viewPath) 
app.set('view engine', 'hbs')  //  to use the template engine like (hbs , ejx)

hbs.registerPartials(partials)


//Setup all the routes  handlers
app.get("" , (req , res)=>{
    res.render("index" , {
        title :"Weather App",
        name  : "Khaled ElGaml"
    })
})

app.get("/about" , (req , res)=>{
    res.render("about" , {
        title :"    ",
        name  : "Khaled ElGaml"
    })
})

// app.get("/help" , (req , res)=>{
//     res.render("help" , {
//         message :"This is a help Page ",
//         title   : "Help",
//         name    : "Khaled ElGaml"
//     })
// })

app.get("/help/*" , (req , res)=>{
    res.render("404" , {
        title :"404",
        name  :"Khaled ElGaml",
        error :"Help articles not found"
    })
})  


app.get("/weather" , (req , res)=>{
       if(!req.query.address){
        return res.send({
            Error:"U have to enter any address"
        })
    }else{
    geocode(req.query.address , (err, {latitude , longitude , location} = {} )=>{
        if(err){
            return res.send({
                Error : err
            })
        }forecast(latitude , longitude , (err, data)=>{
            if(err){
                return res.send({
                    Error :err
                })
            }
            res.send({
                forecast :data,
                location :location,
                address  :req.query.address
            })    
        })
    })
  }
})

app.get("/product" , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error:"U have to set a value for search"
        })
    }
        console.log(req.query);
        res.send({
        product : []
    })  
})



app.get("*" , (req ,res) =>{
    res.render("404" , {
        title :"404",
        name  :"Khaled ElGaml",
        error :"Page not found",
        message:"Oops!"
    })
})



app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})