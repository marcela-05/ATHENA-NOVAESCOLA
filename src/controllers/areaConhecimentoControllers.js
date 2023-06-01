// nome do controlador vem depois do exports
exports.listaAreasConhecimento = function(application, req, res) {
    // cria conexão com o modelo /src/models/areaConhecimentoModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels()

    var disciplinas = ''; // variável que armazena as disciplinas

    // esse controlador chama o modelo de listagem de área do conhecimento
    areaConhecimento.getAreaConhecimento((result) => {
      if(result.length == 0){
        res.render('html/erro', {codigoStatus: 204, tituloMensagem: 'Nenhuma área do conhecimento/assunto encontrada', mensagem: 'Se achar que isso é um erro, entre em contato.'});
      } else{
        areaConhecimento.getNomeDisciplina((result2) => {
          disciplinas = result2;
          res.render('html/assuntosDeAvaliacao', {areasConhecimento: result, disciplinas: disciplinas})
        }, '', req.session.profDisciplinas);
      }
    }, '', req.session.profDisciplinas);
}

module.exports.cadastra = function(application, req, res) {
    // verifica o método da requisição
    if(req.method == 'GET'){
      // cria conexão com o modelo /src/models/professorModels.js
      var professor = new application.src.models.professorModels()

      // esse controlador chama o modelo de listagem de disciplinas
      professor.listaDisciplinas((result) => {
        if(result.length == 0){
          res.render('html/cadastrarAssunto', {disciplinas: ''});
        } else{
          res.render('html/cadastrarAssunto', {disciplinas: result});
        }
      }, req.session.idProfessor);
    } else {
      // cria conexão com o modelo /src/models/areaConhecimentoModels.js
      var areaConhecimento = new application.src.models.areaConhecimentoModels() 
      // verifica se o nome da área foi informada
      if(req.body.nomeArea==undefined || req.body.nomeArea == ' '){
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome da área não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar uma área do conhecimento'});
      }else {
        // verifica se o id disciplina foi informado
        if(req.body.disciplina == undefined || req.body.disciplina == ''){
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'ID da disciplina não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar uma área do conhecimento'});
        }else{
          areaConhecimento.postAreaConhecimento((result) => {
            // verifica se o resultado da consulta é vazio. 
            // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
            if(result != undefined){
              res.render('html/erro', {codigoStatus: 500, tituloMensagem: 'Erro Interno do Servidor', mensagem: result});
            }else{
                res.json({message: 'Área do conhecimento cadastrada com sucesso'})
            }
        }, req.body.nomeArea, req.body.disciplina);
      }
    }
  }
}

  module.exports.atualiza = function(application, req, res) {
    if(req.method == 'GET'){
      // cria conexão com o modelo /src/models/professorModels.js
      var professor = new application.src.models.professorModels()
      var disciplinas = ''; // variável que armazena as disciplinas
      var disciplinaAtual = ''; // variável que armazena a disciplina atual
      // cria conexão com o modelo /src/models/areaConhecimentoModels.js
      var areaConhecimento = new application.src.models.areaConhecimentoModels();

      // esse controlador chama o modelo de listagem de disciplinas
      professor.listaDisciplinas((result) => {
        if(result.length != 0){
          // armazena as disciplinas na variável disciplinas
          disciplinas = result
        }
      }, req.session.idProfessor);

      // esse controlador retorna o nome da disciplina selecionada
      areaConhecimento.getNomeDisciplina((result) => {
        if(result.length != 0){
          // armazena a disciplina atual na variável disciplinaAtual
          disciplinaAtual = result[0].nome
        }
      }, req.query.idArea, '');

      // com as diciplinas armazenadas, esse controlador chama o modelo de listagem de área do conhecimento
      areaConhecimento.getAreaConhecimento((result) => {
        // se tiver resultado, renderiza a página de atualização de área do conhecimento com os dados da área
        if(result.length == 0){
          res.render('html/erro', {codigoStatus: 404, tituloMensagem: 'Página não encontrada', mensagem: 'A página que você está procurando não existe ou foi removida.'});
        } else{
          res.render('html/atualizarAssunto', {disciplinas: disciplinas, atual: disciplinaAtual, area: result[0], idArea: req.query.idArea});
        }
      }, req.query.idArea);

    } else {
      // cria conexão com o modelo /src/models/areaConhecimentoModels.js
      var areaConhecimento = new application.src.models.areaConhecimentoModels() 
      // verifica se o id da área foi informado
      if(req.body.idArea == undefined || req.body.idArea == ''){
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'ID da área não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar uma área do conhecimento'});
      }else {
        // verifica se o nome da área foi informada
        if(req.body.nomeArea == undefined || req.body.nomeArea == ''){
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome da área não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar uma área do conhecimento'});
        }else{
        // verifica se o id da disciplina foi informado
          if(req.body.disciplina == undefined || req.body.disciplina == ''){
            res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'ID da disciplina não informado', mensagem: 'Por favor, informe todos os parâmetros necessários para cadastrar uma área do conhecimento'});
          }else{
              // Esse controlador é responsável por chamar o modelo que atualiza a área de conhecimento.
              areaConhecimento.updateAreaConhecimento((result) => {
                  // verifica se o resultado da consulta é vazio. 
                  // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                  if(result != undefined){
                    res.json({message: result})
                  }else{
                    res.json({message: 'Área do conhecimento atualizado com sucesso'})
                  }
                }, req.body.idArea, req.body.nomeArea, req.body.disciplina);
          }
        }
      }
    }
  }

  module.exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/areaConhecimentoModels.js
    var areaConhecimento = new application.src.models.areaConhecimentoModels() 
    if(req.query.idArea == undefined || req.query.idArea == ''){
      res.json({message: 'id da Area não informado'})
    } else{
      // Esse controlador chama o modelo de deleção das áreas de conhecimento
      areaConhecimento.deleteAreaConhecimento((result) => {
        if(result != undefined){
          res.json({message: result})
         } else{
          res.json({message: 'Área do conhecimento deletada com sucesso'})
         }
    }, req.query.idArea);
  }
}