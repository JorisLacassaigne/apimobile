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

    // Récupérer les nouveaux produits
    getNewProduit : async () => {
        const sql =
            "SELECT p.reference, p.designation, p.quantite, p.stock, p.poidsPiece, p.prixUnitaireHT\n" +
            "FROM produit p\n" +
            "LEFT JOIN (\n" +
            "SELECT lc.reference, MIN(c.dateCommande) AS premiere_commande\n" +
            "FROM ligne_commande lc\n" +
            "JOIN commande c ON lc.numero = c.numero\n" +
            "GROUP BY lc.reference) commandes_produit ON p.reference = commandes_produit.reference\n" +
            "WHERE commandes_produit.premiere_commande IS NULL\n" +
            "OR commandes_produit.premiere_commande >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH);"
        return await db.executeQuery(sql);
    },

    // Récupérer les nouveaux produits
    getPopProduit : async () => {
        const sql =
            "SELECT p.reference, \n" +
            "       p.designation, \n" +
            "       p.quantite, \n" +
            "       p.stock, \n" +
            "       p.poidsPiece, \n" +
            "       p.prixUnitaireHT, \n" +
            "       SUM(lc.quantite_demandee) AS total_vendus\n" +
            "FROM produit p\n" +
            "JOIN ligne_commande lc ON p.reference = lc.reference\n" +
            "GROUP BY p.reference, p.designation, p.quantite, p.prixUnitaireHT\n" +
            "ORDER BY total_vendus DESC\n" +
            "LIMIT 5;\n"
        return await db.executeQuery(sql);
    }
};

module.exports = ProduitModel;