const db = require("../../database");


const CommandeModel = {
   getCommandeById: async (numero) => {
       const sql = "SELECT * FROM commande WHERE numero = ?";
       const result = await db.executeQuery(sql, [numero]);
       return result;
   },

    getCommandeByClient: async (codec) => {
      //  const sql = "SELECT * FROM commande WHERE codec = ?";
        //const result = await db.executeQuery(sql, [codec]);
        //return result;
    },

    getCommandeByEmail: async (email) => {
        const sql = "SELECT * FROM commande JOIN client ON commande.codec = client.codec WHERE client.email = ?";
        const result = await db.executeQuery(sql, [email]);
        return result;
    },

   getAllCommande: async () => {
       const sql = "SELECT * FROM commande";
       return await db.executeQuery(sql);
   },
};

module.exports = CommandeModel;
