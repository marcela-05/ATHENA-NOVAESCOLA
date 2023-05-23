const express = require('express');
const consign = require('consign');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views/');

app.use(express.static('./src/views/'));

app.get('/', (req, res) => {
  res.render('index');
});

consign()
  .include('src/routes')
  .then('src/models')
  .then('src/controllers')
  .into(app);

app.listen(3000, '127.0.0.1', () => {
console.log(`Servidor rodando em http://127.0.0.1:3000/`);
});