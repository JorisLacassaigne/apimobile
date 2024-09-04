const CommandeModel = require("../models/commandeModel")
const CommandeController = {

   getCommandeById: async (req, res) => {
       try {
           const numero = req.params.numero;
           const commande = await CommandeModel.getCommandeById(numero);
           res.json(commande);
       } catch (error) {
           res
               .status(500)
               .send("Erreur lors de la récupération d'une commande : " + error.message);
       }
   },
    getCommandeByClient: async (req,res) => {
        try {
            const codec = req.params.codec;
            const commande = await CommandeModel.getCommandeByClient(codec);
            res.json(commande);
        } catch (error) {
            res
                .status(500)
                .send("Erreur lors de la récupération des commandes : " + error.message);
        }
    },

    getCommandeByEmail: async (req,res) => {
        try {
            const email = req.params.email;
            const commande = await CommandeModel.getCommandeByEmail(email);
            res.json(commande);
        } catch (error) {
            res
                .status(500)
                .send("Erreur lors de la récupération des commandes : " + error.message);
        }
    },

    getAllCommande: async (req, res) => {
        try {
            const commandes = await CommandeModel.getAllCommande();
            res.json(commandes);
        } catch (error) {
            res
                .status(500)
                .send("Erreur lors de la récupération d'une commande : " + error.message);
        }
    },

};

module.exports = CommandeController;
