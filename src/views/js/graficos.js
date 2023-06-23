$(document).ready(() => {
    const url = new URL(window.location.href);
    let dataArray
    let notasPorAvaliacao = {}
    let nomeDasAvaliacoes
    let notaMedia = {}
    let acertosPorAvaliacao = {}
    let avaliacaoAtual = ''
    $.ajax({
        url: `/notas/turma?idTurma=${url.searchParams.get("idTurma")}&idDisciplina=${$('#idDisciplina').val()}`,
        type: 'GET',
        dataType: 'text',
        async: true,
        success: (data) => {
            if (data === '{"message":"nenhuma nota encontrada"}') {

            } else {
                console.log(data.length)
                dataArray = JSON.parse(data);
                console.log(dataArray)
                ordemAlfabetica()
                agruparPorAvaliacao()
                acharNotaMedia()
                console.log(notaMedia)


                $('#geral').before('<canvas id="grafico_geral"></canvas>')
                $('#geral').remove()
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

    function acharAcertosEmCadaAvaliacao() {
        acertosPorAvaliacao = {}
        dataArray.map((a, b) => {
            let aluno_nome = dataArray[b].aluno
            if (!acertosPorAvaliacao[aluno_nome]) {
                let dadosAluno = dataArray.filter(a => a.aluno === aluno_nome)
                let dadosAlunoNaAvaliacao = dadosAluno.filter(a => a.avaliacao === avaliacaoAtual)
                let acertosDoAluno = 0
                let numeroDeQuestoes = 0
                dadosAlunoNaAvaliacao.map((c, d) => {
                    acertosDoAluno += dadosAlunoNaAvaliacao[d].acertos
                    numeroDeQuestoes += dadosAlunoNaAvaliacao[d].total_questoes
                })
                let objetoDePush = {
                    aluno: `${aluno_nome}`,
                    acertos: `${acertosDoAluno}`,
                    total_questoes: `${numeroDeQuestoes}`
                }
                acertosPorAvaliacao[aluno_nome] = []
                acertosPorAvaliacao[aluno_nome].push(objetoDePush)
            }
        })
        console.log(acertosPorAvaliacao)
        arrumaGraficoGeral()
    }


    function tabsDasAvaliacoes() {
        let HTMLDasTabs = ``
        if (nomeDasAvaliacoes.length > 1) {
            nomeDasAvaliacoes.map((a, b) => {
                if (b !== 0) {
                    HTMLDasTabs += `
                    <input type="radio" id="radio-${b + 1}" name="tabs">
                    <label class="tab" for="radio-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                }
            })
        }
        $('#grafico_geral').before(`
        <div class="container id="divDoGraficoGeral">
	        <div class="tabs">
		        <input type="radio" id="radio-1" name="tabs" >
		        <label class="tab" id="clickAoIniciar" for="radio-1">${nomeDasAvaliacoes[0]}</label>
                ${HTMLDasTabs}
	        </div>
        </div>`)
        verificarAvaliacao()
    }

    function arrumaGraficoGeral() {
        if ($('#grafico_geral')) {
            $('#grafico_geral').remove()     
        }
        graficoGeral()
    }

    function graficoGeral() {
        $('#hrGraficoGeral').before('<canvas id="grafico_geral"></canvas>')
        let nomes = []
        let QuantidadeDeAcertos = []
        let maiorNumeroDeQuestoes = 0
        let chaves = Object.keys(acertosPorAvaliacao)
        console.log(acertosPorAvaliacao[chaves[0]][0].aluno)
        chaves.map((a,b) => {
            nomes.push(acertosPorAvaliacao[chaves[b]][0].aluno)
            QuantidadeDeAcertos.push(acertosPorAvaliacao[chaves[b]][0].acertos)
            if(acertosPorAvaliacao[chaves[b]][0].total_questoes > maiorNumeroDeQuestoes) {
                maiorNumeroDeQuestoes = parseInt(acertosPorAvaliacao[chaves[b]][0].total_questoes)
            }

        })
        console.log(maiorNumeroDeQuestoes)
        let ctx = $(`#grafico_geral`);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nomes,
                datasets: [{
                    label: 'N° de Acertos',
                    data: QuantidadeDeAcertos,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: parseInt(maiorNumeroDeQuestoes.toFixed(0))
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


    function verificarAvaliacao() {
        $('.container').on('click', '.tab', function () {
            avaliacaoAtual = $(this).text();
            console.log(avaliacaoAtual)
            acharAcertosEmCadaAvaliacao()
        });
        $('#clickAoIniciar').trigger('click')
    }



    function titulos() {
        $('.container').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico Geral</h3></div>')
        $('#grafico_media').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Média</h3></div>')
        $('#grafico_defasagem').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Defasagem</h3></div>')
    }
})