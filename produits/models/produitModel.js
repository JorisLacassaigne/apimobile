const db = require("../../database");



const ProduitModel = {
    // Récupération de tout les produits
    getAllProduit: async () => {
        const sql =
            "SELECT * FROM produit";
        return await db.executeQuery(sql);
    },


    // Récupération d'un produits par référence
    getProduitById: async (reference) => {
        const sql = "SELECT * FROM produit WHERE reference = ?";
        return await db.executeQuery(sql, [reference]);
    },
};

module.exports = ProduitModel;