const ClientModel = require("../models/clientModel");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const ClientController = {
  login: async (req, res) => {
    const { email, motdepasse } = req.body;
    // console.log(motdepasse, email);
    try {
      const rows = await ClientModel.findClientByEmail(email);
      /*     (rows.length)  cest comme (rows.length > 0) -----> On verifie donc s'il y a des données dans 'email'     */
      if (rows.length) {
        const match = await compare(motdepasse, rows[0].motdepasse);
        if (match) {
          // console.log(process.env.JWT_SECRET);
          const token = jwt.sign(
            { codec: rows[0].codec },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
          );
          res.status(200).json({ success: true, token });
        } else {
          res
            .status(401)
            .json({ success: false, messages: "Mot de passe incorrect." });
        }
      } else {
        res
          .status(401)
          .json({ success: false, message: "Adresse e-mail non trouvée." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Erreur de serveur." + error,
      });
    }
  },

  getClientById: async (req, res) => {
    try {
      const codec = req.params.codec;
      const client = await ClientModel.getClientById(codec);
      res.json(client);
    } catch (error) {
      res
        .status(500)
        .send("Erreur lors de la récupération d'un produit : " + error.message);
    }
  },
};

module.exports = ClientController;
