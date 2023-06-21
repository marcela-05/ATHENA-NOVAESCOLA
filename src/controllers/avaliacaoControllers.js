// nome do controlador vem depois do exports
exports.listaAvaliacoes = function(application, req, res) {
  // cria conexão com o modelo /src/models/avaliacaoModels.js
  var avaliacoes = new application.src.models.avaliacaoModels() 
  // cria conexão com o modelo /src/models/professorModels.js
  var professor = new application.src.models.professorModels()
  // cria conexão com o modelo /src/models/turmaModels.js
  var turma = new application.src.models.turmaModels()

  // esse controlador chama o modelo de listagem de avaliações
  avaliacoes.getAvaliacoes((result) => {
    // esse controlador chama o modelo de listagem de disciplinas
    professor.listaDisciplinas((disciplinas) => {
      // esse controlador chama o modelo de listagem de turmas
      turma.getProfTurmas((turmas) => {
        // verifica se o resultado da consulta é vazio
        if(result.length == 0){
          if(req.query.tipoConsulta == 'json'){
            res.json({message: 'nenhuma avaliação encontrada'})
          } else{
            res.redirect('/avaliacoes/cadastrar')
          }
        } else{
          res.render('html/avaliacoes', {avaliacoes: result, disciplinas: disciplinas, turmas: turmas, urlFoto: req.session.urlFoto});
        }
      }, req.session.idProfessor)
    }, req.session.idProfessor)
  }, req.session.idProfessor);
}

module.exports.cadastra = function(application, req, res) {
  // cria conexão com o modelo /src/models/avaliacaoModels.js
  var avaliacoes = new application.src.models.avaliacaoModels() 
 // cria conexão com o modelo /src/models/professorModels.js
  var professor = new application.src.models.professorModels()
  // cria conexão com o modelo /src/models/blocoQuestaoModels.js
  var blocosQuestao = new application.src.models.blocoQuestaoModels()
  // cria conexão com o modelo /src/models/areaConhecimentoModels.js
  var areaConhecimento = new application.src.models.areaConhecimentoModels()

  // verifica se o método da requisição é GET
  if(req.method == 'GET'){
    // esse controlador chama o modelo de listagem de disciplinas
    professor.listaDisciplinas((disciplinas) => {
      // esse controlador chama o modelo de listagem de áreas de conhecimento
      areaConhecimento.getAreaConhecimento((areas) => {
        // renderiza a página de cadastro de avaliação, com as disciplinas e áreas de conhecimento
        res.render('html/cadastrarAvaliacao', {disciplinas: disciplinas, areas: areas, urlFoto: req.session.urlFoto})
      }, '', req.session.profDisciplinas)
    }, req.session.idProfessor)
  } else {
    // verifica se o nome da avaliação foi informado
    if(req.body.nomeAvaliacao == undefined || req.body.nomeAvaliacao == ''){
      // verifica o tipo de requisição - json significa que a requisição é para a API, logo
      // retorna um JSON, se não, retorna uma página HTML
      if(req.query.tipoConsulta == 'json'){
        res.json({message: 'nome da avaliação não informado'})
      } else{
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome da avaliação não informado', mensagem: 'Por favor, informe todos os campos obrigatórios'})
      }
    } else{
      // verifica se a série da avaliação foi informada
      if(req.body.serieAvaliacao == undefined || req.body.serieAvaliacao == ''){
        if(req.query.tipoConsulta == 'json'){
          res.json({message: 'série da avaliação não informada'})
        } else{
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Série da avaliação não informada', mensagem: 'Por favor, informe todos os campos obrigatórios'})
        }
      } else{
        // Esse controlador é responsável por chamar o modelo que cadastra a avaliação
        avaliacoes.postAvaliacao((avaliacaoLastID) => {
          // cria objeto para armazenar dados do bloco de questões. Se for string, é apenas um bloco
          // se for array, é mais de um bloco
          if(typeof req.body.assunto == 'string'){
            // cria objeto para armazenar dados do bloco de questões
            bloco = {quant_questoes: req.body.assunto, num_bloco: 1, id_area: req.body.blocoArea}
            blocosQuestao.postBloco((result) => {
            }, bloco.num_bloco, bloco.quant_questoes, avaliacaoLastID, bloco.id_area)
            res.redirect('/home')
          } else {
            for(let i = 1; i <= req.body.assunto.length + 1; i++){
              bloco = {quant_questoes: req.body.assunto[i-1], num_bloco: i, id_area: req.body.blocoArea[i-1]}
              // esse controlador chama o modelo de cadastro de bloco de questões
              blocosQuestao.postBloco((result) => {
              }, bloco.num_bloco, bloco.quant_questoes, avaliacaoLastID, bloco.id_area)
            }
            res.redirect('/home')
          }
        }, req.session.idProfessor, req.body.nomeAvaliacao, req.body.serieAvaliacao, req.body.disciplinaAvaliacao, req.body.quantQuestoes);
      }
    }
  }
}
    

  module.exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // verifica se o id da avaliação foi informado
    if(req.body.idAvaliacao == undefined || req.body.idAvaliacao == ''){
      res.json({message: 'id da avaliação não informado'})
  } else{
      // verifica se o nome da avaliação foi informado
      if(req.body.nomeAvaliacao == undefined || req.body.nomeAvaliacao == ''){
          res.json({message: 'nome da avaliação não informado'})
      } else{
          // verifica se a data da avaliação foi informada
          if(req.body.dataAvaliacao == undefined || req.body.dataAvaliacao == ''){
              res.json({message: 'data da avaliação não informada'})
          } else{
              // verifica se a série da avaliação foi informada
              if(req.body.serieAvaliacao == undefined || req.body.serieAvaliacao == ''){
                  res.json({message: 'série da avaliação não informada'})
              } else{
                // Esse controlador é responsável por chamar o modelo que atualiza a avaliação
                // Como, por exemplo, o nome. Para isso, o id da avaliação e os outros atributos são passados via POST.
               avaliacoes.updateAvaliacao((result) => {
                      // verifica se o resultado da consulta é vazio. 
                      // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                      if(result != undefined){
                          res.json({message: result})
                      } else{
                          res.json({message: 'avaliação atualizada com sucesso'})
                      }
                    }, req.body.idAvaliacao, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao);
                  }
              }
          }
      }
  }
   
     

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
    // verifica se o id da avaliação foi informado
    if(req.query.idAvaliacao == undefined || req.query.idAvaliacao == ''){
      res.json({message: 'id da avaliação não informado'})
    } else{
      // Esse controlador chama o modelo de deleção das avaliações
      avaliacoes.deleteAvaliacao((result) => {
          // verifica se o resultado da consulta é vazio. 
          // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
          if(result != undefined){
              res.json({message: result})
          } else{
              res.json({message: 'avaliação deletada com sucesso'})
          }
        }, req.query.idAvaliacao);
    }
  }

