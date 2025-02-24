const express = require("express");
const router = express.Router();

const { showallproject, showadd, addNewProject, deleteProjectById, showapiproject } = require("./controller");
router.get("/list", showallproject);
router.get("/add", showadd);
router.post("/add/submit", addNewProject);
router.get("/delete/submit",deleteProjectById);
router.get("/api/list", showapiproject);

module.exports = router