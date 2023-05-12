// nome do controlador vem depois do exports
exports.listaAreaConhecimento = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels() 
    // esse controlador chama o modelo de listagem de área do conhecimento
    areaConhecimento.getAreaConhecimento((result) => {
        res.json(result);
    }, req.query.idDisciplina);
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra uma área do conhecimento
    areaConhecimento.postAreaConhecimento((result) => {
      res.json(result);
    }, req.body.nomeArea, req.body.idDisciplina);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados da área do conhecimento.
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    areaConhecimento.updateAreaConhecimento((result) => {
      res.json(result);
    }, req.query.idArea, req.body.nomeArea, req.body.idDisciplina);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels() 
    // Esse controlador chama o modelo de deleção das áreas de conhecimento
    areaConhecimento.deleteAreaConhecimento((result) => {
      res.json(result);
    }, req.query.idArea);
  }
