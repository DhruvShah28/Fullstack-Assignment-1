const express = require("express");
const router = express.Router();

const { loginForm, login, logout, registerForm, register, adminPage } = require("./controller");



router.get("/", adminPage);

router.get("/login", loginForm);

router.post("/login", login);

router.get("/logout", logout);

router.get("/register", registerForm);

router.post("/register", register);

module.exports = router;