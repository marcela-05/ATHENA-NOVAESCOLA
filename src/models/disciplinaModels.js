const database = require('../data/data')
const DAO = require('../data/DAO') // template para executar comandos no banco de dados


function disciplinas() {}

// modelo responsável por listar as disciplinas 
disciplinas.prototype.getDisciplinas = function(callback) {
    var sql = 'SELECT * FROM disciplina';

    // executa a consulta sql e retorna os dados na função callback
    DAO.select(sql, [], retorno => {
        callback(retorno)
    });
}

// modelo responsável por criar uma disciplina
disciplinas.prototype.postDisciplina = function(callback, nomeDisciplina, idProfessor) {

    // nesse ponto, a disciplina é criada com o nome passado via corpo da requisição
    var sql = 'INSERT INTO disciplina (nome) VALUES (?);';

    DAO.insert(sql, [nomeDisciplina], retorno => {
        callback(retorno)
    });
}

// modelo responsável por atualizar disciplina
disciplinas.prototype.updateDisciplina = function(callback, idDisciplina, nomeDisciplina) {
    var sql = 'UPDATE disciplina set nome = ? WHERE id_disciplina = ?';

    // executa a atualização e verifica se houve algum erro
    DAO.update(sql, [nomeDisciplina, idDisciplina], retorno => {
        callback(retorno)
    });
}

// modelo responsável por deletar disciplina
disciplinas.prototype.deleteDisciplina = function(callback, idDisciplina) {
    var sql = 'DELETE FROM disciplina WHERE id_disciplina = ?';

    // executa a consulta sql e retorna os dados na função callback
    DAO.delete(sql, [idDisciplina], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return disciplinas;
}
