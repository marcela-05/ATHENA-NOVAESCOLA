$(document).ready(() => {
    $('#caixa_alternador').change(() => {
        alternarTema();

        if ($(':root').hasClass('darkMode')) {
            localStorage.setItem('darkMode', 'true');
        } else {
            localStorage.removeItem('darkMode');
        }
    });

    $('#checkbox_dark_mode').change(() => {
        alternarTema();

        if ($(':root').hasClass('darkMode')) {
            localStorage.setItem('darkMode', 'true');
        } else {
            localStorage.removeItem('darkMode');
        }
    });

    function alternarTema() {
        $(':root').toggleClass('darkMode');
    }

    function carregarTema() {
        if (localStorage.getItem('darkMode')) {
            $('#caixa_alternador').prop('checked', true);
            $('#checkbox_dark_mode').prop('checked', true);
            alternarTema();
        }
    }
    carregarTema();
});
