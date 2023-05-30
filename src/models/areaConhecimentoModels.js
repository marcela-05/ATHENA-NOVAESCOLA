const database = require('../data/data')


function areaConhecimento() {}

// modelo responsável por listar áreas do conhecimento
areaConhecimento.prototype.getAreaConhecimento = function(callback, idDisciplina) {
    var sql = 'SELECT * FROM area_conhecimento WHERE id_disciplina = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idDisciplina], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(rows)
        }
    });
}

// modelo responsável por criar uma área do conhecimento
areaConhecimento.prototype.postAreaConhecimento = function(callback, nomeArea, idDisciplina) {

    // nesse ponto, a área do conhecimento é criada com o nome
    // passados via corpo da requisição
    var sql = 'INSERT INTO area_conhecimento (nome, id_disciplina) VALUES (?,?);';
    var erro = ''
    database.appDB.all(sql, [nomeArea, idDisciplina], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback();
        }
        
    });

}

// modelo resposável por atualizar uma área do conhecimento
areaConhecimento.prototype.updateAreaConhecimento = function(callback, idArea, nomeArea, idDisciplina) {
    var sql = 'UPDATE area_conhecimento set nome = ? AND id_disciplina = ? WHERE id_area = ?';

    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [idArea, nomeArea, idDisciplina], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback()
        }
    });
}

// modelo resposável por apagar uma área do conhecimento
areaConhecimento.prototype.deleteAreaConhecimento = function(callback, idArea) {
    var sql = 'DELETE FROM area_conhecimento WHERE id_area = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idArea], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
            }else{
            callback()
            }
    });
}

module.exports = function(){
    return areaConhecimento;
}

