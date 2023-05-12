exports.listaAlunos = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
    
    alunos.getAlunos((result) => {
        res.json(result);
    }, req.query.idProfessor);
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra o aluno.
    alunos.postAluno((result) => {
      res.json(result);
    }, req.body.nomeAluno, req.body.serieAluno, req.body.idProfessor);
}

module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza o aluno.
    alunos.updateAluno((result) => {
      res.json(result);
    }, req.body.nomeAluno, req.body.serieAluno, req.body.idAluno);
}

module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
    // Esse controlador chama o modelo de deleção dos alunos
    alunos.deleteAluno((result) => {
      res.json(result);
    }, req.query.idAluno);
  }