const database = require('../data/data')


function avaliacoes() {}

// modelo responsável por listar avaliações
avaliacoes.prototype.getAvaliacoes = function(callback, idProf) {
    var sql = 'SELECT * FROM avaliacao WHERE id_professor = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idProf], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback(rows)
        }
    });
}

// modelo responsável por criar uma avaliação
avaliacoes.prototype.postAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idProfessor) {

    // nesse ponto, o professor é criado com o nome, data e serie
    // passados via corpo da requisição
    var sql = 'INSERT INTO avaliacao (nome, data, serie, id_professor) VALUES (?,?,?,?);';
    var erro = ''
    database.appDB.all(sql, [nomeAvaliacao,dataAvaliacao,serieAvaliacao,idProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback()
        }
    });
}

avaliacoes.prototype.updateAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idAvaliacao) {
    console.log("aqui")
    var sql = 'UPDATE avaliacao set nome = ? AND data = ? AND serie = ? WHERE id_avaliacao = ?';

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [nomeAvaliacao, dataAvaliacao, serieAvaliacao, idAvaliacao], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback()
        }
    });
}

// modelo responsável por deletar uma avaliação
avaliacoes.prototype.deleteAvaliacao = function(callback, idAvaliacao) {
    var sql = 'DELETE FROM avaliacao WHERE id_avaliacao =?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idAvaliacao], (err, rows) => {
        if (err) {
            console.error(err.message);
        }else{
            callback()
        }
    });
}

module.exports = function(){
    return avaliacoes;
}

