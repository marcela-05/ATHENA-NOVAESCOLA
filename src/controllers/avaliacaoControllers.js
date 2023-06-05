// nome do controlador vem depois do exports
exports.listaAvaliacoes = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 
     // verifica se o id do professor foi informado
     if(req.query.idProfessor == undefined || req.query.idProfessor == ''){
      res.json({message: 'id do professor não informado'})
  } else{
      // esse controlador chama o modelo de listagem de avaliações
      avaliacoes.getAvaliacoes((result) => {
          // verifica se o resultado da consulta é vazio
          if(result.length == 0){
              res.json({message: 'nenhuma avaliação encontrada'})
          } else{
              res.json(result);
          }
        }, req.query.idProfessor);
  }
}

module.exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/avaliacaoModels.js
    var avaliacoes = new application.src.models.avaliacaoModels() 

    // verifica se o método da requisição é GET
    if(req.method == 'GET'){
        res.render('html/cadastrarAvaliacao', {validacao: {}, dadosForm: {}})
    } else {
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
            // verifica se o id do professor foi informado
            if(req.body.idProfessor == undefined || req.body.idProfessor == ''){
                res.json({message: 'id do professor não informado'})
            } else{
                // Esse controlador é responsável por chamar o modelo que cadastra a avaliação
                avaliacoes.postAvaliacao((result) => {
                    // verifica se o resultado da consulta é vazio. 
                    // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                    if(result != undefined){
                        res.json({message: result})
                    } else{
                        res.json({message: 'avaliação cadastrada com sucesso'})
                    }
                    }, req.body.nomeAvaliacao, req.body.dataAvaliacao, req.body.serieAvaliacao, req.body.idProfessor);
            }
        }
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

