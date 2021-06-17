const express=require('express')
const app=express()
const morgan =require('morgan')
const bodyParser = require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/contacts-db');
const db = mongoose.connection
db.on('error',(err)=>{
    console.log(err);
})
db.once('open',()=>{
    console.log('database created established');
})
const contactRoute=require('./api/routes/contact')
const userRoute=require('./api/routes/user')


const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/contacts',contactRoute)
app.use('/api/users',userRoute)

app.get('/',(req,res) =>{
    res.send('Dont worry Riaz, Your port is running on Server')
})

app.get('/posts',(req,res)=>{
    res.send('dont worry riaz ,Your second server has been created')
})


app.listen(PORT,()=>console.log(`don't worry Riaz, Your port is running on Server ${PORT}`))


// const contacts=[
//     {
//     name:'riaz',
//     email:'riazakhanda@gmail.com'
// },
//     {
//     name:'rayhan',
//     email:'rayhanakhanda@gmail.com'
// },
//     {
//     name:'alamgir',
//     email:'alamgir@gmail.com'
// }
// ]