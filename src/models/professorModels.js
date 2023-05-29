const database = require('../data/data')


function professores() {}

// modelo responsável por listar professores
professores.prototype.getProfessores = function(callback, idProf) {
    var sql = 'SELECT * FROM professor';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(rows)
        }
    });
}

// modelo responsável por criar um professor
professores.prototype.postProfessor = function(callback, nomeProfessor, emailProfessor, senhaProfessor) {

    // nesse ponto, o professor é criado com o nome, email e senha
    // passados via corpo da requisição
    var sql = 'INSERT INTO professor (nome, email, senha) VALUES (?,?,?)';
    var erro = ''
    database.appDB.all(sql, [nomeProfessor, emailProfessor, senhaProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por atualizar professor
professores.prototype.updateProfessor = function(callback, idProfessor, nomeProfessor, emailProfessor, senhaProfessor) {
    var sql = 'UPDATE professor set nome = ?, email = ?, senha = ? WHERE id_professor = ?';

    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [nomeProfessor, emailProfessor, senhaProfessor, idProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por deletar professor
professores.prototype.deleteProfessor = function(callback, idProfessor) {
    var sql = 'DELETE FROM professor WHERE id_professor = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [idProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

module.exports = function(){
    return professores;
}

