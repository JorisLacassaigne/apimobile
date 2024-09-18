const CommandeModel = require("../models/commandeModel");
const LigneCommandeModel = require("../models/ligneCommandeModel");
const fetch = require('node-fetch');

const CommandeController = {
    // Créer une nouvelle commande avec ses lignes
    createCommande: async (req, res) => {
        try {
            // Supposons que le corps de la requête est un blob
            const blob = await req.body;

            // Décoder le blob
            const data = await CommandeController.decodeBlob(blob);

            // Utiliser les données décodées pour créer la commande
            const { codev, codec, dateLivraison, dateCommande, totalHT, lignesCommande } = data;

            // Vérifier que toutes les propriétés nécessaires sont présentes
            if (!codev || !codec || !dateLivraison || !dateCommande || !totalHT || !lignesCommande) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Créer une nouvelle commande
            const numero = await CommandeModel.createCommande(codev, codec, dateLivraison, dateCommande, totalHT);

            // Ajouter les lignes de commande
            await LigneCommandeModel.addLignesCommande(numero, lignesCommande);

            res.status(201).json({ message: 'Commande créée avec succès', numero });
        } catch (error) {
            res.status(500).send("Erreur lors de la création de la commande : " + error.message);
        }
    },

    // Méthode pour décoder le blob
    decodeBlob: async (blob) => {
        const text = await blob.text();
        return JSON.parse(text);
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
