const sql = require('mssql');

const configurace = {
    server: '192.168.0.151', // Nebo IP adresa serveru
    database: 'piskvorky',
    options: {
        encrypt: false, // Pokud používáte SSL, nastavte na true
        enableArithAbort: true
    },
    authentication: {
        type: 'default'
    }
};

// Připojení k databázi
const poolPromise = new sql.ConnectionPool(configurace)
    .connect()
    .then(pool => {
        console.log('Připojeno k databázi');
        return pool;
    })
    .catch(err => {
        console.error('Chyba připojení k databázi:', err);
    });

module.exports = {
    sql, poolPromise
};
