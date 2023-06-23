const database = require('../data/data')
const DAO = require('../data/DAO') // template para executar comandos no banco de dados


function notas() {}


// modelo responsável por listar as notas com base na avaliação, no aluno e no numero do bloco
notas.prototype.getNotas = function(callback, idAluno) {
    var sql = 'SELECT aluno.nome as aluno, avaliacao.nome_avaliacao as avaliacao, bloco_questao.num_bloco as bloco,' + 
    'area_conhecimento.nome_area as area, nota.nota_acertos as acertos, bloco_questao.quant_questoes,' + 
    'round(((nota.nota_acertos * 1.0) / bloco_questao.quant_questoes) * 100, 2) as nota ' +
    'FROM bloco_questao JOIN avaliacao ON bloco_questao.id_avaliacao = avaliacao.id_avaliacao ' +
    'JOIN nota ON bloco_questao.id_avaliacao = nota.id_avaliacao AND bloco_questao.num_bloco = nota.num_bloco ' + 
    'JOIN aluno ON nota.id_aluno = aluno.id_aluno ' +
    'JOIN area_conhecimento ON bloco_questao.id_area = area_conhecimento.id_area ' +
    'WHERE aluno.id_aluno = ?';

    DAO.select(sql, [idAluno], retorno => {
        callback(retorno)
    });
}

// modelo para trazer as notas de uma turma completa
notas.prototype.getNotasTurma = function(callback, idTurma, idDisciplina) {
    var sql = 'SELECT aluno.nome as aluno, avaliacao.nome_avaliacao as avaliacao, bloco_questao.num_bloco as bloco, ' + 
    'area_conhecimento.nome_area as area, nota.nota_acertos as acertos, bloco_questao.quant_questoes as total_questoes, ' + 
    'round(((nota.nota_acertos * 1.0) / bloco_questao.quant_questoes) * 10, 2) as nota ' +
    'FROM bloco_questao JOIN avaliacao ON bloco_questao.id_avaliacao = avaliacao.id_avaliacao ' +
    'JOIN nota ON bloco_questao.id_avaliacao = nota.id_avaliacao AND bloco_questao.num_bloco = nota.num_bloco ' +
    'JOIN aluno ON nota.id_aluno = aluno.id_aluno ' +
    'JOIN area_conhecimento ON bloco_questao.id_area = area_conhecimento.id_area ' +
    'JOIN aluno_turma ON aluno.id_aluno = aluno_turma.id_aluno ' +
    'WHERE aluno_turma.id_turma = ? AND avaliacao.id_disciplina = ?';

    DAO.select(sql, [idTurma, idDisciplina], retorno => {
        callback(retorno)
    });
}

// modelo responsável por criar uma nova nota
notas.prototype.postNota = function(callback, idAluno, idAvaliacao, numBlocos, notaAcertos) {
    var sql = 'INSERT INTO nota (id_aluno, id_avaliacao, num_bloco, nota_acertos, data) VALUES (?,?,?,?,?)';
    let data = new Date().toLocaleDateString('pt-BR') // data atual

    DAO.insert(sql, [idAluno, idAvaliacao, numBlocos, notaAcertos, data], retorno => {
        callback(retorno)
    });
}

// modelo responsável por atualizar uma nota
notas.prototype.updateNota = function(callback, idAluno, idAvaliacao, numBlocos, notaAcertos) {
    var sql = 'UPDATE nota SET nota_acertos = ? WHERE id_aluno = ? AND id_avaliacao = ? AND num_bloco = ?';

    DAO.update(sql, [notaAcertos, idAluno, idAvaliacao, numBlocos], retorno => {
        callback(retorno)
    });
}

// modelo responsável por deletar uma nota
notas.prototype.deleteNota = function(callback, idAluno, idAvaliacao, numBlocos) {
    var sql = 'DELETE FROM nota WHERE id_aluno = ? AND id_avaliacao = ? AND num_bloco = ?';

    DAO.delete(sql, [idAluno, idAvaliacao, numBlocos], retorno => {
        callback(retorno)
    });
}

module.exports = function(){
    return notas;
}
