const CommandeModel = require("../models/commandeModel");
const LigneCommandeModel = require("../models/ligneCommandeModel");

const CommandeController = {
    // Créer une nouvelle commande avec ses lignes
    createCommande: async (req, res) => {
        try {
            const {codev, codec, dateCommande, totalHT, lignesCommande } = req.body;

            // Créer une nouvelle commande
            const numeroCommande = await CommandeModel.createCommande(codev, codec, dateCommande, totalHT);

            // Ajouter les lignes de commande
            await LigneCommandeModel.addLignesCommande(numeroCommande, lignesCommande);

            res.status(201).json({ message: 'Commande créée avec succès', numeroCommande });
        } catch (error) {
            res.status(500).send("Erreur lors de la création de la commande : " + error.message);
        }
    },

    // Récupérer une commande par son ID
    getCommandeById: async (req, res) => {
        try {
            const numero = req.params.numero;
            const commande = await CommandeModel.getCommandeById(numero);
            res.json(commande);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération d'une commande : " + error.message);
        }
    },

    // Récupérer les commandes d'un client
    getCommandeByClient: async (req, res) => {
        try {
            const codec = req.params.codec;
            const commande = await CommandeModel.getCommandeByClient(codec);
            res.json(commande);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération des commandes : " + error.message);
        }
    },

    // Récupérer les commandes d'un client via son email
    getCommandeByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const commande = await CommandeModel.getCommandeByEmail(email);
            res.json(commande);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération des commandes : " + error.message);
        }
    },

    // Récupérer toutes les commandes
    getAllCommande: async (req, res) => {
        try {
            const commandes = await CommandeModel.getAllCommande();
            res.json(commandes);
        } catch (error) {
            res.status(500).send("Erreur lors de la récupération des commandes : " + error.message);
        }
    },
};

module.exports = CommandeController;
