const database = require('../data/data')


function alunos() {}

// modelo responsável por listar alunos
alunos.prototype.getAlunos = function(callback, idProfessor) {
    var sql = 'SELECT * FROM aluno WHERE id_professor = ?';
    
    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
        }else{
            callback(rows)
        }
    });
}

// modelo responsável por criar um aluno
alunos.prototype.postAluno = function(callback, nomeAluno, serieAluno, idProfessor) {

    // nesse ponto, o aluno é criado com o nome, serie e id do professor
    // passados via corpo da requisição
    var sql = 'INSERT INTO aluno (nome, serie, id_professor) VALUES (?,?,?);';
    database.appDB.all(sql, [nomeAluno, serieAluno, idProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por fazer a atualização do aluno
alunos.prototype.updateAluno = function(callback, nomeAluno, serieAluno, idAluno) {
    var sql = 'UPDATE aluno set nome = ? AND serie = ? WHERE id_aluno = ?';

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [nomeAluno, serieAluno,idAluno], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else {
            callback()
        }
    });
}

// modelo responsável por deletar um aluno
alunos.prototype.deleteAluno = function(callback, idAluno) {
    var sql = 'DELETE FROM aluno WHERE id_aluno = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idAluno], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback()
        }
    });
}

module.exports = function(){
    return alunos;
}