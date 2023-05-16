// nome do controlador vem depois do exports
exports.listaProfessores = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // esse controlador chama o modelo de listagem de professores
    professores.getProfessores((result) => {
        res.json(result);
    });
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra o professor
    professores.postProfessor((result) => {
      res.json(result);
    }, req.body.nomeProfessor, req.body.emailProfessor, req.body.senhaProfessor, req.body.idDisciplina);
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados do professor
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    professores.updateProfessor((result) => {
      res.json(result);
    }, req.query.idProfessor, req.body.nomeProfessor, req.body.emailProfessor, ofreq.body.senhaPressor);
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador chama o modelo de deleção do professor
    professores.deleteProfessor((result) => {
      res.json(result);
    }, req.query.idProfessor);
  }
