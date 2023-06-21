$(document).ready(() => {
    const url = new URL(window.location.href);
    let dataArray
    let notasPorAvaliacao = {}
    let nomeDasAvaliacoes
    let notaMedia = {}
    $.ajax({
        url: `/notas/turma?idTurma=${url.searchParams.get("idTurma")}`,
        type: 'GET',
        dataType: 'text',
        async: true,
        success: (data) => {
            if (data === '{"message":"nenhuma nota encontrada"}') {

            } else {
                dataArray = JSON.parse(data);
                ordemAlfabetica()
                agruparPorAvaliacao()
                acharNotaMedia()
                console.log(notaMedia)
                console.log(dataArray)


                $('#geral').before('<canvas id="grafico_geral"></canvas>')
                $('#geral').remove()
                graficoGeral()
                tabsDasAvaliacoes()

                $('#media').before('<canvas id="grafico_media"></canvas>')
                $('#media').remove()
                grafico_media()

                $('#defasagem').before('<canvas id="grafico_defasagem"></canvas>')
                $('#defasagem').remove()
                grafico_defasagem()

                titulos()
            }


        }
    })

    function ordemAlfabetica() {
        dataArray.sort((a, b) => {
            if (a.aluno < b.aluno) {
                return -1
            } else if (a.aluno > b.aluno) {
                return 1
            } else {
                return 0
            }
        })
    }


    function agruparPorAvaliacao() {
        dataArray.map((a, b) => {
            let avaliacao = dataArray[b].avaliacao
            if (!notasPorAvaliacao[avaliacao]) {
                notasPorAvaliacao[avaliacao] = []
            }
            notasPorAvaliacao[avaliacao].push(dataArray[b])
        })

        nomeDasAvaliacoes = Object.keys(notasPorAvaliacao)
        console.log(nomeDasAvaliacoes)
    }


    function acharNotaMedia() {
        dataArray.map((a, b) => {
            let aluno_nome = dataArray[b].aluno
            if (!notaMedia[aluno_nome]) {
                let dadosAluno = dataArray.filter(a => a.aluno === aluno_nome)
                let notaDoAluno = 0
                dadosAluno.map((c, d) => {
                    notaDoAluno += dadosAluno[d].nota
                })
                notaDoAluno /= dadosAluno.length
                let objetoDePush = {
                    aluno: `${aluno_nome}`,
                    nota: `${notaDoAluno}`
                }
                notaMedia[aluno_nome] = []
                notaMedia[aluno_nome].push(objetoDePush)
            }
        })
    }


    function tabsDasAvaliacoes() {
        let HTMLDasTabs = ``
        if (nomeDasAvaliacoes.length !== 1) {
            nomeDasAvaliacoes.map((a, b) => {
                if (b !== 0) {
                    HTMLDasTabs += `
                    <input type="radio" id="radio-${b + 1}" name="tabs">
                    <label class="tab" for="radio-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                }
            })
        }
        $('#grafico_geral').before(`
        <div class="container id="filtro">
	        <div class="tabs">
		        <input type="radio" id="radio-1" name="tabs" checked="">
		        <label class="tab" for="radio-1">${nomeDasAvaliacoes[0]}</label>
                ${HTMLDasTabs}
	        </div>
        </div>`)
        arrumaCSS()
    }

    function arrumaCSS() {
        nomeDasAvaliacoes.map((a, b) => {
            $(`#radio-${b + 1}`)
        })
    }

    function graficoGeral() {
        const ctx = $(`#grafico_geral`);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [dataArray[0].aluno],
                datasets: [{
                    label: '# of Votes',
                    data: [dataArray[0].nota],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function grafico_media() {
        let nomes = []
        let notas = []
        let chaves = Object.keys(notaMedia)
        console.log(notaMedia['Barry Allen'])
        chaves.map((a, b) => {
            console.log(notaMedia[chaves[b]][0].nota)
            nomes.push(notaMedia[chaves[b]][0].aluno)
            notas.push(notaMedia[chaves[b]][0].nota)
        })
        console.log(nomes)
        console.log(notas)
        const ctx = $(`#grafico_media`);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nomes,
                datasets: [{
                    label: 'Nota Média',
                    data: notas,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function grafico_defasagem() {
        const ctx = $(`#grafico_defasagem`);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


    //Arrumando tab
    $('input[name="tabs"]').change(function () {
        console.log('oi')
        var radioId = $(this).attr('id');
        console.log(radioId)
        arrumaCSS(radioId)
    });

    function titulos() {
        $('.container').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico Geral</h3></div>')
        $('#grafico_media').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Média</h3></div>')
        $('#grafico_defasagem').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Defasagem</h3></div>')
    }
})