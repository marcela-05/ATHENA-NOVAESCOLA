$(document).ready(() => {
    const url = new URL(window.location.href);
    let dataArray
    let notasPorAvaliacao = {}
    let nomeDasAvaliacoes
    let notaMedia = {}
    let acertosPorAvaliacao = {}
    let areasPorAvaliacao = {}
    let acertosPorArea = {}
    let avaliacaoAtual = ''
    let areaAvaliacaoAtual = ''
    let areaAtual = ''
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

                $('#hrGraficoMedia').before('<canvas id="grafico_media"></canvas>')
                $('#media').remove()
                grafico_media()

                $('#hrGraficoAvaliacao').before('<canvas id="grafico_avaliacao"></canvas>')
                $('#avaliacao').remove()
                tabsDasAvaliacoes()

                $('#hrGraficoArea').before('<canvas id="grafico_area"></canvas>')
                $('#area').remove()
                tabsDasAreasAvaliacoes()

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

    function acharAreasDeCadaAvaliacao() {
        areasPorAvaliacao = {}
        let dadosAvaliacao = dataArray.filter(a => a.avaliacao === areaAvaliacaoAtual)
        dadosAvaliacao.map((a, b) => {
            let area_nome = dadosAvaliacao[b].area
            if (!areasPorAvaliacao[area_nome]) {
                areasPorAvaliacao[area_nome] = []
            }
        })
        areasPorAvaliacao = Object.keys(areasPorAvaliacao)
        console.log(areasPorAvaliacao)
        tabsDasAreas()
    }

    function acharAcertosEmCadaArea() {
        acertosPorArea = {}
        let dadosArea = dataArray.filter(a => a.area === areaAtual)
        console.log(dadosArea)
        dadosArea.map((a, b) => {
            let aluno_nome = dadosArea[b].aluno
            if (!acertosPorArea[aluno_nome]) {
                let dadosAluno = dadosArea.filter(a => a.aluno === aluno_nome)
                console.log(dadosAluno[0])
                let objetoDePush = {
                    aluno: `${aluno_nome}`,
                    acertos: `${dadosAluno[0].acertos}`,
                    total_questoes: `${dadosAluno[0].total_questoes}`
                }
                acertosPorArea[aluno_nome] = []
                acertosPorArea[aluno_nome].push(objetoDePush)
            }
        })
        console.log(acertosPorArea)
        arrumaGraficoArea()
    }


    function tabsDasAvaliacoes() {
        let HTMLDasTabs = ``
        if (nomeDasAvaliacoes.length > 1) {
            nomeDasAvaliacoes.map((a, b) => {
                if (b !== 0) {
                    if (nomeDasAvaliacoes[b] != nomeDasAvaliacoes[nomeDasAvaliacoes.length - 1]) {
                        HTMLDasTabs += `
                        <input type="radio" id="radioAvaliacoes-${b + 1}" name="tabsAvaliacao">
                        <label class="tab" for="radioAvaliacoes-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                    } else {
                        HTMLDasTabs += `
                        <input type="radio" id="radioAvaliacoes-${b + 1}" name="tabsAvaliacao">
                        <label class="tab" style="padding-right: 0.2em" for="radioAvaliacoes-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                    }
                }
            })
        }
        $('#hrGraficoMedia').after(`
        <div class="containerAvaliacao id="divDoGraficoGeral">
	        <div class="tabsAvaliacao">
		        <input type="radio" id="radioAvaliacoes-1" name="tabsAvaliacao" >
		        <label class="tab" id="clickAoIniciarAvaliacao" for="radioAvaliacoes-1">${nomeDasAvaliacoes[0]}</label>
                ${HTMLDasTabs}
	        </div>
        </div>`)
        verificarAvaliacao()
    }

    function tabsDasAreasAvaliacoes() {
        let HTMLDasTabs = ``
        if (nomeDasAvaliacoes.length > 1) {
            nomeDasAvaliacoes.map((a, b) => {
                if (b !== 0) {
                    if (nomeDasAvaliacoes[b] != nomeDasAvaliacoes[nomeDasAvaliacoes.length - 1]) {
                        HTMLDasTabs += `
                        <input type="radio" id="radioAreaAvaliacoes-${b + 1}" name="tabsAreaAvaliacao">
                        <label class="tab" for="radioAreaAvaliacoes-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                    } else {
                        HTMLDasTabs += `
                        <input type="radio" id="radioAreaAvaliacoes-${b + 1}" name="tabsAreaAvaliacao">
                        <label class="tab" style="padding-right: 0.2em" for="radioAreaAvaliacoes-${b + 1}">${nomeDasAvaliacoes[b]}</label>`
                    }
                }
            })
        }
        $('#hrGraficoAvaliacao').after(`
        <div class="containerAreaAvaliacao id="divDoGraficoGeral">
	        <div class="tabsAreaAvaliacao">
		        <input type="radio" id="radioAreaAvaliacoes-1" name="tabsAreaAvaliacao" >
		        <label class="tab" id="clickAoIniciarAreaAvaliacao" for="radioAreaAvaliacoes-1">${nomeDasAvaliacoes[0]}</label>
                ${HTMLDasTabs}
	        </div>
        </div>`)
        verificarAreaAvaliacao()
    }

    function tabsDasAreas() {
        let HTMLDasTabs = ``
        if (areasPorAvaliacao.length > 1) {
            areasPorAvaliacao.map((a, b) => {
                if (b !== 0) {
                    if (areasPorAvaliacao[b] != areasPorAvaliacao[areasPorAvaliacao.length - 1]) {
                        HTMLDasTabs += `
                        <input type="radio" id="radioArea-${b + 1}" name="tabsArea">
                        <label class="tab" for="radioArea-${b + 1}">${areasPorAvaliacao[b]}</label>`
                    } else {
                        HTMLDasTabs += `
                        <input type="radio" id="radioArea-${b + 1}" name="tabsArea">
                        <label class="tab" style="padding-right: 0.2em" for="radioArea-${b + 1}">${areasPorAvaliacao[b]}</label>`
                    }
                }
            })
        }
        $('.containerAreaAvaliacao').after(`
        <div class="containerArea id="divDoGraficoGeral">
	        <div class="tabsArea">
		        <input type="radio" id="radioArea-1" name="tabsArea" >
		        <label class="tab" id="clickAoIniciarArea" for="radioArea-1">${areasPorAvaliacao[0]}</label>
                ${HTMLDasTabs}
	        </div>
        </div>`)
        verificarArea()
    }

    function arrumaGraficoGeral() {
        if ($('#grafico_avaliacao')) {
            $('#grafico_avaliacao').remove()
            $('#defasagem_avaliacao').remove()
        }
        grafico_avaliacao()
    }

    function arrumaGraficoArea() {
        if ($('#grafico_area')) {
            $('#grafico_area').remove()
            $('#defasagem_area').remove()
        }
        grafico_area()
    }

    function grafico_avaliacao() {
        $('#hrGraficoAvaliacao').before('<canvas id="grafico_avaliacao"></canvas>')
        let nomes = []
        let QuantidadeDeAcertos = []
        let maiorNumeroDeQuestoes = 0
        let chaves = Object.keys(acertosPorAvaliacao)
        console.log(acertosPorAvaliacao[chaves[0]][0].aluno)
        chaves.map((a, b) => {
            nomes.push(acertosPorAvaliacao[chaves[b]][0].aluno)
            QuantidadeDeAcertos.push(acertosPorAvaliacao[chaves[b]][0].acertos)
            if (acertosPorAvaliacao[chaves[b]][0].total_questoes > maiorNumeroDeQuestoes) {
                maiorNumeroDeQuestoes = parseInt(acertosPorAvaliacao[chaves[b]][0].total_questoes)
            }

        })
        console.log(maiorNumeroDeQuestoes)
        let ctx = $(`#grafico_avaliacao`);

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
        $('#grafico_avaliacao').after(`<h3 class="grafico" id="defasagem_avaliacao">Defasagem = ${calculoDaDefasagem(QuantidadeDeAcertos)}</h3>`)
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
        $('#grafico_media').after(`<h3 class="grafico">Defasagem = ${calculoDaDefasagem(notas)}</h3>`)
    }

    function grafico_area() {
        $('#hrGraficoArea').before('<canvas id="grafico_area"></canvas>')
        let nomes = []
        let QuantidadeDeAcertos = []
        let NumeroDeQuestoes = 0
        let chaves = Object.keys(acertosPorArea)
        console.log(acertosPorArea[chaves[0]][0].aluno)
        chaves.map((a, b) => {
            nomes.push(acertosPorArea[chaves[b]][0].aluno)
            QuantidadeDeAcertos.push(acertosPorArea[chaves[b]][0].acertos)
            if (acertosPorArea[chaves[b]][0].total_questoes > NumeroDeQuestoes) {
                NumeroDeQuestoes = parseInt(acertosPorArea[chaves[b]][0].total_questoes)
            }

        })
        const ctx = $(`#grafico_area`);

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
                        max: parseInt(NumeroDeQuestoes.toFixed(0))
                    }
                }
            }
        });

        $('#grafico_area').after(`<h3 class="grafico" id="defasagem_area">Defasagem = ${calculoDaDefasagem(QuantidadeDeAcertos)}</h3>`)
    }


    function verificarAvaliacao() {
        $('.containerAvaliacao').on('click', '.tab', function () {
            avaliacaoAtual = $(this).text();
            console.log(avaliacaoAtual)
            acharAcertosEmCadaAvaliacao()
        });
        $('#clickAoIniciarAvaliacao').trigger('click')
    }

    function verificarAreaAvaliacao() {
        $('.containerAreaAvaliacao').on('click', '.tab', function () {
            if($('.containerArea')){
                $('.containerArea').remove()
            }
            areaAvaliacaoAtual = $(this).text();
            console.log(areaAvaliacaoAtual)
            acharAreasDeCadaAvaliacao()
        });
        $('#clickAoIniciarAreaAvaliacao').trigger('click')
    }

    function verificarArea() {
        $('.containerArea').on('click', '.tab', function () {
            areaAtual = $(this).text();
            console.log(areaAtual)
            acharAcertosEmCadaArea()
        });
        $('#clickAoIniciarArea').trigger('click')
    }

    function calculoDaDefasagem(notas = []) {
        let parteDeCimaDaFuncao = notas.length * 10
        let parteDeBaixoDaFuncao = 0
        notas.map((a,b) => {
            parteDeBaixoDaFuncao += Math.sqrt(notas[b])
        })
        return (parteDeCimaDaFuncao/parteDeBaixoDaFuncao).toFixed(2)
    }


    function titulos() {
        $('#hrGraficoMedia').after('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico Por Avaliação</h3></div>')
        $('#grafico_media').before('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Média</h3></div>')
        $('#hrGraficoAvaliacao').after('<div class="div_titulo_grafico"><h3 class="titulo_grafico">Gráfico da Área por Avaliação</h3></div>')
    }
})