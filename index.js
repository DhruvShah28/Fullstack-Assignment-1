const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");

//used to load the environment variable stored in .env loacl file
dotenv.config();

// initializing the express environment using variable apps 
// (using it as json object to use express methods) and defining port to default or 8888
const app = express();
const port = process.env.PORT || '8888';

// setting up the path location for views to our template engine folder path (i.e. views)
app.set("views", path.join(__dirname,"views"));
// definging which template engine we are using for this app (i.e. pug)
app.set("view engine", "pug")
// using the urlencoded method of express and setting the extended to true to extend the request url we get
app.use(express.urlencoded({extended: true}));
// using json middleware to parse/change the upcoming request to json format
app.use(express.json());

// using express . static middleware to declare the path of pur statoc files(i.e. style.css, script.js, etc)
app.use(express.static(path.join(__dirname, "public")));

//using sessions middleware and defining the default values for all session options to our values
app.use(
    sessions({
        secret: process.env.SESSIONSECRET,
        name: "My_Unique_Session_ID",
        saveUninitialized: false,
        resave: false,
        cookie:{}
    })
);

app.get("/", async(request, response) => {
    console.log(request.session);
    if(request.session.loggedIn){
        response.render("admin/admin", {username: request.session.user});
    }else{
        response.redirect("/admin/login");
    }
});

//route mounting all the routes defined in components/routes(of respective folders) to their designated path
app.use("/admin", require("./components/admin/routes"));
app.use("/experiences", require("./components/experience/routes"));
app.use("/projects", require("./components/project/routes"));

//set up my application listener on my port
app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
});