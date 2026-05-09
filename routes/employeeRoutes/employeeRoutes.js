const express = require("express");

const createEmployee = require("./createEmployee");
const getEmployees = require("./getEmployees");
const getEmployee = require("./getEmployee");
const updateEmployee = require("./updateEmployee");
const deleteEmployee = require("./deleteEmployee");
//const seedEmployees = require("./seedEmployees");

const router = express.Router();

router.post("/createEmployee", createEmployee);
//router.post("/seed", seedEmployees);

router.get("/getEmployees", getEmployees);

router.get("/getEmployee/:id", getEmployee);

router.put("/updateEmployee/:id", updateEmployee);

router.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = router;