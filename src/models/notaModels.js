const database = require('../data/data')


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
    'WHERE aluno.id_aluno = ' + idAluno;
    database.appDB.all(sql, [], (err, rows) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else {
            callback(rows)
        }
    });
}

// modelo responsável por criar uma nova nota
notas.prototype.postNota = function(callback, idAluno, idAvaliacao, numBlocos, notaAcertos) {
    var sql = 'INSERT INTO nota (id_aluno, id_avaliacao, num_bloco, nota_acertos, data) VALUES (?,?,?,?,?)';
    let data = new Date().toLocaleDateString('pt-BR') // data atual
    database.appDB.run(sql, [idAluno, idAvaliacao, numBlocos, notaAcertos, data], (err) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por atualizar uma nota
notas.prototype.updateNota = function(callback, idAluno, idAvaliacao, numBlocos, notaAcertos) {
    var sql = 'UPDATE nota SET nota_acertos = ? WHERE id_aluno = ? AND id_avaliacao = ? AND num_bloco = ?';
    database.appDB.run(sql, [notaAcertos, idAluno, idAvaliacao, numBlocos], (err) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

// modelo responsável por deletar uma nota
notas.prototype.deleteNota = function(callback, idAluno, idAvaliacao, numBlocos) {
    var sql = 'DELETE FROM nota WHERE id_aluno = ? AND id_avaliacao = ? AND num_bloco = ?';
    database.appDB.run(sql, [idAluno, idAvaliacao, numBlocos], (err) => {
        if(err){
            console.error(err.message);
            callback(err.message)
        } else{
            callback()
        }
    });
}

module.exports = function(){
    return notas;
}
