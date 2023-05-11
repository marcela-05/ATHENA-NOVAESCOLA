const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

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
  }