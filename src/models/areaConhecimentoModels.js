const database = require('../data/data')


function areaConhecimento() {}

// modelo responsável por listar áreas do conhecimento
areaConhecimento.prototype.getAreaConhecimento = function(callback, idDisciplina) {
    var sql = 'SELECT * FROM area_conhecimento WHERE id_disciplina = ' + idDisciplina;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

// modelo responsável por criar uma área do conhecimento
areaConhecimento.prototype.postAreaConhecimento = function(callback, nomeArea, idDisciplina) {

    // nesse ponto, a área do conhecimento é criada com o nome
    // passados via corpo da requisição
    var sql = 'INSERT INTO area_conhecimento (nome, id_disciplina) VALUES ( "' + 
    nomeArea + '", "' + idDisciplina + '");';
    var erro = ''
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            erro = err; // caso haja erro na inserção, ele é inserido na variável erro
        } 
        callback({message: "area do conhecimento criada"});
    });

}

// modelo resposável por atualizar uma área do conhecimento
areaConhecimento.prototype.updateAreaConhecimento = function(callback, idArea, nomeArea, idDisciplina) {
    var sql = 'UPDATE area_conhecimento set nome = "' + nomeArea + '", id_disciplina = "' + idDisciplina + '"' +
    'WHERE id_area = ' + idArea;

    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback({message:'Area de conhecimento atualizada'})
    });
}

// modelo resposável por apagar uma área do conhecimento
areaConhecimento.prototype.deleteAreaConhecimento = function(callback, idArea) {
    var sql = 'DELETE FROM area_conhecimento WHERE id_area = ' + idArea;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback({message: 'Area do Conhecimento Excluída'})
    });
}

module.exports = function(){
    return areaConhecimento;
}

