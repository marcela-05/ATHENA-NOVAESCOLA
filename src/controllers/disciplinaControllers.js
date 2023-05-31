// nome do controlador vem depois do exports
exports.listaDisciplinas = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // esse controlador chama o modelo de listagem de disciplinas
    disciplinas.getDisciplinas((result) => {
        res.json(result);
    });
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // verifica se o nome da disciplina foi informado
    if(req.body.nomeDisciplina == undefined || req.body.nomeDisciplina == ''){
      res.json({message: 'nome da disciplina não informado'})
    } else{
      // verifica se o id do professor foi informado
      if(req.body.idProfessor == undefined || req.body.idProfessor == ''){
          res.json({message: 'id do professor não informado'})
      } else{
        disciplinas.postDisciplina((result) => {
          if(result != undefined){
            res.json({message: result})
          } else{
            res.json({message: 'disciplina cadastrada com sucesso'})
        }
      }, req.body.nomeDisciplina, req.body.idProfessor);
    }
  }
}

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
     // verifica se o id da disciplina foi informado
     if(req.body.idDisciplina == undefined || req.body.idDisciplina == ''){
      res.json({message: 'id da disciplina não informado'})
    } else{
      // verifica se o nome da disciplina foi informado
      if(req.body.nomeDisciplina == undefined || req.body.nomeDisciplina == ''){
          res.json({message: 'nome da disciplina não informado'})
      } else{
        disciplinas.updateDisciplina((result) => {
          if(result != undefined){
            res.json({message: result})
          } else{
            res.json({message: 'disciplina atualizada com sucesso'})
           }
        }, req.body.idDisciplina, req.body.nomeDisciplina);
      }
    }
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/disciplinaModels.js
    var disciplinas = new application.src.models.disciplinaModels() 
    // verifica se o id da disciplina foi informado
    if(req.query.idDisciplina == undefined || req.query.idDisciplina == ''){
      res.json({message: 'id da disciplina não informado'})
    } else{
      // chama modelo que deleta a disciplina
      disciplinas.deleteDisciplina((result) => {
          // verifica se o resultado da consulta é vazio. 
          // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
          if(result != undefined){
              res.json({message: result})
          } else{
              res.json({message: 'disciplina deletada com sucesso'})
          }
      }, req.query.idDisciplina);
    }
  }