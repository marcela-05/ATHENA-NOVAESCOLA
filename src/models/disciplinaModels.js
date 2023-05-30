const database = require('../data/data')


function disciplinas() {}

// modelo responsável por listar as disciplinas 
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

// modelo responsável por criar uma disciplina
disciplinas.prototype.postDisciplina = function(callback, nomeDisciplina, idProfessor) {

    // nesse ponto, o professor é criado com o nome
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
            callback({message:"disciplina criada e vinculada ao professor"})
        });
    };
}

// modelo responsável por atualizar disciplina
disciplinas.prototype.updateDisciplina = function(callback, idDisciplina, nomeDisciplina) {
    var sql = 'UPDATE disciplina set nome = ? WHERE id_disciplina = ?';

    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [nomeDisciplina, idDisciplina], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else {
            callback()
        }
    });
}

// modelo responsável por deletar disciplina
disciplinas.prototype.deleteDisciplina = function(callback, idDisciplina) {
    var sql = 'DELETE FROM disciplina WHERE id_disciplina = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idDisciplina], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }else{
            callback()
        }
    });
}

module.exports = function(){
    return disciplinas;
}

