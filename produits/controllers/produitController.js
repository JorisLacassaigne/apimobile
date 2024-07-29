const ProduitModel = require("../models/produitModel");


const ProduitController = {


    //Avoir tous les produits
    getAllProduit: async (req, res) => {
        try {
            const produits = await ProduitModel.getAllProduit();
            res.json(produits);
        } catch (error) {
            res
                .status(500)
                .send("Erreur lors de la récupération des produits : " + error.message);
        }
    },



    // Avoir un seul produit par son ID
    getProduitById: async (req, res) => {

        try {
            const reference = req.params.reference;
            const produit = await ProduitModel.getProduitById(reference);
            res.json(produit);
        } catch (error) {
            res
                .status(500)
                .send("Erreur lors de la récupération d'un produit : " + error.message)
        }
    },

};


module.exports = ProduitController;