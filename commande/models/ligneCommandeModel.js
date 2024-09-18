const db = require("../../database");

const LigneCommandeModel = {
    // Ajouter des lignes de commande
    addLignesCommande: async (numero, lignesCommande) => {
        const sql = `INSERT INTO ligne_commande (numero, numero_ligne, reference, quantite_demandee)
                     VALUES ?`;

        const lignesData = lignesCommande.map((ligne, index) => [
            numero,
            index + 1,  // numéro de ligne
            ligne.reference,
            ligne.quantite_demandee
        ]);

        const result = await db.executeQuery(sql, [lignesData]);
        return result;
    },

    // Récupérer les lignes d'une commande
    getLignesByCommandeId: async (numero) => {
        const sql = "SELECT * FROM ligne_commande WHERE numero = ?";
        const result = await db.executeQuery(sql, [numero]);
        return result;
    }
};

module.exports = LigneCommandeModel;
