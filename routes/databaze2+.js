const fs = require('fs');
const { sql, poolPromise } = require('./databaze+');

(async () => {
    try {
        // Připojení k databázi
        const pool = await poolPromise;

        // Načtení SQL souboru
        const sqlScript = fs.readFileSync('./soubor.sql', 'utf8');

        // Spuštění SQL skriptu
        await pool.request().query(sqlScript);
        console.log('SQL skript byl úspěšně spuštěn.');
    } catch (err) {
        console.error('Chyba při spuštění SQL skriptu:', err);
    } finally {
        // Uzavření připojení
        sql.close();
    }
})();