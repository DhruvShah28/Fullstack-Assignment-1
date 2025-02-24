const mongoose = require("mongoose");
const db = require("../../db");

//create project scheme
const projectSchema = new mongoose.Schema({
    name: String,
    summary: String,
    technology: String,
    status: String,
    timespan: String
});
const Project = mongoose.model("Project", projectSchema);

//functions
async function initializeProject() {
    const projectData = [{
        name: "Coupon Compare",
        summary: "This is a Static Mockup webpage based on the idea to compare price of your desired food accross different food ordering applications",
        technology: "Html, Css, JavaScript",
        status: "Completed",
        timespan: "1 Month"
    },{
        name: "Split Basket",
        summary: "SplitBasket is an intuitive platform designed to simplify the process of managing group expenses and keeping track of shared payments. It enables users to easily split bills, manage balances, and ensure fair sharing of costs within a group.",
        technology: "C#, Html, Css",
        status: "Ongoing",
        timespan: "3 Months"
    }];
    await Project.insertMany(projectData);
}

async function getProject() {
    await db.connect();
    return await Project.find({});
}

async function addProject(newname, newsummary, newtechnology, newstatus, newtimespan) {
    await db.connect();
    let newProject = new Project({
        name: newname,
        summary: newsummary,
        technology: newtechnology,
        status: newtechnology,
        timespan: newtimespan
    });
    let result = await newProject.save();
    console.log(result);       
}

async function deleteProject(id) {
    await db.connect();
    let result = await Project.deleteOne({_id:id});
    console.log(result);
}
module.exports = {
    initializeProject,
    getProject,
    addProject,
    deleteProject
}