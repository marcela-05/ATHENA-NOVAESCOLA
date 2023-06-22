$(document).ready(function(){
    $(".assuntos_checkbox").change(function() {
        // quando o checkbox é marcado, adiciona um novo campo de input na seção de assuntos
        if ($(this).prop("checked") == true) {
            $("#teste").append('<div class="assunto" id="assunto' + $(this).prop("value") + '"> <p class="assunto_nome">' +  $("#label-" + $(this).prop("value")).prop('outerText') + '</p> <input  onchange="confereQuestoes()" class="assunto_input" type="number" name="assunto" id="assunto' + $(this).prop("value") +'" placeholder="Quantidade"> <input type="hidden" name="blocoArea" value="' + $(this).prop("value") + '"> </div>')
        } else {
            $("#assunto" +  $(this).prop("value")).remove()  // remove o campo de input da seção de assuntos
        }
    });
    
    $(".assuntos_checkbox").trigger("change");
});