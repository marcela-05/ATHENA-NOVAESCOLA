const DAO = require('../data/DAO') // template para executar comandos no banco de dados


function areaConhecimento() {}

// modelo responsável por listar informações da área do conhecimento
areaConhecimento.prototype.getAreaConhecimento = function(callback, idArea, disciplinas) {
    if(idArea == undefined || idArea == ''){
        // se o id da área não for passado, então a consulta sql trará todas as áreas, considerando as disciplinas do professor

        // formata as disciplinas para serem usadas na consulta sql
        let disciplinasFormatadas = ''
        for (let disciplina of disciplinas) {
            disciplinasFormatadas += disciplina.id_disciplina + ','
        }
        disciplinasFormatadas = disciplinasFormatadas.slice(0, -1)

        var sql = 'SELECT * FROM area_conhecimento WHERE id_disciplina IN (' + disciplinasFormatadas + ') ORDER BY id_disciplina ASC;';
        
        // executa a consulta sql e retorna os dados na função callback
        DAO.select(sql, [], retorno => {
            callback(retorno)
        });

    } else {
        // se o id da área for passado, então a consulta sql trará somente a área com o id passado
        var sql = 'SELECT * FROM area_conhecimento WHERE id_area = ?';

        // executa a consulta sql e retorna os dados na função callback
        DAO.select(sql, [idArea], retorno => {
            callback(retorno)
        });
    }
}

// modelo responsável por trazer o nome da disciplina da área do conhecimento
areaConhecimento.prototype.getNomeDisciplina = function(callback, idArea, disciplinas) {
    if (idArea == undefined || idArea == '') {
        // formata as disciplinas para serem usadas na consulta sql
        let disciplinasFormatadas = ''
        for (let disciplina of disciplinas) {
            disciplinasFormatadas += disciplina.id_disciplina + ','
        }
        disciplinasFormatadas = disciplinasFormatadas.slice(0, -1)

        var sql = 'SELECT disciplina.nome FROM area_conhecimento JOIN disciplina ON area_conhecimento.id_disciplina = disciplina.id_disciplina WHERE disciplina.id_disciplina IN (' + disciplinasFormatadas + ') ORDER BY area_conhecimento.id_disciplina ASC';
        // executa a consulta sql e retorna os dados na função callback
        DAO.select(sql, [], retorno => {
            callback(retorno)
        });

    } else {
        var sql = 'SELECT disciplina.nome FROM area_conhecimento JOIN disciplina ON area_conhecimento.id_disciplina = disciplina.id_disciplina WHERE area_conhecimento.id_area = ?';
        // executa a consulta sql e retorna os dados na função callback, a qual será usada
        // no controlador para mostrar os dados na página.
        DAO.select(sql, [idArea], retorno => {
            callback(retorno)
        });
    }
}

// modelo responsável por criar uma área do conhecimento
areaConhecimento.prototype.postAreaConhecimento = function(callback, nomeArea, idDisciplina) {

    // nesse ponto, a área do conhecimento é criada com o nome
    // passados via corpo da requisição
    var sql = 'INSERT INTO area_conhecimento (nome_area, id_disciplina) VALUES (?,?);';
    DAO.insert(sql, [nomeArea, idDisciplina], retorno => {
        callback(retorno)
    });
}

// modelo resposável por atualizar uma área do conhecimento
areaConhecimento.prototype.updateAreaConhecimento = function(callback, idArea, nomeArea, idDisciplina) {
    var sql = 'UPDATE area_conhecimento SET nome_area = ?, id_disciplina = ? WHERE id_area = ?';

    // executa a atualização e verifica se houve algum erro
    DAO.update(sql, [nomeArea, idDisciplina, idArea], retorno => {
        callback(retorno)
    });
}

// modelo resposável por apagar uma área do conhecimento
areaConhecimento.prototype.deleteAreaConhecimento = function(callback, idArea) {
    var sql = 'DELETE FROM area_conhecimento WHERE id_area = ?';

    // executa a consulta sql e retorna os dados na função callback
    DAO.delete(sql, [idArea], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return areaConhecimento;
}

