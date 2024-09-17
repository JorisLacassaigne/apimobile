const { executeQuery } = require('../database');
const {getConnection} = require("mysql/lib/Pool"); // Assurez-vous d'ajuster le chemin du fichier

/**
 * Fonction pour traiter une commande
 * @param {string} codec - ID du client
 * @param {Date} dateCommande - Date de la commande
 * @param {number} totalHT - Total hors taxes de la commande
 * @param {Array} lignesCommande - Liste des articles commandés
 * @returns {Promise<Object>} - Résultat de l'opération
 */
const processOrder = async (codec, dateCommande, totalHT, lignesCommande) => {
    const connection = await getConnection();

    try {
        await connection.beginTransaction(); // Commencer une transaction

        // Insérer la commande
        const [orderResult] = await connection.query(
            'INSERT INTO orders (codec, date_commande, total_ht) VALUES (?, ?, ?)',
            [codec, dateCommande, totalHT]
        );

        const orderId = orderResult.insertId;

        // Insérer les lignes de commande
        for (const ligne of lignesCommande) {
            await connection.query(
                'INSERT INTO order_lines (numero_ligne, reference, quantite_demandee) VALUES (?, ?, ?)',
                [numero_ligne, ligne.reference, ligne.quantite_demandee]
            );
        }

        await connection.commit(); // Commit la transaction

        return { orderId };

    } catch (error) {
        await connection.rollback(); // Rollback en cas d'erreur
        console.error('Erreur lors du traitement de la commande:', error);
        throw new Error('Erreur lors du traitement de la commande');
    } finally {
        connection.release(); // Libérer la connexion
    }
};

module.exports = processOrder;
