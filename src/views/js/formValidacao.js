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