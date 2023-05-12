exports.listaAlunos = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
    
    alunos.getAlunos((result) => {
        res.json(result);
    }, req.query.idProfessor);
}