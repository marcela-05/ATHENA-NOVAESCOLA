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