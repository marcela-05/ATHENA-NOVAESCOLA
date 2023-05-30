// Obtém a referência ao elemento HTML com o ID 'menu'
const menu = document.getElementById('menu');

// Obtém a referência ao elemento HTML 'body' do documento
const body = document.body; 

// Adiciona um ouvinte de eventos para o evento 'change' no elemento 'menu'
menu.addEventListener('change', function() {

	// Verifica se o checkbox está marcado
	if (this.checked) {
		// Adiciona a classe CSS 'cor_alternativa' ao elemento 'body'
		body.classList.add('cor_alternativa');
	} else {
		// Remove a classe CSS 'cor_alternativa' do elemento 'body'
		body.classList.remove('cor_alternativa')
	}
});