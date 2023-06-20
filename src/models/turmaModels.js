const database = require('../data/data')
const DAO = require('../data/DAO'); // template para executar comandos no banco de dados
const e = require('express');


function turmas() {}

// modelo responsável por fazer a atualização da turma
// o id e o nome da turma são passados via corpo da requisição.
turmas.prototype.updateTurma = function(callback, nomeTurma, idTurma, serieTurma, idDisciplina) {
    var sql = 'UPDATE turma set nome = ?, serie = ?, id_disciplina = ? WHERE id_turma = ?';

    // executa a atualização e verifica se houve algum erro
    DAO.update(sql, [nomeTurma, serieTurma, idDisciplina, idTurma], retorno => {
        callback(retorno)
    });
}

// modelo responsável por fazer a consulta de uma turma específica
turmas.prototype.getTurma = function(callback, idTurma, idProfessor) {
    var sql = 'SELECT * FROM turma WHERE id_turma = ? AND id_professor = ?';

    // executa a consulta sql e retorna os dados na função callback

    DAO.select(sql, [idTurma, idProfessor], retorno => {
       if(retorno.length > 0) {
           callback(retorno)
       } else {
            callback('turma não encontrada')
       }
    });
}

// modelo responsável por fazer a consulta das turmas de acordo com o id do professor
// esse id é passado via url. Ex.: turmas?idProfessor=1
turmas.prototype.getProfTurmas = function(callback, idProf) {
    var sql = 'SELECT * FROM turma WHERE id_professor = ?';

    // executa a consulta sql e retorna os dados na função callback
    DAO.select(sql, [idProf], retorno => {
        callback(retorno)
    });
}

// modelo responsável por fazer a listagem de todos os alunos da turma.
// o id é obtido via url. Ex.: turmas?idTurma=1
turmas.prototype.getTurmaAlunos = function(callback, idTurma) {

    // essa consulta une as tabelas aluno, aluno_turma e turma para trazer os dados
    // dos alunos da turma do id especificado
    var sql = 'SELECT aluno.id_aluno, aluno.nome as nome_aluno, turma.id_turma, turma.nome as nome_turma ' +
    'FROM aluno_turma ' +
    'JOIN aluno ON aluno_turma.id_aluno = aluno.id_aluno ' +
    'JOIN turma ON aluno_turma.id_turma = turma.id_turma ' +
    'WHERE aluno_turma.id_turma = ?';

    DAO.select(sql, [idTurma], retorno => {
        callback(retorno)
    });
}

// modelo responsável por criar uma turma e criar o relacionamento turma_disciplina logo em seguida
turmas.prototype.postTurma = function(callback, idProfessor, idDisciplina, nomeTurma, serieTurma) {

    // nesse ponto, a turma é criada com o nome, serie e id do professor
    // passados via corpo da requisição
    var sql = 'INSERT INTO turma (nome, serie, id_professor, id_disciplina) VALUES (?,?,?,?);';

    database.appDB.run(sql, [nomeTurma, serieTurma, idProfessor, idDisciplina], function(err) {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(this.lastID)
        }
    });
}

// modelo responsável por deletar a turma. O id é informado via url, ex.: /turma/deletar?idTurma=1
turmas.prototype.deleteTurma = function(callback, idTurma) {
    var sql = 'DELETE FROM turma WHERE id_turma = ?';

    // executa a consulta sql e retorna os dados na função callback
    DAO.delete(sql, [idTurma], retorno => {
        callback(retorno)
    });
}

// modelo responsável por pegar a disciplina da turma
turmas.prototype.getDisciplinaDaTurma = function(callback, idTurma, idProfessor) {
    // se não informar o id da turma, retorna o nome da disciplina de todas as turmas do professor
    if(idTurma == undefined || idTurma == '') {
        var sql = 'SELECT disciplina.nome, disciplina.id_disciplina FROM disciplina JOIN turma ON disciplina.id_disciplina = turma.id_disciplina WHERE turma.id_professor = ?';

        // executa a consulta sql e retorna os dados na função callback
        DAO.select(sql, [idProfessor], retorno => {
            callback(retorno)
        });
    } else {
        var sql = 'SELECT disciplina.nome, disciplina.id_disciplina FROM disciplina ' +
        'JOIN turma ON disciplina.id_disciplina = turma.id_disciplina ' +
        'WHERE turma.id_turma = ?';

        // executa a consulta sql e retorna os dados na função callback
        DAO.select(sql, [idTurma], retorno => {
            callback(retorno)
        });
    }
}

module.exports = function(){
    return turmas;
}