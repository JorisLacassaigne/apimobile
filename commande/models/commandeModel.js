const db = require("../../database");


const CommandeModel = {
   getCommandeById: async (numero) => {
       const sql = "SELECT * FROM commande WHERE numero = ?";
       const result = await db.executeQuery(sql, [numero]);
       return result;
   },

    getCommandeByClient: async (codec) => {
        const sql = "SELECT * FROM commande WHERE codec = ?";
        const result = await db.executeQuery(sql, [codec]);
        return result;
    },

    getCommandeByEmail: async (email) => {
        const sql = "SELECT c.*\n FROM commande c\n JOIN client cl ON c.codec = cl.codec\n WHERE cl.email = ? ";
        const result = await db.executeQuery(sql, [email]);
        return result;
    },

   getAllCommande: async () => {
       const sql = "SELECT * FROM commande";
       return await db.executeQuery(sql);
   },
};

module.exports = CommandeModel;
