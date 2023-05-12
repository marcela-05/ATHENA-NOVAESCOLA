const database = require('../data/data')


function avaliacoes() {}

avaliacoes.prototype.getAvaliacoes = function(callback, idProf) {
    var sql = 'SELECT * FROM avaliacao WHERE id_professor = ' + idProfessor;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

// modelo responsável por criar um professor
avaliacoes.prototype.postAvaliacao = function(callback, nomeAvaliacao, dataAvaliacao, serieAvaliacao, idProfessor) {

    // nesse ponto, o professor é criado com o nome, email e senha
    // passados via corpo da requisição
    var sql = 'INSERT INTO avaliacao (nome, data, serie, id_professor) VALUES ( "' + 
    nomeAvaliacao + '", "' + dataAvaliacao + '", "' + serieAvaliacao + '", "' + idProfessor + '");';
    var erro = ''
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            erro = err; // caso haja erro na inserção, ele é inserido na variável erro
        }
    });

    // se o tamanho da variável for menor que 1, significa que a variável está vazia
    // logo, não houve erro na inserção e, por isso, pode criar o relacionamento
    /*if(erro.length < 1){
        sql = 'INSERT INTO prof_disciplina VALUES ((SELECT id_professor FROM professor WHERE email = "' + emailProfessor +
        '" AND senha = "' + senhaProfessor + '"), ' + idDisciplina + ');';
        database.appDB.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback("professor criado e vinculado à disciplina")
        });
    };*/
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
        callback('avaliacao atualizada')
    });
}

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

