const express = require("express");
const commandeController = require("../controllers/commandeController");
const auth = require("../../middleware/auth");
const processOrder = require("../processOrder");
const router = express.Router();

// Route pour créer une commande
router.post('/commande', async (req, res) => {
    const { dateCommande, totalHT, lignesCommande } = req.body;

    // Traitement de la commande
    try {
        // Exemple de traitement de la commande. Remplacez par votre logique réelle.
        // Imaginons que vous ayez une fonction `processOrder` qui traite la commande.
        const result = await processOrder(codev, codec, dateCommande, totalHT, lignesCommande);

        res.status(200).json({ message: 'Commande traitée avec succès', result });
    } catch (error) {
        console.error('Erreur lors du traitement de la commande:', error);
        res.status(500).json({ error: 'Erreur lors du traitement de la commande' });
    }
});

// Route pour récupérer une commande par son ID
router.get('/commande/:numero', commandeController.getCommandeById);

// Route pour récupérer les commandes d'un client par ID
router.get('/commande/client/:codec', commandeController.getCommandeByClient);

// Route pour récupérer les commandes d'un client par email
router.get('/commande/email/:email', commandeController.getCommandeByEmail);

// Route pour récupérer toutes les commandes
router.get('/commandes', commandeController.getAllCommande);

module.exports = router;
