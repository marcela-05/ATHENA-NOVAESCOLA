exports.listaAlunos = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 
  
    //verifica se o id do professor foi informado
    if(req.query.idProfessor==undefined || req.query.idProfessor == ' '){
      res.json({message: 'id do professor não informado'})
    } else{// chama modelo que lista os alunos com base no id do professor
      alunos.getAlunos((result) => {
          // verifica se o resultado da consulta é vazio
          if(result.length == 0){
              res.json({message: 'nenhum aluno encontrado'})
          } else{
              res.json(result);
          }
      }, req.query.idProfessor);
    }
 }

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 

    // verifica se o método é GET
    if(req.method == 'GET'){
      res.render('html/cadastrarAluno')
    }
    else{
      // verifica se o nome do aluno foi informado
      if(req.body.nomeAluno == undefined || req.body.nomeAluno == ''){
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome do aluno não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar um aluno'});
      }else {
        // verifica se a série do aluno foi informada
        if(req.body.serieAluno == undefined || req.body.serieAluno == ''){
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Série do aluno não informada', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar um aluno'});
        }else {
          // Esse controlador é responsável por chamar o modelo que cadastra o aluno.
          alunos.postAluno((result) => {
            // verifica se o resultado da consulta é vazio. 
            // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
            if(result != undefined){
              res.render('html/erro', {codigoStatus: 500, tituloMensagem: 'Erro ao cadastrar aluno', mensagem: result});
            }else{
              res.redirect('/home');
            }
          }, req.body.nomeAluno, req.body.serieAluno, req.session.idProfessor);
        }
      }
    }
}

module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 

     // verifica se o nome do aluno foi informado
     if(req.body.nomeAluno==undefined || req.body.nomeAluno == ' '){
      res.json({message: 'nome do aluno não informado'})
    }else {
      // verifica se a série do aluno foi informada
      if(req.body.serieAluno == undefined || req.body.serieAluno == ''){
        res.json({message: 'Série do aluno não informada'})
      }else{
      // verifica se o id do aluno foi informado
        if(req.body.idAluno == undefined || req.body.idAluno == ''){
          res.json({message: 'id do aluno não informado'})
        }else{
            // Esse controlador é responsável por chamar o modelo que atualiza o aluno.
            alunos.updateAluno((result) => {
                // verifica se o resultado da consulta é vazio. 
                // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                 if(result != undefined){
                  res.json({message: result})
                }else{
                 res.json({message: 'Aluno atualizado com sucesso'})
                }
              }, req.body.nomeAluno, req.body.serieAluno, req.body.idAluno);
      }
    }
  }
}
    
  

module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/alunoModels.js
    var alunos = new application.src.models.alunoModels() 

    if(req.query.idAluno == undefined || req.query.idAluno == ''){
      res.json({message: 'id do aluno não informado'})
    } else{
      // Esse controlador chama o modelo de deleção dos alunos
      alunos.deleteAluno((result) => {
        if(result != undefined){
          res.json({message: result})
         } else{
          res.json({message: 'Aluno deletado com sucesso'})
         }
      }, req.query.idAluno);
    }
}