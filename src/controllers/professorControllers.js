var fs = require('fs');
var path = require('path');

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
              if(result == 'SQLITE_CONSTRAINT: UNIQUE constraint failed: professor.email'){
                res.render('html/erro', {codigoStatus: 401, tituloMensagem: 'Email existente', mensagem: 'O email informado já existe no nosso banco de dados, por favor, cadastre-se com outro e-mail ou faça login.', botao: {texto: 'Tentar novamente', url: '/'}});
              }
            } else{
              req.session.cadastrado = true;

              // busca o id do professor que acabou de ser cadastrado e salva na sessão
              professores.getIdProfessor((result) => {
                req.session.idProfessor = result[0].id_professor;
                res.redirect('/cadastro/perfil');
              }, req.body.nomeProfessor, req.body.emailProfessor);
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
      if (result.length <= 0 || result.message == 'erro interno') {
        if(req.tipoConsulta == 'json'){
          res.json({message: 'email ou senha inválidos'}).status(401)
        } else {
          res.render('html/erro', {codigoStatus: 401, tituloMensagem: 'Email e/ou senha inválidos', mensagem: 'Por favor, caso não tenha conta, cadastre-se.', botao: {texto: 'Tentar novamente', url: '/'}});
        }
      } else {
        req.session.cadastrado = false
        req.session.autorizado = true
        req.session.emailProfessor = req.body.emailProfessor
        req.session.idProfessor = result[0].id_professor
        req.session.nomeProfessor = result[0].nome
        professores.listaDisciplinas((result) => {
          if (result != undefined && result.length > 0) {
            // itera pelas imagens do diretório e verifica se alguma, após o - e antes do . é igual ao id do professor
            fs.readdirSync(path.join(__dirname, '../views/uploads/')).forEach(file => {
              if(file.split('-')[1].split('.')[0] == req.session.idProfessor){
                req.session.urlFoto = '../uploads/' + file
              }
            });
            req.session.profDisciplinas = result
            res.redirect('/home')
          }
        }, req.session.idProfessor)
      }
    }, req.body.emailProfessor, req.body.senhaProfessor);
  }

  module.exports.loginGoogle = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels() 
    
    // verifica se o e-mail do usuário já existe no banco de dados
    professores.verificaProfessor((result) => {
      if(result.length > 0){
        // se existir, faz o login, preenchendo a sessão com os dados do usuário
        req.session.autorizado = true
        req.session.emailProfessor = req.user.emails[0].value
        req.session.idProfessor = result[0].id_professor
        req.session.nomeProfessor = result[0].nome
        professores.listaDisciplinas((result) => {
          if (result != undefined && result.length > 0) {
            req.session.profDisciplinas = result
            req.session.autorizado = true;
            req.session.urlFoto = req.user.photos[0].value
            res.render('html/index', {nome: req.session.nomeProfessor, urlFoto: req.session.urlFoto})
          }
        }, req.session.idProfessor)
      }
      else{
        // se não existir, cadastra o usuário com o e-mail e o nome do usuário do google, e uma senha padrão chamada 'google'
        professores.postProfessor((result) => {
    
          req.session.cadastrado = true;

          // busca o id do professor que acabou de ser cadastrado e salva na sessão
          professores.getIdProfessor((result) => {
            req.session.idProfessor = result[0].id_professor;
            res.redirect('/cadastro/perfil');
          }, req.user.displayName, req.user.emails[0].value);
        }, req.user.displayName, req.user.emails[0].value, 'google');
      }
    }, req.user.emails[0].value)
  }

  module.exports.vinculaDisciplina = function(application, req, res) {
    // cria conexão com o modelo /src/models/professorModels.js
    var professores = new application.src.models.professorModels()
    // Esse controlador é responsável por chamar o modelo que vincula o professor a uma disciplina
    // Para isso, o id do professor e o id da disciplina são passados como argumentos.

    const disciplinas = req.body.checkboxDisciplina

    professores.vinculaDisciplina((result) => {
      // verifica se o resultado da consulta é vazio.
      // Se for, retorna mensagem de erro, se não, retorna mensagem de sucesso (result)
      if (result != undefined && result.length > 0) {
        res.json({message: result})
      } else {
        res.redirect('/')
      }
    }, req.session.idProfessor, disciplinas);
  }
