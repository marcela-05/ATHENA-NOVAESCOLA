const database = require('../data/data')

// cria a classe DAO - Database Access Objects
function DAO() {}

// template para executar comandos de select no banco de dados
DAO.prototype.select = function(sql, params, callback) {
    database.appDB.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(rows)
        }
    });
}

// template para executar comandos de insert no banco de dados
DAO.prototype.insert = function(sql, params, callback) {
    database.appDB.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// template para executar comandos de update no banco de dados
DAO.prototype.update = function(sql, params, callback) {
    database.appDB.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// template para executar comandos de delete no banco de dados
DAO.prototype.delete = function(sql, params, callback) {
    database.appDB.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

module.exports = new DAO()