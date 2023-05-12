const database = require('../data/data')


function avaliacoes() {}

// modelo responsável por listar avaliações
avaliacoes.prototype.getAvaliacoes = function(callback, idProf) {
    var sql = 'SELECT * FROM avaliacao WHERE id_professor = ' + idProf;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

// modelo responsável por criar uma avaliação
avaliacoes.prototype.postAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idProfessor) {

    // nesse ponto, o professor é criado com o nome, data e serie
    // passados via corpo da requisição
    var sql = 'INSERT INTO avaliacao (nome, data, serie, id_professor) VALUES ( "' + 
    nomeAvaliacao + '", "' + dataAvaliacao + '", "' + serieAvaliacao + '", "' + idProfessor + '");';
    var erro = ''
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback({message: 'avaliacao criada e vinculada ao professor'})
    });
}

avaliacoes.prototype.updateAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idAvaliacao) {
    console.log("aqui")
    var sql = 'UPDATE avaliacao set nome = "' + nomeAvaliacao + '", data = "' + dataAvaliacao + '", serie = "' + serieAvaliacao + '"' +
    'WHERE id_avaliacao = ' + idAvaliacao;

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback({message: 'avaliacao atualizada'})
    });
}

// modelo responsável por deletar uma avaliação
avaliacoes.prototype.deleteAvaliacao = function(callback, idAvaliacao) {
    var sql = 'DELETE FROM avaliacao WHERE id_avaliacao = ' + idAvaliacao;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback({message: 'Avaliacao Excluída'})
    });
}

module.exports = function(){
    return avaliacoes;
}

