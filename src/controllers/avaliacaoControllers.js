// nome do controlador vem depois do exports
exports.listaAvaliacoes = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // esse controlador chama o modelo de listagem de avaliações
    avaliacoes.getAvaliacoes((result) => {
        res.json(result);
    }, req.query.idProfessor);
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra a avaliação
    avaliacoes.postAvaliacao((result) => {
      res.json(result);
    }, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao, req.body.idProfessor);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza a avaliação
    // Como, por exemplo, o nome. Para isso, o id da avaliação e os outros atributos são passados via POST.
    avaliacoes.updateAvaliacao((result) => {
      res.json(result);
    }, req.body.idAvaliacao, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // Esse controlador chama o modelo de deleção das avaliações
    avaliacoes.deleteAvaliacao((result) => {
      res.json(result);
    }, req.query.idAvaliacao);
  }
