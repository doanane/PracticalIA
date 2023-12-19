const express = require('express')
const bodyParer = require ('body-parser')
 const mongoose = require ('moongoose')
const app = express();
mongose.connect('mongodb:// localhost:27017/patientDB', {usernameUrlParser: true, useUndefinedTopology:true})
const patientSchema = new mongoose.Schema({
  firstName: string,
  surName: string,
  otherName: string,
  gender: string,
  Residential: string,
  adress: string,
  emergencyNumber: string,
  emergencyContact: {
    name: string,
    contact: string,
    relationship: string,
  }

})
const Patient = mongoose.model('patient', patientSchema)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/api/patient/register', async (res, req) => {
  try {
    const newPatient = new Patient(req.body)
    await newPatient.save();
    res.status(201).json ({message:'successful registration'})
  }catch (err) {
    res.status(500).json ({message:'failed registration'})

  }
  })
 
  app.post('/api/encounter/start', (res, req) => {

  })

  app.post('/api/vital/submit', (res, req) => {

  })
  app.get('/api/patients/:patientID', async (res, req) => {
    try{
      const patient = await Patient.findone({ patientID: req.paramas.patientID})
    if (!patient) {
      res.status(404).json ({message:'patient not found'})
    }
    res.json(patient)
    } catch (err)
  {}
})