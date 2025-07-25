require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel, contentModel } = require("./db");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connect successfully");
        console.log("Database : ", mongoose.connection.db.databaseName);
    }
    catch(error){
        console.error("DB connection error", error);
        process.exit(1);
    }
}



app.post("/api/v1/signup", async (req, res) => {
    try { 
    const username = req.body.username;
    const password = req.body.password; 

    if(!username || !password){
        console.log("Username or password is missing");
        return res.status(400).json({
            message : "Username and password are required"
        });
    }

    const existingUser = await userModel.findOne( {username} );
    if(existingUser){
        console.log("Username already exists");
        return res.status(411).json({
            message : "User already exits"
        });
    };

    const user = userModel.create({
        username, 
        password, 
    });
    res.status(201).json({
            message: "User signed up successfully",
            userId: user._id
    });

    } catch(err){
        console.error(err);
    }
});
app.post("api/v1/signin", async (req, res) => {
    try {
        const username = req.body.username; 
        const password = req.body.password;

        if(!username || !password){
        console.log("Username or password is missing");
        return res.status(400).json({
            message : "Username and password are required"
        });
        }
        const existingUser = await userModel.findOne({username});

        if(!existingUser){
            console.log("User not found : ", username);
            return res.status(411).json({
                message : "User doesn't exist"
            });
        }
        
        const flag = await bcrypt.compare(password, existingUser.password);

        if(!flag){
            console.log("Incorrect password");
            return res.status(403).json({
                message : "Incorrect password"
            });
        }
   
        
    } catch (error) {
        console.error(error);
    }
});
// app.post("api/v1/content", );
// app.get("api/v1/content",  );
// app.delete("api/v1/content/:id", );


connectDB().then( ()=> {
    app.listen(PORT, ()=> {
        console.log(`Server running on PORT ${PORT}`);
    });
});
