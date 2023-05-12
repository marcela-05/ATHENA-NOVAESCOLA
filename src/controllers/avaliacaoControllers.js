// nome do controlador vem depois do exports
exports.listaAvaliacoes = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    
    avaliacoes.getAvaliacoes((result) => {
        res.json(result);
    }, req.query.idProfessor);
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra o professor.
    avaliacoes.postAvaliacao((result) => {
      res.json(result);
    }, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao, req.body.idProfessor);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados básicos da turma.
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    avaliacoes.updateAvaliacao((result) => {
      res.json(result);
    }, req.query.idAvaliacao, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador chama o modelo de deleção das turmas, passando o idTurma que veio da url.
    avaliacoes.deleteAvaliacao((result) => {
      res.json(result);
    }, req.query.idAvaliacao);
  }
