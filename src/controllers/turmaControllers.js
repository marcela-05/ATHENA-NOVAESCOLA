exports.listaTurmas = function(application, req, res) {
    // cria conexão com o modelo /src/models/turmaModels.js
    var turmas = new application.src.models.turmaModels() 
    // Caso o id da Turma seja informado, então o modelo de getTurma é chamado.
    // Esse controlador passa o idTurma, vindo da rota, para o modelo.
    // No final, o resultado que o modelo retorna é mostrado em formato json como resposta.
    if(req.query.idTurma != undefined) {
      turmas.getTurma((result) => {
        if(result == 'turma não encontrada'){
          if(req.query.tipoConsulta == 'json'){
            res.json({message: 'turma não encontrada'})
          } else {
            res.render('html/erro', {codigoStatus: 404, tituloMensagem: 'Turma não encontrada', mensagem: ''});
          }
        } else {
          turmas.getDisciplinaDaTurma((disciplina) => {
            turmas.getTurmaAlunos((alunos) => {
              if(req.query.tipoConsulta == 'json'){
                res.json({turma: result[0], disciplina: disciplina[0], alunos: alunos});
              } else {
                res.render('html/turma', {turma: result[0], disciplina: disciplina[0], alunos: alunos, urlFoto: req.session.urlFoto});
              }
            }, req.query.idTurma);
          }, req.query.idTurma);
        }
      }, req.query.idTurma, req.session.idProfessor);
    }

    // caso o id da turma não seja infomrado, então o modelo de getProfTurmas é chamado.
    // Esse controlador passa o idProfessor, vindo da sessão, para o modelo.
    else if(req.query.idTurma == undefined && req.query.idProfessor == undefined){
      turmas.getProfTurmas((result) => {
        if (result.length == 0) {
          if(req.query.tipoConsulta == 'json'){
            res.json({message: 'Nenhuma turma encontrada'}).status(404)
          } else {
            res.redirect('/turmas/cadastrar')
          }
        } else {
          turmas.getDisciplinaDaTurma((disciplinas) => {
            if(req.query.tipoConsulta == 'json'){
              res.json({turmas: result, disciplinas: disciplinas});
            } else {
              res.render('html/turmas', {turmas: result, disciplinas: disciplinas, profDisciplinas: req.session.profDisciplinas, urlFoto: req.session.urlFoto});
            }
          }, '', req.session.idProfessor);
        }
      }, req.session.idProfessor);
    }
  }

module.exports.cadastra = function(application, req, res) {
  // cria conexão com o modelo /src/models/turmaModels.js
  var turmas = new application.src.models.turmaModels()
  // cria conexão com o modelo /src/models/alunoModels.js
  var alunos = new application.src.models.alunoModels()
  // cria conexão com o modelo /src/models/professorModels.js
  var professor = new application.src.models.professorModels()

  // verifica se o método da requisição é GET
  if(req.method == 'GET'){
    // esse controlador chama o modelo de listagem de disciplinas
    professor.listaDisciplinas((result) => {
      // esse controlador chama o modelo de listagem de alunos
      alunos.getAlunos((alunos) => {
        // verifica se o resultado da consulta é vazio. Se for, redireciona para a página de turmas
        if(result.length == 0){
          res.render('html/cadastrarTurma', {disciplinas: '', alunos: alunos, urlFoto: req.session.urlFoto});
        } else{
          res.render('html/cadastrarTurma', {disciplinas: result, alunos: alunos, urlFoto: req.session.urlFoto});
        }
      }, req.session.idProfessor)

    }, req.session.idProfessor);
  } else{
    // verifica se o id da disciplina foi informado
    if(req.body.disciplina == undefined || req.body.disciplina == ''){
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Disciplina não informada', mensagem: 'Por favor, informe a disciplina da turma.'})
    } else{
      // verifica se o nome da turma foi informado
      if(req.body.nomeTurma == undefined || req.body.nomeTurma == ''){
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome da turma não informado', mensagem: 'Por favor, informe o nome da turma.'})
      } else{
          // verifica se a série da turma foi informada
          if(req.body.serieTurma == undefined || req.body.serieTurma == ''){
              res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Série da turma não informada', mensagem: 'Por favor, informe a série da turma.'})
          } 
          else{
            // se todos os campos foram informados, então o modelo de postTurma é chamado
            turmas.postTurma((result) => {
              // itera pelos alunos selecionados, chamando o modelo vinculaTurma de aluno
              if(req.body.alunos !== undefined && req.body.alunos !== ''){
                if(typeof req.body.alunos == 'string'){
                  alunos.vinculaTurma((res) => {}, req.body.alunos, result);
                } else {
                  for(aluno of req.body.alunos){
                    alunos.vinculaTurma((res) => {}, aluno, result);
                  }
                }
              }
              res.redirect('/turmas');
            }, req.session.idProfessor, req.body.disciplina, req.body.nomeTurma, req.body.serieTurma);
          }
      }
    }
  }
}
  

