const express = require("express");
const ProduitController = require("../controllers/produitController");
const auth = require("../../middleware/auth");
const router = express.Router();

// Get tous les produits
router.get("/produits", ProduitController.getAllProduit);

// Get un seul produit, par son ID
router.get("/produit/:reference", ProduitController.getProduitById);

// Get tous les nouveaux produits
router.get("/produits/new", ProduitController.getNewProduit);

// Get tous les produits populaires
router.get("/produits/popular", ProduitController.getPopProduit);

module.exports = router;
