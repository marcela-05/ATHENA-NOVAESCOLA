const database = require('../data/data')


function alunos() {}

alunos.prototype.getAlunos = function(callback, idProf) {
    var sql = 'SELECT * FROM aluno WHERE id_professor = ' + idProf;
    
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
    return alunos;
}