module.exports.atualiza = function(application, req, res) {
  // cria conexão com o modelo /src/models/turmaModels.js
  var turmas = new application.src.models.turmaModels()
  // cria conexão com o modelo /src/models/alunoModels.js
  var alunos = new application.src.models.alunoModels()
  // cria conexão com o modelo /src/models/professorModels.js
  var professor = new application.src.models.professorModels()

  // verifica se o método da requisição é GET
  if(req.method == 'GET'){
    // verifica se o id da turma foi informado
    if(req.query.idTurma == undefined || req.query.idTurma == ''){
      res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Turma não informada', mensagem: 'Por favor, informe a turma que deseja editar.'})
    } else {
      // esse controlador chama o modelo de listagem de disciplinas
      professor.listaDisciplinas((result) => {
        // esse controlador chama o modelo de listagem de alunos
        alunos.getAlunos((alunos) => {

          // get turma é responsável por pegar os dados da turma que será editada
          turmas.getTurma((turma) => {

            // get disciplina da turma é responsável por pegar o nome da disciplina da turma que será editada
            turmas.getDisciplinaDaTurma((disciplina) => {

              // get turma alunos é responsável por pegar os alunos da turma que será editada
              turmas.getTurmaAlunos((alunosDaTurma) => {

                // cria um array com os ids dos alunos da turma que será editada
                let idAlunosDaTurma = []
                for(aluno of alunosDaTurma){
                  idAlunosDaTurma.push(aluno.id_aluno)
                }
                // itera pelos alunos e verifica se o id do aluno está no array de ids dos alunos da turma
                // se estiver, o atributo checked do aluno é setado como true
                for(aluno of alunos){
                  if(idAlunosDaTurma.includes(aluno.id_aluno)){
                    aluno.checked = true
                  }
                }
                // seta o nome da disciplina e o id da disciplina da turma que será editada
                turma[0].disciplina = disciplina[0].nome
                turma[0].idDisciplina = disciplina[0].id_disciplina

                // renderiza a página de edição de turma, passando as disciplinas, os alunos e a turma que será editada
                res.render('html/editarTurma', {disciplinas: result, alunos: alunos, turma: turma[0], urlFoto: req.session.urlFoto});
              }, req.query.idTurma)
            }, req.query.idTurma)
            
          }, req.query.idTurma, req.session.idProfessor);
        }, req.session.idProfessor)

      }, req.session.idProfessor);
    }
  } else{
    // verifica se o id da disciplina foi informado
    if(req.body.disciplina == undefined || req.body.disciplina == ''){
        res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Disciplina não informada', mensagem: 'Por favor, informe a disciplina da turma.'})
    } else{
      // verifica se o nome da turma foi informado
      if(req.body.nomeTurma == undefined || req.body.nomeTurma == ''){
          res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Nome da turma não informado', mensagem: 'Por favor, informe o nome da turma.'})
      } else{
          // verifica se a série da turma foi informada
          if(req.body.serieTurma == undefined || req.body.serieTurma == ''){
              res.render('html/erro', {codigoStatus: 400, tituloMensagem: 'Série da turma não informada', mensagem: 'Por favor, informe a série da turma.'})
          } 
          else{
            turmas.updateTurma((result) => {
              // se for string, significa que só um aluno foi selecionado
              if(typeof req.body.alunos == 'string'){
                // vincula o aluno à turma
                alunos.vinculaTurma((res) => {}, req.body.alunos, req.query.idTurma);
                
                // lista os alunos da turma que foi editada
                turmas.getTurmaAlunos((alunosDaTurma) => {
                  if(alunosDaTurma.length > 0){
                    // verifica se algum aluno foi desmarcado
                    for(aluno of alunosDaTurma){
                      if(!req.body.alunos.includes(aluno.id_aluno.toString())){
                        // desvincula o aluno da turma, já que ele foi desmarcado
                        alunos.desvinculaTurma((res) => {}, aluno.id_aluno, req.query.idTurma);
                      }
                    }
                  }
                }, req.query.idTurma)
              } else {
                // verifica se alunos é undefined, se for, seta o array como vazio
                if(req.body.alunos == undefined){
                  req.body.alunos = []
                }
                
                // itera pelos alunos e vincula eles à turma
                for(aluno of req.body.alunos){
                  alunos.vinculaTurma((res) => {}, aluno, req.query.idTurma);
                }

                // lista os alunos da turma que foi editada
                turmas.getTurmaAlunos((alunosDaTurma) => {
                  if(alunosDaTurma.length > 0){
                    // verifica se algum aluno foi desmarcado
                    for(aluno of alunosDaTurma){
                      if(!req.body.alunos.includes(aluno.id_aluno.toString())){
                        // desvincula o aluno da turma, já que ele foi desmarcado
                        alunos.desvinculaTurma((res) => {}, aluno.id_aluno, req.query.idTurma);
                      }
                    }
                  }
                }, req.query.idTurma)
              }
            
              res.redirect('/turmas');
            }, req.body.nomeTurma, req.query.idTurma, req.body.serieTurma, req.body.disciplina);
          }
      }
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