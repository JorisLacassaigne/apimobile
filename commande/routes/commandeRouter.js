const express = require("express");
const commandeController = require("../controllers/commandeController");
const auth = require("../../middleware/auth");
const router = express.Router();

// Get toutes les commandes
router.get("/commandes", commandeController.getAllCommande);

// Get une seule commande, par son ID
router.get("/commande/:numero", commandeController.getCommandeById);

// Get toutes les commandes d'un client
router.get("/commandess/:codec", commandeController.getCommandeByClient);

// Get par email
router.get("/commandes/:email", commandeController.getCommandeByEmail);

module.exports = router;
