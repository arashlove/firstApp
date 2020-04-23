const express = require('express')
const hbs = require('hbs')
const path = require('path')
const fs = require('fs')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const debug = require('debug')('app:startup')
const sayhi = require('./routes/sayhi')
const app = express()
const port=process.env.PORT || 3000;
function validateCourse(course){
  const schema={
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(course,schema);
  return result;
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet());
app.use('/api/sayhi',sayhi);
// console.log(app.get('env'))
// console.log(process.env.NODE_ENV)
// console.log('appName: '+config.get('name'))
// console.log('mailServer: '+ config.get('mail.host'))
// app.use(morgan('tiny'));
// if(app.get('env')==='development'){
// debug('morgan is running')
// }
app.set('view engine','hbs'); 
app.use(express.static(path.join(__dirname,'public')))
app.use((req,res,next)=>{
  let now = new Date().toString();
  let log=`${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log,(error)=>{
    if(error){
      console.log('unable to append file!! \n');
    }
  })
  next(); 
})
hbs.registerPartials(path.join(__dirname,'views/partials'))
hbs.registerHelper('date',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('uppercase',(txt)=>{
  return txt.toUpperCase(); 
})
app.get('/', function (req, res) {
  // res.send('Hello World')
  res.render('home',{
    pageTitle:'homepage',
    title:'Hey this is Arash\'s site'
  });
})

 
app.listen(port,()=>{
  console.log(`app listening on port ${port}`)
})