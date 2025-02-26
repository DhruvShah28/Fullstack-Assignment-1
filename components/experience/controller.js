const { response } = require("express");
const experienceModel = require("./model");

const showallexperience = async (request, response) => {
    if(request.session.loggedIn){
        let experienceList = await experienceModel.getExperience();
    if(!experienceList.length){
        await experienceModel.initializeExperience();
        experienceList = await experienceModel.getExperience();
    }
    response.render("experiences/list", { experience: experienceList });
    }else{
        response.redirect("/admin/login");
    }
};

const showapiexperience = async (request, response) =>{
    let experienceList = await experienceModel.getExperience();
    response.json(experienceList);
}

const showadd = async (request, response) => {
    if(request.session.loggedIn){
        response.render("experiences/add");
    }else{
        response.redirect("/admin/login");
    }
}

const addNewExperience = async (request, response) => {
    let result = await experienceModel.addExperience(
        request.body.title,
        request.body.company,
        request.body.location,
        request.body.startyear,
        request.body.endyear,
        request.body.desc
    );
    // let result = await experienceModel.addExperience(inputExperience);
    console.log(result);
    response.redirect("../list");
}

const deleteExperienceById = async (request, response) =>{
    let result = request.query.linkid;
    await experienceModel.deleteExperience(result);
    console.log(result);
    response.redirect("../list");
}

module.exports = {
    showallexperience,
    showadd,
    addNewExperience,
    deleteExperienceById,
    showapiexperience
};