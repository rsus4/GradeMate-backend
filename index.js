const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rishitgupta:guitarist@cluster0.ph2hn.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const util = require('util');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("test").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

app.get('/api/collection', async (req, res) => {
  try {
    await connect();
    console.log("API CALLED API COLLECTIOn")
    const collection1 = client.db("test").collection("registration");
    const email = req.query.email;
    console.log(email)
    const user = await collection1.findOne({ email: email });
    const user_department = user.department;
    console.log("User Department")
    console.log(user_department)

    const collection = client.db("test").collection("cluster0"); // declare and initialize collection here
    const docs = await collection.find().toArray();
    const dataArr = docs.map(doc => doc.data).flat().map(JSON.stringify).filter((value, index, self) => self.indexOf(value) === index).map(JSON.parse); // create a new filtered array with only unique data arrays    console.log(dataArr);
    console.log(dataArr)
    const filteredData = dataArr.filter(arr => arr[6] === user_department);
    console.log(filteredData)
    res.send(filteredData)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get('/api/mycourses/:email', async (req, res) => {
  try {
    await connect();
    const email = req.params.email;
    const collection = client.db("test").collection("cluster0");
    const docs = await collection.find().toArray();
    const dataArr = docs.map(doc => doc.data.map(arr => [arr[0], arr[1], arr[5]])).flat().filter((value, index, self) => self.indexOf(value) === index);
    const filteredData = dataArr.filter(row => row[2] === email);
    const courseData = filteredData.map(row => row[0] + ": " + row[1]).flat();
    const uniqueCourseData = courseData.filter((item, index) => { return courseData.indexOf(item) === index;});
    console.log(uniqueCourseData)
    res.send(uniqueCourseData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



// app.get('/api/collection', async (req, res) => {
//   try {

//     await connect();
//     console.log("API CALLED API COLLECTIOn")
//     const collection1 = client.db("test").collection("registration");
//     const email = req.query.email;
//     const user = await collection.findOne({ email: email });
//     const user_department = user.department;
//     console.log("User Department")
//     console.log(user_department)
//     const collection = client.db("test").collection("cluster0");
//     const docs = await collection.find().toArray();
//     const dataArr = docs.map(doc => doc.data).flat().map(JSON.stringify).filter((value, index, self) => self.indexOf(value) === index).map(JSON.parse); // create a new filtered array with only unique data arrays    console.log(dataArr);
//     console.log(dataArr)
//     const filteredData = dataArr.filter(arr => arr[6] === user_department);
//     console.log(filteredData)
//     res.send(filteredData)
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// app.post('/api/collection', async (req, res) => {
//   try {
//     console.log("API called")
//     await connect();
//     const collection = client.db("test").collection("cluster0");
//     const data = req.body;
//     await collection.insertOne({ data });
//     console.log('Data saved successfully to database');
//     res.status(200).send('Data saved successfully to database');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Error while saving data to database');
//   }
// });

app.post('/api/collection', async (req, res) => {
  try {
    console.log("API called")
    await connect();
    const collection = client.db("test").collection("cluster0");
    const data = req.body;
    console.log("Data sent: ")
    console.log(data)
    console.log("Data")
    const existingData = await collection.findOne({ data }); // search the collection for a document that has the same data property
    if (existingData) {
      console.log('Data already exists in database');
      res.status(200).send('Data already exists in database'); // return a success response indicating that the data already exists
    } else {
      await collection.insertOne({ data });
      console.log('Data saved successfully to database');
      res.status(200).send('Data saved successfully to database');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error while saving data to database');
  }
});



app.post('/api/register', async (req, res) => {
  try {
    console.log("Reg API called")
    await connect();
    const collection = client.db("test").collection("registration");
    const data = req.body;
    const users = await collection.find().toArray();
    console.log(users)
    const existingUser = await collection.findOne({ email: data.email }, {});
    if (existingUser && existingUser.verified) {
      console.log(`User with email ${data.email} already exists`);
      return res.status(400).send({message:`User with email ${data.email} is already registered.`});
    }
    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'ardk1610@gmail.com',
        pass: 'wgxhdyxdcduhjika',
      },
    });
    console.log(transporter)
    const mailOptions = {
      from: 'ardk1610@gmail.com',
      to: data.email,
      subject: 'OTP for GradeMate Registration',
      text: `Your OTP for registration is ${otp}.`
    };
    console.log("MAIL OPTIONS")
    console.log(mailOptions)

    // Convert the callback function to an async function
    transporter.sendMail = util.promisify(transporter.sendMail);
    await transporter.sendMail(mailOptions);

    console.log('OTP sent');
    const hashedOtp = await bcrypt.hash(String(otp), 10);
    console.log("Hashed OTP")
    console.log(hashedOtp)
    console.log("Hashed OTP")
    data.otp = hashedOtp; // Add OTP to registration data
    const timestamp = new Date();
    data.timestamp = timestamp.toISOString();
    const existingUser1 = await collection.findOne({ email: data.email });
    if (existingUser1) {
      console.log(`User with email ${data.email} already exists, updating data...`);
      await collection.updateOne({ email: data.email }, { $set: data });
    } else {
      console.log(`Registering new user with email ${data.email}...`);
      await collection.insertOne(data);
    }
    console.log(`Data saved successfully to database: ${JSON.stringify(data)}`);
    res.status(200).send({message:'Data saved successfully to database'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message:'Error while saving data to database'});
  }
});

app.post('/api/verifyotp', async (req, res) => {
  try {
    console.log("Verify OTP API called")
    await connect();
    const collection = client.db("test").collection("registration");
    const data = req.body;
    const existingUser = await collection.findOne({ email: data.email }); // Retrieve user from database
    if (!existingUser) {
      console.log(`User not found for email ${data.email}`);
      return res.status(400).send({message:`User not found.`});
    }
    const isMatch = await bcrypt.compare(String(data.otp), existingUser.otp);
    if (!isMatch) {
      console.log(`Invalid OTP for email ${data.email}`);
      return res.status(400).send({message:`Invalid OTP.`});
    }
    const currentTime = new Date();
    const timestampDiff = currentTime.getTime() - new Date(existingUser.timestamp).getTime();
    if (timestampDiff > 60000) { // OTP is valid for 1 minute
      console.log(`OTP has expired for email ${data.email}`);
      return res.status(400).send({message:`OTP has expired.`});
    }
    console.log(`OTP verified successfully for email ${data.email}`);
    // Update the user's document to set verified = true
    await collection.updateOne({ email: data.email }, { $set: { verified: true } });
    res.status(200).send({message:'OTP verified successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message:'Error while verifying OTP'});
  }
});

app.post('/api/login', async (req, res) => {
  try {
    await connect();
    const collection = client.db("test").collection("registration");
    const user = await collection.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while logging in" });
  }
});

app.get('/api/user/:email', async (req, res) => {
  try {
    console.log("Get User API called");
    await connect();
    const collection = client.db("test").collection("registration");
    const email = req.params.email;
    const user = await collection.findOne({ email: email });
    if (!user) {
      console.log(`User not found for email ${email}`);
      return res.status(400).send({message:`User not found.`});
    }
    console.log(`User retrieved successfully for email ${email}`);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({message:'Error while retrieving user'});
  }
});



app.listen(8000, () => {
  console.log(`Server running on port ${8000}`);
});

