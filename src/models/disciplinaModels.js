const database = require('../data/data')


function disciplinas() {}

disciplinas.prototype.getDisciplinas = function(callback) {
    var sql = 'SELECT * FROM disciplina';

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
disciplinas.prototype.postDisciplina = function(callback, nomeDisciplina, idProfessor) {

    // nesse ponto, o professor é criado com o nome, email e senha
    // passados via corpo da requisição
    var sql = 'INSERT INTO disciplina (nome) VALUES ( "' + 
    nomeDisciplina + '");';
    var erro = ''
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            erro = err; // caso haja erro na inserção, ele é inserido na variável erro
        }
    });

    // se o tamanho da variável for menor que 1, significa que a variável está vazia
    // logo, não houve erro na inserção e, por isso, pode criar o relacionamento
    if(erro.length < 1){
        sql = 'INSERT INTO prof_disciplina VALUES ((SELECT id_disciplina FROM disciplina WHERE nome = "' + nomeDisciplina +
        '"), ' + idProfessor + ');';
        database.appDB.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback("professor criado e vinculado à disciplina")
        });
    };
}

disciplinas.prototype.updateProfessor = function(callback, idDisciplina, nomeDisciplina) {
    console.log("aqui")
    var sql = 'UPDATE disciplina set nome = "' + nomeDisciplina + '"' +
    'WHERE id_disciplina = ' + idDisciplina;

    console.log(sql)
    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback('Turma atualizada')
    });
}

disciplinas.prototype.deleteDisciplina = function(callback, idDisciplina) {
    var sql = 'DELETE FROM disciplina WHERE id_disciplina = ' + idDisciplina;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback({message: 'Disciplina Excluída'})
    });
}

module.exports = function(){
    return disciplinas;
}

