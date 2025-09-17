const express =require('express');
const requestIp = require('request-ip');
const Joi =require('joi');
const router=express.Router();
const mysql=require('../mysql');
const {mongoConnect,getDB} = require("../mongodb");




router.get('/',(req,res)=>{
    var query="SELECT * from students ";

 
    mysql.execute(query).then(result=>{

        return res.json(result[0]);
    }).catch(error=>{
        //console.log("Students details error",error);
        return res.status(404).send("data not found");
    })
});

router.get('/mongo',async (req,res)=>{
    let db= getDB();
    let data =await db.collection('students').find().toArray();
   // console.log("getData:-",data)
    return res.send(data);
});


router.get('/:id',(req,res)=>{
    var id=req.params.id;
    var query="SELECT * from students WHERE _id=?";


    mysql.query(query,[id]).then((result)=>{
        return res.json(result[0]);
    }).catch((error)=>{
        //console.log("error",error);
        return res.status(404).send("Data Not Found");
    });
});




router.post('/', (req, res) => {

    const { error } = validatedevice(req.body);
    if (error) {
       // console.log("Validation error:", error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    const values = { ...req.body };
console.log("req detail",values)
   const query = "INSERT INTO students SET ?";

    mysql.query(query, [values])
        .then(result => {
            return res.json({ id: result[0].insertId });
        })
        .catch(error => {
            //console.log("Insert error", error.errno);
            return res.status(500).json({ error: "Database insert failed" });
        });
});

router.post('/mongo', (req, res) => {
    const values = { ...req.body };
    let db = getDB();
    db.collection('students').insertOne(values);
    return res.json({ success: "Student detail inserted successfully." });
});




router.put('/:id', (req, res) => {
  
    const { error } = validatedevice(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const id = req.params.id;
    const values = req.body;
    const query = `
        UPDATE students SET ? WHERE _id = ?
    `;

    mysql.query(query, [values, id])
        .then(result => {
            res.json({ success: "Student detail updated successfully." });
        })
        .catch(error => {
           // console.error("Update error", error);
            return res.status(500).json({ error: error.sqlMessage });
        });

      });




router.delete('/:id',(req,res)=>{

    var id = req.params.id;

    var query = `delete from students   WHERE _id = ${id}`;

    mysql.query(query).then(result=>{
        return res.json({ success: "Data deleted" });
    }).catch(error=>{
       // console.log("error",error);
        return res.status(500).json("error",error);
    });
});


function validatedevice(device) {
    const schema = Joi.object({
        full_name: Joi.string().max(50).required(),
        mobile_number:Joi.string().pattern(/^[6-9]\d{9}$/).required(),
        email:Joi.string().email({ tlds: { allow: false } }).required(),
        course:Joi.string().required(),
        gender:Joi.string().required(),
    });

    return schema.validate(device);
}

module.exports =router;