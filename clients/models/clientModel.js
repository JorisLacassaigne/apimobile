const db = require("../../database");

const ClientModel = {
  // Login
  findClientByEmail: async (email) => {
    const sql = "SELECT * FROM client WHERE email = ?";
    const result = await db.executeQuery(sql, [email]);
    return result;
  },

  // Récupération d'un produit par référence
  getClientById: async (codec) => {
    const sql = "SELECT * FROM client WHERE codec = ?";
    return await db.executeQuery(sql, [codec]);
  },
};

module.exports = ClientModel;
