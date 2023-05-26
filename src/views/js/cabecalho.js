const menu = document.getElementById('menu');
const body = document.body; 

menu.addEventListener('change', function() {
	if (this.checked) {
		body.classList.add('cor_alternativa');
	} else {
		body.classList.remove('cor_alternativa')
	}
});