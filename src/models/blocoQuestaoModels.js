const database = require('../data/data')


function blocos() {}

blocos.prototype.consultaSql = async function(sql) {
    await database.appDB.all(sql, [], (err, rows) => {
        if(err){
            console.error(err.message);
        }
        console.log(rows);
        return rows
    });
}

// modelo responsável por listar os blocos de questões com base na avaliação
blocos.prototype.getBlocos = function(callback, idAvaliacao) {
    var sql = 'SELECT avaliacao.nome_avaliacao, area_conhecimento.nome_area, bloco_questao.num_bloco,' +
    'bloco_questao.quant_questoes ' +
    'FROM avaliacao ' + 'JOIN bloco_questao ON avaliacao.id_avaliacao = bloco_questao.id_avaliacao ' +
    'JOIN area_conhecimento ON bloco_questao.id_area = area_conhecimento.id_area ' +
    'WHERE avaliacao.id_avaliacao = ' + idAvaliacao;
    database.appDB.all(sql, [], (err, rows) => {
        if(err){
            console.error(err.message);
        }
        callback(rows)
    });
}

// modelo responsável por cadastrar um bloco de questões
blocos.prototype.postBloco = function(callback, numBloco, quantQuestoes, idAvaliacao, idArea) {
    var sql = 'INSERT INTO bloco_questao (num_bloco, quant_questoes, id_avaliacao, id_area) VALUES (' +
    numBloco + ', ' + quantQuestoes + ', ' + idAvaliacao + ', ' + idArea + ')';
    database.appDB.run(sql, [], (err, rows) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por atualizar um bloco de questões
blocos.prototype.updateBloco = function(callback, numBloco, quantQuestoes, idAvaliacao, idArea) {
    var sql = 'UPDATE bloco_questao SET num_bloco = ' + numBloco + ', quant_questoes = ' +
    quantQuestoes + ' WHERE id_area = ' + idArea + ' AND num_bloco = ' + numBloco + ' AND id_avaliacao = ' + idAvaliacao;
    database.appDB.run(sql, [], (err, rows) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por deletar um bloco de questões
blocos.prototype.deleteBloco = function(callback, numBloco, idAvaliacao, idArea) {
    var sql = 'DELETE FROM bloco_questao WHERE id_area = ' + idArea + ' AND num_bloco = ' + numBloco + ' AND id_avaliacao = ' + idAvaliacao;
    database.appDB.run(sql, [], (err, rows) => {
        // retorna erro caso o bloco de questões não exista
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

module.exports = function(){
    return blocos;
}
