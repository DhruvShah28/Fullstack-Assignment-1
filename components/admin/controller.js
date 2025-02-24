const adminModel = require("./model");

const adminPage = async(request, response) => {
    console.log(request.session);
    if(request.session.loggedIn){
        response.render("admin/admin", {username: request.session.user});
    }else{
        response.redirect("/admin/login");
    }
}

const loginForm = async (request, response) => {
    response.render("admin/login");
}

const login = async(request, response) =>{
    let auth = await adminModel.authenticateAdmin(request.body.user, request.body.pass);
    console.log(auth);
    if(auth){
        request.session.loggedIn = true;
        request.session.user = request.body.user;
        response.redirect("/admin");
    }else{
        response.render("admin/login");
    }
}

const logout = async (request, response) =>{
    request.session.destroy();
    response.redirect("/");
}

const registerForm = async(request, response) => {
    response.render("admin/register");
}

const register = async(request, response) => {
    let result = await adminModel.addAdmin(request.body.user, request.body.pass);
    console.log(result);
    if(result){
        response.redirect("/admin/login");
    }else{
        response.render("admin/register", {err: "Username already exists"});
    }
}

module.exports = {
    loginForm,
    login,
    adminPage,
    logout,
    registerForm,
    register
}