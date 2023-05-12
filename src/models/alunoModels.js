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

// modelo responsável por fazer a atualização do aluno
alunos.prototype.updateAluno = function(callback, nomeAluno, serieAluno, idAluno) {
    var sql = 'UPDATE aluno set nome = "' + nomeAluno + '", serie = ' + serieAluno +
    ' WHERE id_aluno = ' + idAluno;

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err)
        } else {
            callback({message: 'Aluno atualizado'})
        }
    });
}

module.exports = function(){
    return alunos;
}