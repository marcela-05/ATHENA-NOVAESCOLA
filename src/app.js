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
  res.render('html/login');
});

app.get('/cadastro', (req, res) => {
  res.render('html/register');
});

app.get('/perfil', (req, res) => {
  if (req.session.autorizado) {
		res.render('html/perfil');
	} else {
		res.send('Acesso negado').status(401);
	}
	res.end();
});

app.get('/home', (req, res) => {
  if (req.session.autorizado) {
		res.render('html/index');
	} else {
		res.send('Acesso negado').status(401);
	}
	res.end();
});

consign()
  .include('src/routes')
  .then('src/models')
  .then('src/controllers')
  .into(app);

app.listen(3000, '127.0.0.1', () => {
console.log(`Servidor rodando em http://127.0.0.1:3000/`);
});