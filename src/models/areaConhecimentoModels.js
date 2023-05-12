const database = require('../data/data')


function areaConhecimento() {}

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

// modelo responsável por criar um professor
areaConhecimento.prototype.postAreaConhecimento = function(callback, nomeArea, idDisciplina) {

    // nesse ponto, o professor é criado com o nome, email e senha
    // passados via corpo da requisição
    var sql = 'INSERT INTO area_conhecimento (nome, id_disciplina) VALUES ( "' + 
    nomeArea + '", "' + idDisciplina + '");';
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
        sql = 'INSERT INTO nota VALUES ((SELECT id_professor FROM professor WHERE email = "' + emailProfessor +
        '" AND senha = "' + senhaProfessor + '"), ' + idDisciplina + ');';
        database.appDB.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback("professor criado e vinculado à disciplina")
        });
    };*/
}

areaConhecimento.prototype.updateAreaConhecimento = function(callback, idArea, nomeArea, idDisciplina) {
    console.log("aqui")
    var sql = 'UPDATE area_conhecimento set nome = "' + nomeArea + '", id_disciplina = "' + idDisciplina + '"' +
    'WHERE id_area = ' + idArea;

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback('Area de conhecimento atualizada')
    });
}

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

