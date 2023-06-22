$(document).ready(function(){
	$("#menu").click(function(){
		// verifica se o menu está marcado, se sim, esconde a main, se não, mostra a main
		if($(this).prop("checked")){
			$("main").hide();
		} else {
			$("main").show();
		}
	});

	function ajustarTamanhoTela(mediaQuery) {
        if (mediaQuery.matches) {
          $(".nav_desktop").css("display", "flex");
          $(".nav").css("display", "none");
        } else {
          $(".nav_desktop").css("display", "none");
          $(".nav").css("display", "flex");
        }
      }
      
      var mediaQuery = window.matchMedia("(min-width: 1000px)");
      ajustarTamanhoTela(mediaQuery); // Chamada inicial
      
      mediaQuery.addEventListener("change", function(event) {
        ajustarTamanhoTela(event.target);
      });    
    
});