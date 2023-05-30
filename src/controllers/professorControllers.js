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
    // Para isso, o nome, email, senha e id da disciplina são passados como argumentos.

    // código para evitar SQL Injection e retornar mensagens de status
    // verifica se o nome do professor foi informado
    if(req.body.nomeProfessor == undefined || req.body.nomeProfessor == ''){
      res.json({message: 'nome do professor não informado'})
    } else {
      // verifica se o email do professor foi informado
      if(req.body.emailProfessor == undefined || req.body.emailProfessor == ''){
        res.json({message: 'email do professor não informado'})
      } else {
        // verifica se a senha do professor foi informada
        if(req.body.senhaProfessor == undefined || req.body.senhaProfessor == ''){
          res.json({message: 'senha do professor não informada'})
        } else {
          professores.postProfessor((result) => {
          // verifica se o resultado da consulta é vazio.
          // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
            if(result != undefined){
              res.json({message: result})
            } else{
              res.json({message: 'Professor cadastrado com sucesso'})
            }
          }, req.body.nomeProfessor, req.body.emailProfessor, req.body.senhaProfessor);}
        }
      }
  }

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que atualiza os dados do professor
    // Como, por exemplo, o nome. Para isso, o id da turma e o nome da turma são passados como argumentos.

    // código para evitar SQL Injection e retornar mensagens de status
    // verifica se o id do professor foi informado
    if(req.query.idProfessor == undefined || req.query.idProfessor == ''){
      res.json({message: 'id do professor não informado'})
    } else{
      // verifica se o nome do professor foi informado
      if(req.body.nomeProfessor == undefined || req.body.nomeProfessor == ''){
        res.json({message: 'nome do professor não informado'})
      } else{
        // verifica se o email do professor foi informado
        if(req.body.emailProfessor == undefined || req.body.emailProfessor == ''){
          res.json({message: 'email do professor não informado'})
        } else{
          // verifica se a senha do professor foi informada
          if(req.body.senhaProfessor == undefined || req.body.senhaProfessor == ''){
            res.json({message: 'senha do professor não informada'})
          } else{
            professores.updateProfessor((result) => {
              // verifica se o resultado da consulta é vazio.
              // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
              if(result != undefined){
                res.json({message: result})
              } else{
                res.json({message: 'Professor atualizado com sucesso'})
              }
            }, req.query.idProfessor, req.body.nomeProfessor, req.body.emailProfessor, req.body.senhaProfessor);
          }
        }
      }
    }
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 

    // verifica se o id do professor foi informado e se é um número
    if(req.query.idProfessor == undefined || req.query.idProfessor == '' || isNaN(req.query.idProfessor)){
      res.json({message: 'id do professor inválido'})
    } else {
      // Esse controlador chama o modelo de deleção do professor
      professores.deleteProfessor((result) => {
        if(result != undefined){
          res.json({message: result})
        } else{
          res.json({message: 'Professor deletado com sucesso'})
        }
      }, req.query.idProfessor);
    }
  }

  module.exports.login = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    // Esse controlador é responsável por chamar o modelo que faz o login do professor
    // Para isso, o email e senha são passados como argumentos.

    professores.loginProfessor((result) => {
      // verifica se o resultado da consulta é vazio.
      // Se for, retorna mensagem de erro, se não, retorna mensagem de sucesso (result)
      if(result.length <= 0 || result.message == 'erro interno') {
        res.send({message: 'email ou senha inválidos'}).status(401)
      } else {
        req.session.autorizado = true
        req.session.emailProfessor = req.body.emailProfessor
        req.session.idProfessor = result[0].idProfessor
        res.redirect('/home')
      }
    }, req.body.emailProfessor, req.body.senhaProfessor);
  }

  module.exports.vinculaDisciplina = function(application, req, res) {
    console.log(req.body.checkboxDisciplina)
  }
