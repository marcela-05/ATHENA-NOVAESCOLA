const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const multer = require('multer');

// Configuração de armazenamento de arquivos com multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'src/views/uploads/')
  },
  filename: function (req, file, cb) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1];

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = file.originalname.split('.')[0] + '-' + req.session.idProfessor;

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

const upload = multer({ storage });


// Essa função é responável por ler a rota inserida e, a partir dela, direcionar para um controlador
// Ex.: se a url for /turmas, essa função direciona para o controlador listaTurmas.
// Para além, os métodos http também são considerados, como get e post, por exemplo.
module.exports = function(application){
    // retorna controlador das turmas
    application.get('/turmas', function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.turmaControllers.listaTurmas(
          application, req, res
        );
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      }
    });

    // retorna controlador para cadastro de turmas
    application.post('/turmas/cadastrar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.turmaControllers.cadastra(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para a atualização da turma
    application.post('/turmas/editar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.turmaControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar a turma
    application.delete('/turma/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.turmaControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para listar professores
    application.get('/professores', function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.professorControllers.listaProfessores(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para cadastrar professores
    application.post('/professor/cadastrar', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.cadastra(
        application, req, res
      );
    });

    // retorna controlador para a atualização do professor
    application.post('/professor/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.professorControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar professor
    application.delete('/professor/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.professorControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para login dos professores
    application.post('/login', urlencodedParser, function(req, res){
      application.src.controllers.professorControllers.login(
        application, req, res
      );
    });

    // retorna controlador para vincular professor com disciplina
    application.post('/professor/disciplina', upload.single('fotoPerfil'), function(req, res){
      req.session.urlFoto = '/uploads/' + req.file.filename
      application.src.controllers.professorControllers.vinculaDisciplina(
        application, req, res
      );
    });

    // retorna controlador para cadastrar área do conhecimento
    application.post('/areaConhecimento/cadastrar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.areaConhecimentoControllers.cadastra(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para a atualização da área do conhecimento
    application.post('/areaConhecimento/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.areaConhecimentoControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar área do conhecimento
    application.delete('/areaConhecimento/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.areaConhecimentoControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para listar alunos
    application.get('/alunos', function(req, res){
      if(req.session.autorizado !== true){
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else {
        application.src.controllers.alunoControllers.listaAlunos(
          application, req, res
        );
      }
    });

    // retorna controlador para cadastrar aluno
    application.post('/alunos/cadastrar', urlencodedParser, function(req, res){
      // verifica se a requisição não veio de um formulário
      if(req.body.formulario === undefined && req.session.autorizado !== true){
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else if(req.session.autorizado !== true){
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.alunoControllers.cadastra(
          application, req, res
        );
      }
    });

    // retorna controlador para a atualização do aluno
    application.post('/aluno/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.alunoControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar aluno
    application.delete('/aluno/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.alunoControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para listar avaliações
    application.get('/avaliacoes', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.avaliacaoControllers.listaAvaliacoes(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para cadastrar avaliação
    application.post('/avaliacoes/cadastrar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.avaliacaoControllers.cadastra(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para a atualização da avaliação
    application.post('/avaliacao/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.avaliacaoControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar avaliação
    application.delete('/avaliacao/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.avaliacaoControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para listar disciplinas
    application.get('/disciplinas', function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.disciplinaControllers.listaDisciplinas(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para cadastrar disciplina
    application.post('/disciplina/cadastrar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.disciplinaControllers.cadastra(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para a atualização da disciplina
    application.post('/disciplina/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.disciplinaControllers.atualiza(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para deletar disciplina
    application.delete('/disciplina/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.disciplinaControllers.deleta(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para listar blocos
    application.get('/blocos', function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.blocoQuestaoControllers.listaBlocos(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para cadastrar bloco
    application.post('/bloco/cadastrar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.blocoQuestaoControllers.cadastra(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para a atualização do bloco
    application.put('/bloco/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.blocoQuestaoControllers.atualiza(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para deletar bloco
    application.delete('/bloco/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.blocoQuestaoControllers.deleta(
          application, req, res
        );
      } else{
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      }
    });

    // retorna controlador para listar notas por alunos
    application.get('/notas', function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.notaControllers.listaNotas(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para listar notas por turmas
    application.get('/notas/turma', function(req, res){
      application.src.controllers.notaControllers.listaNotasPorTurma(
        application, req, res
      );
    });

    // retorna controlador para cadastrar nota
    application.post('/avaliacoes/inserirResultado', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.notaControllers.cadastra(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para a atualização da nota
    application.post('/nota/atualizar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.notaControllers.atualiza(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // retorna controlador para deletar nota
    application.delete('/nota/deletar', urlencodedParser, function(req, res){
      // verifica se o usuário está logado
      if(req.session.autorizado){
        application.src.controllers.notaControllers.deleta(
          application, req, res
        );
      } else if(req.query.tipoConsulta == 'json'){
        // se existir um parâmetro tipoConsulta na URL com o valor json, retorna um json
        res.status(403).json({message: 'Acesso negado. Por favor, faça login.'});
      } else{
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}})
      }
    });

    // renderiza página de login
    application.get('/', (req, res) => {
      if (req.session.autorizado) {
        res.redirect('/home');
      } else {
        res.render('html/login');
      }
    });
    
    // renderiza página de cadastro
    application.get('/cadastro', (req, res) => {
      if (req.session.autorizado) {
        res.redirect('/home');
      } else {
        res.render('html/register');
      }
    });
    
    // renderiza página de cadastro de perfil
    application.get('/cadastro/perfil', (req, res) => {
      if (req.session.cadastrado) {
        res.render('html/perfil');
      } else {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      }
    });
    
    // renderiza página principal
    application.get('/home', (req, res) => {
      if (req.session.autorizado) {
        res.render('html/index', {nome: `${req.session.nomeProfessor}`, urlFoto: req.session.urlFoto});
      } else {
        res.redirect('/')
      }
    });

    // retorna controlador para renderizr página de cadastro de assunto/area de conhecimento
    application.get('/areaConhecimento/cadastrar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.areaConhecimentoControllers.cadastra(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizr página de atualização de assunto/area de conhecimento
    application.get('/areaConhecimento/atualizar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.areaConhecimentoControllers.atualiza(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página que lista todas as áreas
    application.get('/areaConhecimento/listar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.areaConhecimentoControllers.listaAreasConhecimento(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página de cadastrar aluno
    application.get('/alunos/cadastrar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.alunoControllers.cadastra(
          application, req, res
        );
      }
    });

    // retorna controlador para listar alunos
    application.get('/alunos/verTodos', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.alunoControllers.listaAlunos(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página de cadastrar turma
    application.get('/turmas/cadastrar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.turmaControllers.cadastra(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página de editar turma
    application.get('/turmas/editar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.turmaControllers.atualiza(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página de cadastrar avaliação
    application.get('/avaliacoes/cadastrar', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.avaliacaoControllers.cadastra(
          application, req, res
        );
      }
    });

    // retorna controlador para renderizar a página de inserir nota de avaliação
    // retorna controlador para cadastrar nota
    application.get('/avaliacoes/inserirResultado', urlencodedParser, function(req, res){
      if (req.session.autorizado != true) {
        res.render('html/erro', {codigoStatus: 403, tituloMensagem: 'Acesso negado', mensagem: 'Por favor, para aproveitar o melhor da Athena, faça login.', botao: {texto: 'Fazer login', url: '/'}});
      } else {
        application.src.controllers.notaControllers.cadastra(
          application, req, res
        );
      }
    });

    // logout
    application.get('/logout', function(req, res){
      req.session.destroy(function(err){
        res.redirect('/');
      });
    });
  }
