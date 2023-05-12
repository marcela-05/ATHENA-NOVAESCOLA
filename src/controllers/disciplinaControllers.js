// nome do controlador vem depois do exports
exports.listaDisciplinas = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    
    disciplinas.getDisciplinas((result) => {
        res.json(result);
    });
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra o professor.
    disciplinas.postDisciplina((result) => {
      res.json(result);
    }, req.body.nomeDisciplina, req.body.idProfessor);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados básicos da turma.
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    disciplinas.updateDisciplina((result) => {
      res.json(result);
    }, req.query.idDisciplina, req.body.nomeDisciplina);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // Esse controlador chama o modelo de deleção das turmas, passando o idTurma que veio da url.
    disciplinas.deleteDisciplina((result) => {
      res.json(result);
    }, req.query.idDisciplina);
  }
