const Joi = require('joi');
const express = require('express');//this returns a function, we call that express
var cors = require('cors');
const app = express(); //this express function returns an object, we can name it app.
app.use(cors());
app.use(express.json());




// app.get()
// app.post()
// app.put()
// app.delete()
//some methods of app object

var courses=[//courses array creation with subjects as different objects having 2 propeties id and name
    { id: 01, name: "math" },
    { id: 02, name: "physics" },
    { id: 03, name: "biology" },
    { id: 04, name: "chemistry" }
];
const port = process.env.PORT || 3000 //taking port from environment variable PORT (previously set by the user) and if PORT variable is not present then the default port value will be 3000

app.get('/',(req,res)=>{
    res.send('hello world!!');
});
app.get('/customers',(req,res)=>{
    res.send('customers');
});
app.get('/orders',(req,res)=>{
    res.send('orders');
});
app.get('/query/:id',(req,res)=>{
    res.send(req.params.id);
});

// app.get('/query/:year/:month',(req,res)=>{
//     res.send(req.query); //send the query object that was added to the url after the parameters using the ? sign
// });

app.get('/query/:year/:month',(req,res)=>{
    res.send(req.params); //this returns all the parameters of the url
});
app.get('/courses',(req,res)=>{
    res.send(courses); //this will send the courses array
});
app.get('/courses/:id',(req,res)=>{
    let course = courses.find((c)=> c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send(`Course with id=${req.params.id} could not be found!`);
    if (course)
        res.send(course);
});

app.post('/courses', (req,res)=>{
const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body,schema);
if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
}
 const course = {
     id: courses.length+1,
     name: req.body.name
 }
 courses.push(course);
 res.send(course);
});

app.listen(port,()=>{console.log(`Listening on port ${port}`)});
