const express =  require('express');
const bodyParser = require('body-parser');
const app =  express();
const port = 9000;
const routes = require('./routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/',routes);


app.listen(process.env.PORT || port, ()=>{
    console.log(`server started at port http://localhost:${port}`)
});