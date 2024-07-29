const express = require("express");
const ClientController = require("../controllers/clientController");
const router = express.Router();

// Login
router.post("/login", ClientController.login);

//Get un seul client
router.get("/client/:codec", ClientController.getClientById);

module.exports = router;
