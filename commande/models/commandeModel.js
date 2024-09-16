const db = require("../../database");

const CommandeModel = {
    // Créer une nouvelle commande
    createCommande: async (codev, codec, dateCommande, totalHT) => {
        const sql = `INSERT INTO commande (codev, codec, dateLivraison, dateCommande, totalHT)
                     VALUES (?, ?, NULL, ?, ?)`;
        const result = await db.executeQuery(sql, [codev, codec, dateCommande, totalHT]);
        return result.insertId;  // Retourne l'ID de la commande créée
    },

    // Récupérer une commande par son ID
    getCommandeById: async (numero) => {
        const sql = "SELECT * FROM commande WHERE numero = ?";
        const result = await db.executeQuery(sql, [numero]);
        return result;
    },

    // Récupérer les commandes d'un client
    getCommandeByClient: async (codec) => {
        const sql = "SELECT * FROM commande WHERE codec = ?";
        const result = await db.executeQuery(sql, [codec]);
        return result;
    },

    // Récupérer les commandes en fonction de l'email client
    getCommandeByEmail: async (email) => {
        const sql = "SELECT c.* FROM commande c JOIN client cl ON c.codec = cl.codec WHERE cl.email = ?";
        const result = await db.executeQuery(sql, [email]);
        return result;
    },

    // Récupérer toutes les commandes
    getAllCommande: async () => {
        const sql = "SELECT * FROM commande";
        return await db.executeQuery(sql);
    },
};

module.exports = CommandeModel;
