const database = require('../data/data')


function professores() {}

// modelo responsável por listar professores
professores.prototype.getProfessores = function(callback) {
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

// modelo responsável pelo login do professor
professores.prototype.loginProfessor = function(callback, emailProfessor, senhaProfessor) {
    var sql = 'SELECT * FROM professor WHERE email = ? AND senha = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [emailProfessor, senhaProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback({message: 'erro interno'})
        } else{
            callback(rows)
        }
    });
}

// modelo responsável por buscar o id do professor de acordo com nome e email
professores.prototype.getIdProfessor = function(callback, nomeProfessor, emailProfessor) {
    var sql = 'SELECT id_professor FROM professor WHERE nome = ? AND email = ?';

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [nomeProfessor, emailProfessor], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        } else{
            callback(rows)
        }
    });
}

// modelo responsável por vincular um professor a uma disciplina
professores.prototype.vinculaDisciplina = function(callback, idProfessor, disciplinas) {
    if (typeof disciplinas !== 'string') {
        // se o tipo não for string, significa que mais de uma opção foi marcada
        // logo, o processo de vinculação é repetido para cada opção
        for (let disciplina of disciplinas) {
            // busca o id da disciplina de acordo com o nome
            let sql = 'SELECT id_disciplina FROM disciplina WHERE nome = ?';

            database.appDB.all(sql, [disciplina.toLocaleLowerCase()], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    callback(err.message)
                } else {
                    // vincula o professor à disciplina
                    let idDisciplina = rows[0].id_disciplina
                    let sql = 'INSERT INTO prof_disciplina (id_professor, id_disciplina) VALUES (?,?)';

                    // executa a consulta sql e retorna os dados na função callback, a qual será usada
                    // no controlador para mostrar os dados na página.
                    database.appDB.run(sql, [idProfessor, idDisciplina], (err, rows) => {
                        if (err) {
                            console.error(err.message);
                            callback(err.message)
                        } else{
                            callback()
                        }
                    });
                }
            });
        }
    } else {
        // busca o id da disciplina de acordo com o nome - quando somente uma opção é marcada.
        let sql = 'SELECT id_disciplina FROM disciplina WHERE nome = ?';

        database.appDB.all(sql, [disciplinas.toLocaleLowerCase()], (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err.message)
            } else {
                // vincula o professor à disciplina
                let idDisciplina = rows[0].id_disciplina
                let sql = 'INSERT INTO prof_disciplina (id_professor, id_disciplina) VALUES (?,?)';

                database.appDB.run(sql, [idProfessor, idDisciplina], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        callback(err.message)
                    } else{
                        callback()
                    }
                });
            }
        });
    }
}


module.exports = function(){
    return professores;
}
