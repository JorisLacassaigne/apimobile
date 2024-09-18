const express = require("express");
const commandeController = require("../controllers/commandeController");
const auth = require("../../middleware/auth");
const router = express.Router();

// Route pour créer une commande
router.post('/commande',  commandeController.createCommande);

// Route pour récupérer une commande par son ID
router.get('/commande/:numero', commandeController.getCommandeById);

// Route pour récupérer les commandes d'un client par ID
router.get('/commande/client/:codec', commandeController.getCommandeByClient);

// Route pour récupérer les commandes d'un client par email
router.get('/commande/email/:email', commandeController.getCommandeByEmail);

// Route pour récupérer toutes les commandes
router.get('/commandes', commandeController.getAllCommande);

module.exports = router;
