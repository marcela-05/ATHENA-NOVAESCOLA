$(document).ready(() => {
    $('#caixa_alternador').change(() => {
        alternarTema()

        localStorage.removeItem('darkMode');

        if ($(':root').hasClass('darkMode')) {
            localStorage.setItem('darkMode', 1);
        }
    })

    function alternarTema() {
        $(':root').toggleClass('darkMode');
    }

    function carregarTema() {
        if (localStorage.getItem('darkMode')) {
            $('#caixa_alternador').click();
        }
    }
    carregarTema()
})

