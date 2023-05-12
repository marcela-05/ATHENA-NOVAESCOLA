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

// modelo responsável por criar um aluno
alunos.prototype.postAluno = function(callback, nomeAluno, serieAluno, idProfessor) {

    // nesse ponto, o aluno é criado com o nome, serie e id do professor
    // passados via corpo da requisição
    var sql = 'INSERT INTO aluno (nome, serie, id_professor) VALUES ( "' + 
    nomeAluno + '",' + serieAluno + ',' + idProfessor + ');';
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback({message: 'Aluno inserido com sucesso.' })
    });
}

module.exports = function(){
    return alunos;
}