function confereSenha(){
    // lê os valores dos campos de senha e confirmação de senha
    const senha = document.querySelector('input[name=senhaProfessor]');
    const senhaConfirma = document.querySelector('input[name=senhaProfessorConfirm]');

    // valida se os valores são diferentes. Caso sejam, seta uma mensagem de erro
    if(senha.value != senhaConfirma.value){
        senhaConfirma.setCustomValidity('Senhas diferentes!');
    } else {
        senhaConfirma.setCustomValidity('');
    }
}

function confereEmail(){
    // lê os valores dos campos de email e confirmação de email
    const email = document.querySelector('input[name=emailProfessor]');
    const emailConfirma = document.querySelector('input[name=emailProfessorConfirm]');

    // valida se os valores são diferentes. Caso sejam, seta uma mensagem de erro
    if(email.value != emailConfirma.value){
        emailConfirma.setCustomValidity('Emails diferentes!');
    } else {
        emailConfirma.setCustomValidity('');
    }
}

function confereQuestoes(){
    const total = document.querySelector('input[name=quantQuestoes]');
    const blocos = document.getElementsByName('assunto');
    
    var soma = 0;
    for(let i = 0; i < blocos.length; i++){
        soma += parseInt(blocos[i].value);
    }
    if(soma != total.value){
        total.setCustomValidity('A soma das questões não bate com o total de questões!');
    }else {
        total.setCustomValidity('');
    }
}

// função que valida se o arquivo foi selecionado
function validaImagem() {
    var fileInput = document.getElementById('file-upload');
    var file = fileInput.files[0];
    
    if (!file) {
      alert("Selecione uma imagem para o seu perfil")
      return false
    }
    return true
}

// função que valida se o checkbox foi selecionado
function checkedDisciplina() {
    var checkboxes = document.querySelectorAll('input[name="checkboxDisciplina"]');
    
    // verifica se há algum checkbox selecionado
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }

    alert("Selecione pelo menos uma disciplina");
    return false;
  }
  
function handleSubmit(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Verifica se nenhum alert foi exibido nas funções anteriores
    if (validaImagem() == true && checkedDisciplina() == true) {
        // Nenhum alert foi exibido, então você pode enviar o formulário
        document.getElementById("formPerfil").action = "/professor/disciplina";
        document.getElementById("formPerfil").submit();
    }
  }