// nome do controlador vem depois do exports
exports.listaDisciplinas = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // esse controlador chama o modelo de listagem de disciplinas
    disciplinas.getDisciplinas((result) => {
        res.json(result);
    });
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra as disciplinas
    disciplinas.postDisciplina((result) => {
      res.json(result);
    }, req.body.nomeDisciplina, req.body.idProfessor);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza as disciplinas
    // Como, por exemplo, o nome.
    disciplinas.updateDisciplina((result) => {
      res.json(result);
    }, req.query.idDisciplina, req.body.nomeDisciplina);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador chama o modelo de deleção das disciplinas
    disciplinas.deleteDisciplina((result) => {
      res.json(result);
    }, req.query.idDisciplina);
  }
