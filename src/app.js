const express = require('express');
const session = require('express-session');
const consign = require('consign');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views/');

app.use(session({
	secret: 'secret-key-nv-int-321',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/views/'));

app.get('/', (req, res) => {
	if (req.session.autorizado) {
		res.redirect('/home');
	} else {
		res.render('html/login');
	}
});

app.get('/cadastro', (req, res) => {
	if (req.session.autorizado) {
		res.redirect('/home');
	} else {
		res.render('html/register');
	}
});

app.get('/cadastro/perfil', (req, res) => {
	if (req.session.autorizado && req.session.cadastrado) {
		res.render('html/perfil');
	} else {
		res.redirect('/home')
	}
});

app.get('/home', (req, res) => {
  if (req.session.autorizado) {
		res.render('html/index', {nome: `${req.session.nomeProfessor}`});
	} else {
		res.redirect('/')
	}
});

consign()
  .include('src/routes')
  .then('src/models')
  .then('src/controllers')
  .into(app);

app.listen(3000, '127.0.0.1', () => {
console.log(`Servidor rodando em http://127.0.0.1:3000/`);
});