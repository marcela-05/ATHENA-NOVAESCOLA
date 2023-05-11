const database = require('../data/data')


function professores() {}

professores.prototype.getProfessores = function(callback, idProf) {
    var sql = 'SELECT * FROM professor';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

module.exports = function(){
    return professores;
}