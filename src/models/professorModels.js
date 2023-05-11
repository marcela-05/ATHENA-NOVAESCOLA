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

// modelo responsável por criar um professor
professores.prototype.postProfessor = function(callback, senhaProfessor, nomeProfessor, emailProfessor) {

    // nesse ponto, o professor é criado com o nome, email e senha
    // passados via corpo da requisição
    var sql = 'INSERT INTO professor (nome, email, senha) VALUES ( "' + 
    nomeProfessor + '", "' + emailProfessor + '", "' + senhaProfessor + '");';
    var erro = ''
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message);
            erro = err; // caso haja erro na inserção, ele é inserido na variável erro
        }
        callback("Professor inserido com sucesso!")
    });
}

module.exports = function(){
    return professores;
}