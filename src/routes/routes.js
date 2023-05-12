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
    application.post('/turma/atualizar', urlencodedParser, function(req, res){
      application.src.controllers.turmaControllers.atualiza(
        application, req, res
      );
    });

    // retorna controlador para deletar a turma
    application.get('/turma/deletar', urlencodedParser, function(req, res){
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
    application.post('/professor/cadastrar', function(req, res){
      application.src.controllers.professorControllers.cadastra(
        application, req, res
      );
    });


  }
