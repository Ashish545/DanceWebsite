const express = require("express");

const path = require("path");

// const fs = require("fs");

const app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser: true});
const bodyparser = require("body-parser")

const port = 8000;

// define mongoose schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact',contactSchema);





// app.use(express.static('static', options))

// express specific stuff

app.use('/static', express.static('static')) // for serving static files

app.use(express.urlencoded())

// pug specific stuff

app.set('view engine', 'pug') //set the templete engine as pug

app.set('views', path.join(__dirname,'views')) // set the views directory

// endpoints

app.get('/',(req,res)=>{
   
    res.status(200).render('home.pug')
});
app.get('/contact',(req,res)=>{
   
    res.status(200).render('contact.pug')
});
app.post('/contact',(req,res)=>{
   
    var myData = new Contact(req.body);

    myData.save().then(()=>{

        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Items was not saved to the database")
    })
   
    // res.status(200).render('contact.pug')
});



// starts the server

app.listen(port, ()=>{
    console.log(`The Application Started Successfully on ${port}`)
});