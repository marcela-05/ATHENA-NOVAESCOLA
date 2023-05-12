// nome do controlador vem depois do exports
exports.listaProfessores = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var professores = new application.src.models.professorModels() 
    
    professores.getProfessores((result) => {
        res.json(result);
    });
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra o professor.
    professores.postProfessor((result) => {
      res.json(result);
    }, req.body.nomeProfessor, req.body.emailProfessor, req.body.senhaProfessor, req.body.idDisciplina);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados básicos da turma.
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    professores.updateProfessor((result) => {
      res.json(result);
    }, req.query.idProfessor, req.body.nomeProfessor, req.body.emailProfessor, req.body.senhaProfessor);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador chama o modelo de deleção das turmas, passando o idTurma que veio da url.
    professores.deleteProfessor((result) => {
      res.json(result);
    }, req.query.idProfessor);
  }
