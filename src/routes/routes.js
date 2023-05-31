const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Essa função é responável por ler a rota inserida e, a partir dela, direcionar para um controlador
// Ex.: se a url for /turmas, essa função direciona para o controlador listaTurmas.
// Para além, os métodos http também são considerados, como get e post, por exemplo.
module.exports = function(application){
    // retorna controlador das turmas
    application.get('/turmas', function(req, res){
      application.src.controllers.turmaControllers.listaTurmas(
        application, req, res
      );
    });

    // retorna controlador para cadastro de turmas
    application.post('/turmas/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.turmaControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização da turma
    application.put('/turma/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.turmaControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar a turma
    application.delete('/turma/deletar', urlencodedParser, function(req, res){
      application.src.controllers.turmaControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar professores
    application.get('/professores', function(req, res){
      application.src.controllers.professorControllers.listaProfessores(
        application, req, res
      );
    });

    // retorna controlador para cadastrar professores
    application.post('/professor/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização do professor
    application.post('/professor/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar professor
    application.delete('/professor/deletar', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para login dos professores
    application.post('/login', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.login(
        application, req, res
      );
    });

    // retorna controlador para vincular professor com disciplina
    application.post('/professor/disciplina', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.vinculaDisciplina(
        application, req, res
      );
    });

    // retorna controlador para listar área do conhecimento
    application.get('/areaConhecimento', function(req, res){
      application.src.controllers.areaConhecimentoControllers.listaAreaConhecimento(
        application, req, res
      );
    });

    // retorna controlador para cadastrar área do conhecimento
    application.post('/areaConhecimento/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.areaConhecimentoControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização da área do conhecimento
    application.put('/areaConhecimento/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.areaConhecimentoControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar área do conhecimento
    application.delete('/areaConhecimento/deletar', urlencodedParser, function(req, res){
      application.src.controllers.areaConhecimentoControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar alunos
    application.get('/alunos', function(req, res){
      application.src.controllers.alunoControllers.listaAlunos(
        application, req, res
      );
    });

    // retorna controlador para cadastrar aluno
    application.post('/aluno/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.alunoControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização do aluno
    application.put('/aluno/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.alunoControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar aluno
    application.delete('/aluno/deletar', urlencodedParser, function(req, res){
      application.src.controllers.alunoControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar avaliações
    application.get('/avaliacoes', function(req, res){
      application.src.controllers.avaliacaoControllers.listaAvaliacoes(
        application, req, res
      );
    });

    // retorna controlador para cadastrar avaliação
    application.post('/avaliacao/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.avaliacaoControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização da avaliação
    application.put('/avaliacao/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.avaliacaoControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar avaliação
    application.delete('/avaliacao/deletar', urlencodedParser, function(req, res){
      application.src.controllers.avaliacaoControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar disciplinas
    application.get('/disciplinas', function(req, res){
      application.src.controllers.disciplinaControllers.listaDisciplinas(
        application, req, res
      );
    });

    // retorna controlador para cadastrar disciplina
    application.post('/disciplina/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.disciplinaControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização da disciplina
    application.put('/disciplina/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.disciplinaControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar disciplina
    application.delete('/disciplina/deletar', urlencodedParser, function(req, res){
      application.src.controllers.disciplinaControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar blocos
    application.get('/blocos', function(req, res){
      application.src.controllers.blocoQuestaoControllers.listaBlocos(
        application, req, res
      );
    });

    // retorna controlador para cadastrar bloco
    application.post('/bloco/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.blocoQuestaoControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização do bloco
    application.put('/bloco/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.blocoQuestaoControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar bloco
    application.delete('/bloco/deletar', urlencodedParser, function(req, res){
      application.src.controllers.blocoQuestaoControllers.deleta(
        application, req, res
      );
    });

    // retorna controlador para listar notas
    application.get('/notas', function(req, res){
      application.src.controllers.notaControllers.listaNotas(
        application, req, res
      );
    });

    // retorna controlador para cadastrar nota
    application.post('/nota/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.notaControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização da nota
    application.post('/nota/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.notaControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar nota
    application.delete('/nota/deletar', urlencodedParser, function(req, res){
      application.src.controllers.notaControllers.deleta(
        application, req, res
      );
    });
  }
