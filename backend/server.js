require('dotenv').config();
const express=require('express');
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
//database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   console.log('Database connected');
   app.listen(process.env.PORT,()=>{
    console.log('Server is running on port '+process.env.PORT);
})
})
.catch(err=>{
    console.log(err);
})

const User=require('./models/userModel');
app.post("/api/users",async (req,res)=>{
    console.log('hello from server')
    const {name,email,phone,birth} = req.body;
    const user = await User.create({name,email,phone,birth});    
    res.status(200).json({user});
});
app.get('/api/users/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
      
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's _id
      res.json({ userId: user._id });
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


