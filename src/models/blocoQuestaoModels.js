const database = require('../data/data')
const DAO = require('../data/DAO') // template para executar comandos no banco de dados


function blocos() {}

// modelo responsável por listar os blocos de questões com base na avaliação
blocos.prototype.getBlocos = function(callback, idAvaliacao) {
    var sql = 'SELECT avaliacao.nome_avaliacao, area_conhecimento.nome_area, bloco_questao.num_bloco,' +
    'bloco_questao.quant_questoes ' +
    'FROM avaliacao ' + 'JOIN bloco_questao ON avaliacao.id_avaliacao = bloco_questao.id_avaliacao ' +
    'JOIN area_conhecimento ON bloco_questao.id_area = area_conhecimento.id_area ' +
    'WHERE avaliacao.id_avaliacao = ?';
    DAO.select(sql, [idAvaliacao], retorno => {
        callback(retorno)
    });
}

// modelo responsável por cadastrar um bloco de questões
blocos.prototype.postBloco = function(callback, numBloco, quantQuestoes, idAvaliacao, idArea) {
    var sql = 'INSERT INTO bloco_questao (num_bloco, quant_questoes, id_avaliacao, id_area) VALUES (?,?,?,?)';
    DAO.insert(sql, [numBloco, quantQuestoes, idAvaliacao, idArea], retorno => {
        callback(retorno)
    });
}

// modelo responsável por atualizar um bloco de questões
blocos.prototype.updateBloco = function(callback, numBloco, quantQuestoes, idAvaliacao, idArea) {
    var sql = 'UPDATE bloco_questao SET num_bloco = ? AND quant_questoes = ? WHERE id_area = ? AND num_bloco = ? AND id_avaliacao = ?';
    DAO.update(sql, [numBloco, quantQuestoes, idArea, numBloco, idAvaliacao], retorno => {
        callback(retorno)
    });
}

// modelo responsável por deletar um bloco de questões
blocos.prototype.deleteBloco = function(callback, numBloco, idAvaliacao, idArea) {
    var sql = 'DELETE FROM bloco_questao WHERE id_area = ? AND num_bloco = ? AND id_avaliacao = ?';
    DAO.delete(sql, [idArea, numBloco, idAvaliacao], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return blocos;
}
