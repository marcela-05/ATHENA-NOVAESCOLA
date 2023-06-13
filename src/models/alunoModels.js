const database = require('../data/data')
const DAO = require('../data/DAO') // template para executar comandos no banco de dados


function alunos() {}

// modelo responsável por listar alunos
alunos.prototype.getAlunos = function(callback, idProfessor) {
    var sql = 'SELECT * FROM aluno WHERE id_professor = ?';
    
    // executa a consulta sql e retorna os dados na função callback
    DAO.select(sql, [idProfessor], retorno => {
        callback(retorno)
    });
}

// modelo responsável por criar um aluno
alunos.prototype.postAluno = function(callback, nomeAluno, serieAluno, idProfessor) {

    // nesse ponto, o aluno é criado com o nome, serie e id do professor
    // passados via corpo da requisição
    var sql = 'INSERT INTO aluno (nome, serie, id_professor) VALUES (?,?,?);';
    DAO.insert(sql, [nomeAluno, serieAluno, idProfessor], retorno => {
        callback(retorno)
    });
}

// modelo responsável por fazer a atualização do aluno
alunos.prototype.updateAluno = function(callback, nomeAluno, serieAluno, idAluno) {
    var sql = 'UPDATE aluno set nome = ? AND serie = ? WHERE id_aluno = ?';

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    DAO.update(sql, [nomeAluno, serieAluno, idAluno], retorno => {
        callback(retorno)
    });
}

// modelo responsável por deletar um aluno
alunos.prototype.deleteAluno = function(callback, idAluno) {
    var sql = 'DELETE FROM aluno WHERE id_aluno = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    DAO.delete(sql, [idAluno], retorno => {
        callback(retorno)
    });
} 

// modelo responsável por vincular o aluno a uma turma
alunos.prototype.vinculaTurma = function(callback, idAluno, idTurma) {
    var sql = 'INSERT INTO aluno_turma (id_aluno, id_turma) VALUES (?,?)';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    DAO.insert(sql, [idAluno, idTurma], retorno => {
        callback(retorno)
    });
};

// modelo responsável por desvincular o aluno de uma turma
alunos.prototype.desvinculaTurma = function(callback, idAluno, idTurma) {
    var sql = 'DELETE FROM aluno_turma WHERE id_aluno = ? AND id_turma = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    DAO.delete(sql, [idAluno, idTurma], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return alunos;
}