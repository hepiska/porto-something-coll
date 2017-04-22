const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const api=require('./routes/api')
const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/api',api);

app.listen(3000)
