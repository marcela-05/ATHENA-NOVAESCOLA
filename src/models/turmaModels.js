const database = require('../data/data')


function turmas() {}

// modelo responsável por fazer a atualização da turma
// o id e o nome da turma são passados via corpo da requisição.
turmas.prototype.updateTurma = function(callback, idTurma, nomeTurma) {
    var sql = 'UPDATE turma set nome = "' + nomeTurma + '"' + 
    'WHERE id_turma = ' + idTurma;

    // executa a atualização e verifica se houve algum erro
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err.message)
        }
        callback('Turma atualizada')
    });
}

// modelo responsável por fazer a consulta das turmas de acordo com o id do professor
// esse id é passado via url. Ex.: turmas?idProfessor=1
turmas.prototype.getProfTurmas = function(callback, idProf) {
    var sql = 'SELECT * FROM turma WHERE id_professor = ' + idProf;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

// modelo responsável por fazer a listagem de todos os alunos da turma.
// o id é obtido via url. Ex.: turmas?idTurma=1
turmas.prototype.getTurmaAlunos = function(callback, idTurma) {

    // essa consulta une as tabelas aluno, aluno_turma e turma para trazer os dados
    // dos alunos da turma do id especificado
    var sql = 'SELECT aluno.id_aluno, aluno.nome as nome_aluno, turma.id_turma, turma.nome as nome_turma ' +
    'FROM aluno_turma ' +
    'JOIN aluno ON aluno_turma.id_aluno = aluno.id_aluno ' +
    'JOIN turma ON aluno_turma.id_turma = turma.id_turma ' +
    'WHERE aluno_turma.id_turma = ' + idTurma;

    // retorno dos dados
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback(rows)
    });
}

// modelo responsável por criar uma turma e criar o relacionamento turma_disciplina logo em seguida
turmas.prototype.postTurma = function(callback, idProfessor, idDisciplina, nomeTurma, serieTurma) {

    // nesse ponto, a turma é criada com o nome, serie e id do professor
    // passados via corpo da requisição
    var sql = 'INSERT INTO turma (nome, serie, id_professor, id_disciplina) VALUES ( "' + 
    nomeTurma + '",' + serieTurma + ',' + idProfessor + ',' + idDisciplina + ');';
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        callback({message: 'OK' })
    });
}

// modelo responsável por deletar a turma. O id é informado via url, ex.: /turma/deletar?idTurma=1
turmas.prototype.deleteTurma = function(callback, idTurma) {
    var sql = 'DELETE FROM turma WHERE id_turma = ' + idTurma;

    // executa a consulta sql e retorna os dados na função callback, a qual será usada
    // no controlador para mostrar os dados na página.
    database.appDB.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            }
        callback('Turma e vínculos entre aluno-turma e turma-disciplina excluídos.')
    });
}

module.exports = function(){
    return turmas;
}