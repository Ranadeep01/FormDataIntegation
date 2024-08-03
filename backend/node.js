//import { v4 as uuidv4 } from 'uuid';

const express = require( 'express' );
//const data = require('./MOCK_DATA.json');
const send = require('send');
const { Script } = require('vm');
const { url } = require('inspector');
const  app = express();
const mongoose = require('mongoose');
const { error, Console, log } = require('console');
const cors = require('cors');
const { type } = require('os');

app.use(cors()) //middle-ware  

mongoose.connect('mongodb://127.0.0.1:27017/ranaa')
.then(()=>{console.log('Database Connection successfull..')})
.catch((err)=>{console.log("datbase connection unsuccesfull..")})

//create schema

const schema = new mongoose.Schema({
    work : {type : String, required:true, unique:false},
    rate: {type : Number, required:true, unique:false},
    hours : {type : Number, required:true , unique:false},
    date : {type : String, required:true, unique:false},
    season : {type : String, required: true, unique:false},
    total : {type:Number, required:true, unique:false}
})

const schemaLogin = new mongoose.Schema({
    email: {type: email, unique: true, require: true}
})

const model = mongoose.model('datas', schema)
//console.log('model', model)model

const modelLogin = mongoose.model('login', schemaLogin)

{/*const newUser = new model({
    id:1,
    first_name:"Dall",
    last_name:"Janssen",
    email:"djanssen0@miibeian.gov.cn",
    gender:"Male"

//insertion
    newUser.save()
    .then(()=>{console.log('data saved succussfully..')})
    .catch((err)=>{
        console.error(`Error occured while saving the data to database ${err}`);
    })
})*/}

//deletion
//model.deleteOne({id:1}).then((res)=>{console.log('delection done')}).catch((err)=>{console.log(err)})

//updation
//model.find({id:2}).updateOne({first_name:'ranadeep'}).then(()=>{console.log('updateion done')}).catch((err)=>{console.log(err)})

//sorting
//model.find().sort({id:1}).then((res)=>{console.log('sorting successsfull..')}).catch((err)=>{console.log('error found..')})


async function getData(){
    try{
        const data = model.find({}) //get all the data from 
        //console.log('getting all users...');
        return data
    }
    catch(err){
        //console.log(err)
        throw err
    }

}

app.get('/details', async (req , res) =>{
    const data =  await getData();
    return res.json(data)

})  

app.use(express.json()) //middle-ware

app.post('/updated/:id', async (req, res)=>{
    const id = req.params.id;
    //console.log('id of updated data is : ', id)
    const {work, rate, hours, date, season, total} = req.body

    try {
        const updatedData = await model.updateOne({ _id: id }, { $set: { work, rate, hours, date, season, total } });
        //console.log('updated data : ', updatedData)
        res.status(200).json({ message: 'Data updated successfully', data: updatedData });

    } catch (error) {
        //console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
})

// app.post('/add', async (req, res) => {
//     //console.log('req.body', req.body)
//     const {work, rate, hours, date, season, total} = req.body
//     try{
//         const user = new model({
//             work : work,
//             rate : rate,
//             hours : hours,
//             date : date,
//             season : season,
//             total : (total)
//         })
//         await user.save()
//         .then(()=>{console.log('data insertion sucessful..')})
//     .catch((err)=>{console.log('data insertion failed..', )})
        
//         return res.status(200).send(`Added a new record of ${user.work} to database`)
//     }
//     catch(err){
//         return res.status(500).send('Data insertion failed : ')
//     }
// });


app.post('/add', (req, res)=>{
    const record = req.body
    try{
        const newRecord = new model({
            work : record.work,
            rate : record.rate,
            hours : record.hours,
            date : record.date,
            season : record.season,
            total : (record.total)
        })
        newRecord.save().then(()=>{console.log('Record saved successfully')})
    }
    catch(err){
        console.log('Record saving failed..', err)
    }

})


app.delete('/delete/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const x = await model.findByIdAndDelete({_id:id})
        return res.status(200).send('Succedfully deleted from node.js')
    }
    catch(err){
        //console.log(err)
        throw err
    }

})

app.get('/edit/:id', async (req, res)=>{
    //console.log(req)
    try{
        const id = req.params.id
        const data = await model.findById(id)
        return res.status(200).send(JSON.parse(JSON.stringify(data)))

    }
    catch(e){
        throw e

    }

})

app.get('/', (req, res)=>{
    res.send('Hello homw page!..')

})

app.listen(8000,()=>{
    console.log("Server Runnnign at port 8000")

})

