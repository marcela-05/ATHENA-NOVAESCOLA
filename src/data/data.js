const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'src/data/novo_banco.db';


// Cria conexão com o banco de dados
const appDB = new sqlite3.Database(DBPATH, sqlite3.OPEN_READWRITE, err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexão estabelecida com banco de dados');
});

// Exporta o objeto appDB
module.exports = {appDB};