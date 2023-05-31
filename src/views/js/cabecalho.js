$(document).ready(function(){
	$("#menu").click(function(){
		// verifica se o menu está marcado, se sim, esconde a main, se não, mostra a main
		if($(this).prop("checked")){
			$("main").hide();
		} else {
			$("main").show();
		}
	});
});