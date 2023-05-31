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

    // Caso o id da Turma seja informado, então o modelo de getTurma é chamado.
    // Esse controlador passa o idTurma, vindo da rota, para o modelo.
    // No final, o resultado que o modelo retorna é mostrado em formato json como resposta.
    else if(req.query.idTurma && req.query.idProfessor == undefined) {
      turmas.getTurma((result) => {
        turmas.getDisciplinaDaTurma((disciplina) => {
          turmas.getTurmaAlunos((alunos) => {
            console.log(alunos);
            res.render('html/turma', {turma: result[0], disciplina: disciplina[0], alunos: alunos});
          }, req.query.idTurma);
        }, req.query.idTurma);
      }, req.query.idTurma, req.session.idProfessor);
    }
  }

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
      // verifica se o id do professor foi informado
      if(req.body.idProfessor == undefined || req.body.idProfessor == ''){
        res.json({message: 'id do professor não informado'})
      } else{
        // verifica se o id da disciplina foi informado
        if(req.body.idDisciplina == undefined || req.body.idDisciplina == ''){
            res.json({message: 'id da disciplina não informada'})
        } else{
            // verifica se o nome da turma foi informado
            if(req.body.nomeTurma == undefined || req.body.nomeTurma == ''){
                res.json({message: 'nome da turma não informado'})
            } else{
                // verifica se a série da turma foi informada
                if(req.body.serieTurma == undefined || req.body.serieTurma == ''){
                    res.json({message: 'série da turma não informada'})
                } else{
                    // Esse controlador é responsável por chamar o modelo que cadastra a turma
                    // O modelo depende que o id do professor, o id da disciplina, o nome da Turma e a série
                    // Sendo assim, esses dados são pegados do corpo da requisição e passados como argumentos.
                    turmas.postTurma((result) => {
                    // verifica se o resultado da consulta é vazio. 
                    // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                      if(result != undefined){
                            res.json({message: result})
                      } else{
                            res.json({message: 'turma cadastrada com sucesso'})
                       }
                    }, req.body.idProfessor, req.body.idDisciplina, req.body.nomeTurma, req.body.serieTurma);
                }
            }
        }
    }
}
  

module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
     // verifica se o id da turma foi informado
     if(req.body.idTurma == undefined || req.body.idTurma == ''){
      res.json({message: 'id da turma não informado'})
    } else{
      // verifica se o nome da turma foi informado
      if(req.body.nomeTurma == undefined || req.body.nomeTurma == ''){
          res.json({message: 'nome da turma não informado'})
      } else{
        // Esse controlador é responsável por chamar o modelo que atualiza os dados básicos da turma.
        // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.
         turmas.updateTurma((result) => {
          if(result != undefined){
            res.json({message: result})
          } else{
            res.json({message: 'turma atualizada com sucesso'})
           }
          }, req.body.idTurma, req.body.nomeTurma);
      }
    }
  }
   

module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // verifica se o id da turma foi informado
    if(req.query.idTurma == undefined || req.query.idTurma == ''){
      res.json({message: 'id da turma não informado'})
    } else{
      // Esse controlador chama o modelo de deleção das turmas, passando o idTurma que veio da url.
      turmas.deleteTurma((result) => {
          // verifica se o resultado da consulta é vazio. 
          // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
          if(result != undefined){
              res.json({message: result})
          } else{
              res.json({message: 'turma deletada com sucesso'})
          }
      }, req.query.idTurma);
    }
  }