const db = require("../../database");

const LigneCommandeModel = {
    // Ajouter des lignes de commande
    addLignesCommande: async (numeroCommande, lignesCommande) => {
        const sql = `INSERT INTO ligne_commande (reference, quantite_demandee)
                     VALUES ?`;

        const lignesData = lignesCommande.map((ligne, index) => [
            numeroCommande,
            index + 1,  // numéro de ligne
            ligne.reference,
            ligne.quantite_demandee
        ]);

        const result = await db.executeQuery(sql, [lignesData]);
        return result;
    },

    /*addLignesCommande: async (numeroCommande, lignesCommande) => {
        const sql = `INSERT INTO ligne_commande (numero, numero_ligne, reference, quantite_demandee)
                     VALUES ?`;

        const lignesData = lignesCommande.map((ligne, index) => [
            numeroCommande,
            index + 1,  // numéro de ligne
            ligne.reference,
            ligne.quantite_demandee
        ]);

        const result = await db.executeQuery(sql, [lignesData]);
        return result;
    },*/

    // Récupérer les lignes d'une commande
    getLignesByCommandeId: async (numeroCommande) => {
        const sql = "SELECT * FROM ligne_commande WHERE numero = ?";
        const result = await db.executeQuery(sql, [numeroCommande]);
        return result;
    }
};

module.exports = LigneCommandeModel;
