// nome do controlador vem depois do exports
exports.listaProfessores = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var professores = new application.src.models.professorModels() 
    
    professores.getProfessores((result) => {
        res.json(result);
    });
}
  