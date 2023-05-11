exports.listaTurmas = function(application, req, res) {
    var turmas = new application.src.models.turmaModels()

    // lista turmas de acordo com o id do professor em json
    if(req.query.idTurma == undefined && req.query.idProfessor){
      turmas.getProfTurmas((result) => {
        res.json(result);
      }, req.query.idProfessor);
    }

    // lista todos os alunos de uma turma
    else if(req.query.idTurma && req.query.idProfessor == undefined) {
      turmas.getTurmaAlunos((result) => {
        res.json(result);
      }, req.query.idTurma);
    }
  }

module.exports.cadastra = function(application, req, res) {
    var turmas = new application.src.models.turmaModels()

    turmas.postTurma((result) => {
      res.json(result);
    }, req.body.idProfessor, req.body.idDisciplina, req.body.nomeTurma, req.body.serieTurma);
  }

module.exports.atualiza = function(application, req, res) {
    var turmas = new application.src.models.turmaModels()

    turmas.updateTurma((result) => {
      res.json(result);
    }, req.body.idTurma, req.body.nomeTurma);
  }