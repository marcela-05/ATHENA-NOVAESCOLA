exports.listaBlocos = function(application, req, res) {
    // cria conexão com o modelo /src/models/blocoQuestaoModels.js
    var blocos = new application.src.models.blocoQuestaoModels() 

    // verifica se o id da avaliação foi informado
    if(req.query.idAvaliacao == undefined || req.query.idAvaliacao == ''){
        res.json({message: 'id da avaliação não informado'})
    } else{
        // chama modelo que lista os blocos de questões com base no id da avaliação
        blocos.getBlocos((result) => {
            // verifica se o resultado da consulta é vazio
            if(result.length == 0){
                res.json({message: 'nenhum bloco de questão encontrado'})
            } else{
                res.json(result);
            }
        }, req.query.idAvaliacao);
    }
}

exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/blocoQuestaoModels.js
    var blocos = new application.src.models.blocoQuestaoModels() 

    // verifica se o número do bloco foi informado
    if(req.body.numBloco == undefined || req.body.numBloco == ''){
        res.json({message: 'número do bloco não informado'})
    } else{
        // verifica se a quantidade de questões foi informada
        if(req.body.quantQuestoes == undefined || req.body.quantQuestoes == ''){
            res.json({message: 'quantidade de questões não informada'})
        } else{
            // verifica se o id da avaliação foi informado
            if(req.body.idAvaliacao == undefined || req.body.idAvaliacao == ''){
                res.json({message: 'id da avaliação não informado'})
            } else{
                // verifica se o id da área foi informado
                if(req.body.idArea == undefined || req.body.idArea == ''){
                    res.json({message: 'id da área não informado'})
                } else{
                    // chama modelo que cadastra o bloco de questões
                    blocos.postBloco((result) => {
                        // verifica se o resultado da consulta é vazio. 
                        // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                        if(result != undefined){
                            res.json({message: result})
                        } else{
                            res.json({message: 'bloco de questão cadastrado com sucesso'})
                        }
                    }, req.body.numBloco, req.body.quantQuestoes, req.body.idAvaliacao, req.body.idArea);
                }
            }
        }
    }
}

exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/blocoQuestaoModels.js
    var blocos = new application.src.models.blocoQuestaoModels()

    // verifica se o número do bloco foi informado
    if(req.body.numBloco == undefined || req.body.numBloco == ''){
        res.json({message: 'número do bloco não informado'})
    } else{
        // verifica se a quantidade de questões foi informada
        if(req.body.quantQuestoes == undefined || req.body.quantQuestoes == ''){
            res.json({message: 'quantidade de questões não informada'})
        } else{
            // verifica se o id da avaliação foi informado
            if(req.body.idAvaliacao == undefined || req.body.idAvaliacao == ''){
                res.json({message: 'id da avaliação não informado'})
            } else{
                // verifica se o id da área foi informado
                if(req.body.idArea == undefined || req.body.idArea == ''){
                    res.json({message: 'id da área não informado'})
                } else{
                    // chama modelo que atualiza o bloco de questões
                    blocos.updateBloco((result) => {
                        // verifica se o resultado da consulta é vazio. 
                        // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                        if(result != undefined){
                            res.json({message: result})
                        } else{
                            res.json({message: 'bloco de questão atualizado com sucesso'})
                        }
                    }, req.body.numBloco, req.body.quantQuestoes, req.body.idAvaliacao, req.body.idArea);
                }
            }
        }
    }
}

exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/blocoQuestaoModels.js
    var blocos = new application.src.models.blocoQuestaoModels()

    // verifica se o id do bloco foi informado
    if(req.query.numBloco == undefined || req.query.numBloco == ''){
        res.json({message: 'número do bloco não informado'})
    } else{
        // verifica se o id da avaliação foi informado
        if(req.query.idAvaliacao == undefined || req.query.idAvaliacao == ''){
            res.json({message: 'id da avaliação não informado'})
        } else{
            // verifica se o id da área foi informado
            if(req.query.idArea == undefined || req.query.idArea == ''){
                res.json({message: 'id da área não informado'})
            } else{
                // chama modelo que deleta o bloco de questões
                blocos.deleteBloco((result) => {
                    // verifica se o resultado da consulta é vazio. 
                    // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                    if(result != undefined){
                        res.json({message: result})
                    } else{
                        res.json({message: 'bloco de questão deletado com sucesso'})
                    }
                }, req.query.numBloco, req.query.idAvaliacao, req.query.idArea);
            }
        }
    }
}