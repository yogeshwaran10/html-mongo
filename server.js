const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const ejs = require('ejs');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://127.0.0.1:27017/mydb",  {useNewUrlParser: true,
useUnifiedTopology: true,});


//Create a data schema :

const studentSchema ={
    Name : String,
    Age : String,
    City : String
}
const Student = mongoose.model("Student",studentSchema);



//app.get
app.get('/',(req,res)=>{
    Student.find().then((students)=>{
        res.render('index',{
            studentList:students
        })
    })
})

app.post("/",function(req,res){
    let newStudent = new Student({
        Name : req.body.Name,
        Age : req.body.Age,
        City : req.body.City
    });
    newStudent.save();
    res.redirect('/');
})



app.listen(5000,function(){
    console.log("Server is running on port 5000");
})
