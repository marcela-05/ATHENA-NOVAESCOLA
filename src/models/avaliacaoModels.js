const database = require('../data/data')
const DAO = require('../data/DAO'); // template para executar comandos no banco de dados
const e = require('express');


function avaliacoes() {}

// modelo responsável por listar avaliações
avaliacoes.prototype.getAvaliacoes = function(callback, idProf, idAvaliacao) {
    if(idAvaliacao == undefined){
        var sql = 'SELECT * FROM avaliacao WHERE id_professor = ?';
        var params = [idProf]
    } else{
        var sql = 'SELECT * FROM avaliacao WHERE id_professor = ? AND id_avaliacao = ?';
        var params = [idProf, idAvaliacao]
    }
    // executa a consulta sql e retorna os dados na função callback
    DAO.select(sql, params, retorno => {
        callback(retorno)
    });
}

// modelo responsável por criar uma avaliação
avaliacoes.prototype.postAvaliacao = function(callback, idProfessor, nomeAvaliacao, serieAvaliacao, idDisciplina, quantQuestoes) {

    // nesse ponto, o professor é criado com o nome, data e serie
    // passados via corpo da requisição
    var sql = 'INSERT INTO avaliacao (nome_avaliacao, data, serie, num_total_questoes, id_professor, id_disciplina) VALUES (?,?,?,?,?,?);';
    let data = new Date().toLocaleDateString('pt-BR') // data atual
    
    database.appDB.run(sql, [nomeAvaliacao, data, serieAvaliacao, quantQuestoes, idProfessor, idDisciplina], function(err) {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(this.lastID)
        }
    });
}

avaliacoes.prototype.updateAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idAvaliacao) {
    var sql = 'UPDATE avaliacao set nome = ? AND data = ? AND serie = ? WHERE id_avaliacao = ?';

    // executa a atualização e verifica se houve algum erro
    DAO.update(sql, [nomeAvaliacao, dataAvaliacao, serieAvaliacao, idAvaliacao], retorno => {
        callback(retorno)
    });
}

// modelo responsável por deletar uma avaliação
avaliacoes.prototype.deleteAvaliacao = function(callback, idAvaliacao) {
    var sql = 'DELETE FROM avaliacao WHERE id_avaliacao =?';

    // executa a consulta sql e retorna os dados na função callback
    DAO.delete(sql, [idAvaliacao], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return avaliacoes;
}

