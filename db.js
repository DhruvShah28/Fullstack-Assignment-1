const mongoose = require("mongoose");

// creating a variable to store our mongodb connection string and replacing the defaluts to our database values for authentication
const dburl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

// createing connectiion function to connect to our database by passing the usr to mongoose.connect();
async function connect() {
    await mongoose.connect(dburl);
}

module.exports = { connect };