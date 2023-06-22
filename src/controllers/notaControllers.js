exports.listaNotas = function(application, req, res) {
    // cria conexão com o modelo /src/models/notaModels.js
    var notas = new application.src.models.notaModels() 

    // verifica se o id do aluno foi informado
    if(req.query.idAluno == undefined || req.query.idAluno == ''){
        res.json({message: 'id do aluno não informado'})
    } else{
        // código para evitar SQL Injection
        // converte o id do aluno para inteiro
        req.query.idAluno = parseInt(req.query.idAluno)
        // verifica se o id do aluno é um número, se não for, retorna mensagem de erro
        if(isNaN(req.query.idAluno)){
            res.json({message: 'id do aluno inválido'})
        } else{
            // chama modelo que lista os blocos de questões
            notas.getNotas((result) => {
                // verifica se o resultado da consulta é vazio
                if(result.length == 0){
                    res.json({message: 'nenhuma nota encontrada'})
                } else{
                    res.json(result);
                }
            }, req.query.idAluno);
        }
    }
}

exports.listaNotasPorTurma = function(application, req, res) {
    // cria conexão com o modelo /src/models/notaModels.js
    var notas = new application.src.models.notaModels()

    // verifica se o id da turma foi informado
    if(req.query.idTurma == undefined || req.query.idTurma == ''){
        res.json({message: 'id da turma não informado'})
    }
    else{
        notas.getNotasTurma((result) => {
            // verifica se o resultado da consulta é vazio
            res.json(result);  // retorna o resultado da consulta
        }, req.query.idTurma, req.query.idDisciplina);
    }
}

exports.cadastra = function(application, req, res) {
    // cria conexão com o modelo /src/models/notaModels.js
    var notas = new application.src.models.notaModels()
    // cria conexão com o modelo /src/models/professorModels.js
    var professor = new application.src.models.professorModels()
    // cria conexão com o modelo /src/models/notaModels.js
    var avaliacao = new application.src.models.notaModels()
    // cria conexão com o modelo /src/models/alunoModels.js
    var aluno = new application.src.models.alunoModels()
    // cria conexão com o modelo /src/models/blocoQuestaoModels.js
    var blocos = new application.src.models.blocoQuestaoModels()
    
    // verifica se o método da requisição é GET
    if(req.method == 'GET'){
        if(req.query.idAvaliacao == undefined || req.query.idAvaliacao == ''){
            res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'ID da avaliação não informado', mensagem: 'Por favor, informe todos os campos obrigatórios'})
        } else {
            aluno.getAlunos((alunos) => {
                blocos.getBlocos((blocos) => {
                    // renderiza a página de inserção de resultados, passando os alunos e blocos de questões como parâmetro
                    res.render('html/inserirResultados', {alunos: alunos, blocos: blocos, urlFoto: req.session.urlFoto})
                }, req.query.idAvaliacao)
            }, req.session.idProfessor)
        }
    } else {
        if(typeof req.body.numBloco == 'string'){
            notas.postNota((result) => {
                // verifica se o resultado da consulta é vazio. 
                // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                if(result != undefined){
                    res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Erro ao cadastrar nota', mensagem: result})
                } else{
                    res.redirect('/home')
                }
            }, req.body.aluno, req.query.idAvaliacao, req.body.numBloco, req.body.acertos);
        } else {
            for(let i = 0; i < req.body.numBloco.length; i++){
                notas.postNota((result) => {
                }, req.body.aluno, req.query.idAvaliacao, req.body.numBloco[i], req.body.acertos[i]);
            }
            res.redirect('/home')
        }
       
    }
}

exports.atualiza = function(application, req, res) {
    // cria conexão com o modelo /src/models/notaModels.js
    var notas = new application.src.models.notaModels()

    // código para evitar SQL Injection
    // converte o id do aluno para inteiro
    req.body.idAluno = parseInt(req.body.idAluno)
    // verifica se o id do aluno é um número, se não for, retorna mensagem de erro
    if(isNaN(req.body.idAluno)){
        res.json({message: 'id do aluno inválido'})
    } else {
        // converte o id da avaliação para inteiro
        req.body.idAvaliacao = parseInt(req.body.idAvaliacao)
        // verifica se o id da avaliação é um número, se não for, retorna mensagem de erro
        if(isNaN(req.body.idAvaliacao)){
            res.json({message: 'id da avaliação inválido'})
        } else {
            // converte o número de blocos para inteiro
            req.body.numBloco = parseInt(req.body.numBloco)
            // verifica se o número de blocos é um número, se não for, retorna mensagem de erro
            if(isNaN(req.body.numBloco)){
                res.json({message: 'número de blocos inválido'})
            } else {
                // converte a nota de acertos para inteiro
                req.body.notaAcertos = parseInt(req.body.notaAcertos)
                // verifica se a nota de acertos é um número, se não for, retorna mensagem de erro
                if(isNaN(req.body.notaAcertos)){
                    res.json({message: 'nota de acertos inválida'})
                } else {
                    // chama modelo que atualiza a nota
                    notas.updateNota((result) => {
                        // verifica se o resultado da consulta é vazio. 
                        // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                        if(result != undefined){
                            res.json({message: result})
                        } else{
                            res.json({message: 'nota atualizada com sucesso'})
                        }
                    }, req.body.idAluno, req.body.idAvaliacao, req.body.numBloco, req.body.notaAcertos)
                }
            }
        }
    }
}

exports.deleta = function(application, req, res) {
    // cria conexão com o modelo /src/models/notaModels.js
    var notas = new application.src.models.notaModels()

    // código para evitar SQL Injection
    // converte o id do aluno para inteiro
    req.query.idAluno = parseInt(req.query.idAluno)
    // verifica se o id do aluno é um número, se não for, retorna mensagem de erro
    if(isNaN(req.query.idAluno)){
        res.json({message: 'id do aluno inválido'})
    } else {
        // converte o id da avaliação para inteiro
        req.query.idAvaliacao = parseInt(req.query.idAvaliacao)
        // verifica se o id da avaliação é um número, se não for, retorna mensagem de erro
        if(isNaN(req.query.idAvaliacao)){
            res.json({message: 'id da avaliação inválido'})
        } else {
            // converte o número de blocos para inteiro
            req.query.numBloco = parseInt(req.query.numBloco)
            // verifica se o número de blocos é um número, se não for, retorna mensagem de erro
            if(isNaN(req.query.numBloco)){
                res.status(406).json({message: 'número de blocos inválido'})
            } else {
                // chama o modelo que deleta a nota
                notas.deleteNota((result) => {
                    // verifica se o resultado da consulta é vazio. 
                    // Se for, retorna mensagem de sucesso, se não, retorna mensagem de erro (result)
                    if(result != undefined){
                        res.json({message: result})
                    } else{
                        res.json({message: 'nota deletada com sucesso'})
                    }
                }, req.query.idAluno, req.query.idAvaliacao, req.query.numBloco)
            }
        }
    }
}