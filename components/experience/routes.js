const express = require("express");
const router = express.Router();

const { showallexperience, showadd, addNewExperience, deleteExperienceById, showapiexperience } = require("./controller");

router.get("/list", showallexperience);
router.get("/add", showadd);
router.post("/add/submit",addNewExperience);
router.get("/delete/submit",deleteExperienceById);
router.get("/api/list", showapiexperience);

module.exports = router;