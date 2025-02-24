const mongoose = require("mongoose");
const { scryptSync } = require("crypto");
const db = require("../../db");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});
const Admin = mongoose.model("Admin", adminSchema);

async function getAdmin(username) {
    await db.connect();
    let result = await Admin.findOne({user: username});
    return(result) ? result : false
}

async function addAdmin(username, pass) {
    await db.connect();
    let admin = await getAdmin(username);
    console.log("User Found: " + admin);
    if(!admin){
        let key = scryptSync(pass, process.env.SALT, 64);
        let newAdmin = new Admin({
            username: username,
            password: key.toString("base64")
        });
        let result = await newAdmin.save();
        console.log(result);
        if(result === newAdmin){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

async function authenticateAdmin(username, pass) {
    await db.connect();
    let key = scryptSync(pass, process.env.SALT, 64);
    let result = await Admin.find({
        username: username,
        password: key.toString("base64")
    });
    if(result){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    getAdmin,
    addAdmin,
    authenticateAdmin
}