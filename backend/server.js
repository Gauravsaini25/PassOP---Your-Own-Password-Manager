const express = require('express')
const dotenv=require('dotenv')
const cors = require("cors");

const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')


const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors());
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173"
}));

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'pass-op';


// Use connect method to connect to the server
client.connect();



app.get('/', async(req, res) => {
    const db = client.db('pass-op');
    const collection = db.collection('records');
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    res.json(findResult)
})

app.post('/',async(req,res)=>{
    const db = client.db('pass-op');
    const collection = db.collection('records');
    let record=req.body;
    await collection.insertOne(record)
    
    res.send(record)


})

app.delete('/',async(req,res)=>{
    const db = client.db('pass-op');
    const collection = db.collection('records');
    let record=req.body;
    console.log(record)
    const result = await collection.deleteOne({_id:record._id});

    if (result.deletedCount > 0) {
      res.json({ success: true, message: "Record deleted" });
    } else {
      res.status(404).json({ success: false, message: "Record not found" });
    }
    


})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
