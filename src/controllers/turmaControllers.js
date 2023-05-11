exports.listaTurmas = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // Caso o id do Professor seja informado, então o modelo de getProfTurmas é chamado.
    // Esse controlador passa o idProfessor, vindo da rota, para o modelo.
    // No final, o resultado que o modelo retorna é mostrado em formato json como resposta.
    if(req.query.idTurma == undefined && req.query.idProfessor){
      turmas.getProfTurmas((result) => {
        res.json(result);
      }, req.query.idProfessor);
    }

    // Caso o id da Turma seja informado, então o modelo de getTurmaAlunos é chamado.
    // Esse controlador passa o idTurma, vindo da rota, para o modelo.
    // No final, o resultado que o modelo retorna é mostrado em formato json como resposta.
    else if(req.query.idTurma && req.query.idProfessor == undefined) {
      turmas.getTurmaAlunos((result) => {
        res.json(result);
      }, req.query.idTurma);
    }
  }

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // Esse controlador é responsável por chamar o modelo que cadastra a turma.
    // O modelo depende que o id do professor, o id da disciplina, o nome da Turma e a série
    // Sendo assim, esses dados são pegados do corpo da requisição e passados como argumentos.
    turmas.postTurma((result) => {
      res.json(result);
    }, req.body.idProfessor, req.body.idDisciplina, req.body.nomeTurma, req.body.serieTurma);
  }

module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados básicos da turma.
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
    turmas.updateTurma((result) => {
      res.json(result);
    }, req.body.idTurma, req.body.nomeTurma);
  }

module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // Esse controlador chama o modelo de deleção das turmas, passando o idTurma que veio da url.
    turmas.deleteTurma((result) => {
      res.json(result);
    }, req.query.idTurma);
  }