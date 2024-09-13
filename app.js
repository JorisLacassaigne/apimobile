require('dotenv').config();
// L'application nécessite l'installation de body-parser et express
const express = require("express");
const bodyParser = require("body-parser");

// Définition des paramètres du serveur
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();

// Importation du routeur
const produitRouteur = require("./produits/routes/produitRouter");
const clientRouteur = require("./clients/routes/clientRouter");
const commandeRouteur = require("./commande/routes/commandeRouter")
const {config} = require("dotenv");

// MiddleWare pour les fichiers statiques
app.use(express.static("public"));

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration du middleWare pour les en-têtes en CORS
app.use(function (req, res, next) {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header("Acces-Control-Allow-Methods", "GET, POST");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// App utilise le routeur produitRouteur
app.use(produitRouteur);
app.use(clientRouteur);
app.use(commandeRouteur);

// Démarrage du serveur
app.listen(port, hostname, function () {
  console.log(
    "Mon serveur fonctionne sur http://" + hostname + ":" + port + "\n",
  );
});
