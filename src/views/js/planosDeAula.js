$(document).ready(function(){

    async function getContents(subject, hits, serie) {
        // fetch na URL de busca do Algolia com query params
        const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`, {
            method: 'GET',
            headers: {
                // Headers necessários para autenticação no Algolia
                'X-Algolia-Application-Id': '6I7NDWQ9YU',
                'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
            }                                                                                                                                                                                                                               
        });
        // Transforma a resposta em JSON
        const json = await response.json();
        // seleciona somente conteúdos que sejam planos de aula
        let planos = []
        for(let i = 0; i < json.hits.length; i++){
            if(json.hits[i].chapeu == 'Plano de Aula' && serie == json.hits[i].anoPlanoAula[0]){
                await planos.push(json.hits[i])
            }
        }
        return planos
    }

    async function verificaNecessidadeDoAssunto() {
        // lê a url atual e pega a série
        var url = new URL(window.location.href);
        var serie = document.getElementById('serie').value;
        var idDisciplina = $('#idDisciplina').val();
        url = '/notas/turma?idTurma=' + url.searchParams.get("idTurma") + '&idDisciplina=' + idDisciplina;
        var planosRecomendados = [] // Array que armazena os planos de aula

        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let notas = []
                let retorno = data;
                if(retorno.length == 0){
                    return retorno
                } else{
                    retorno.map(function(dado) {
                        notaAssunto = {}
                        notaAssunto.assunto = dado.area
                        notaAssunto.nota = dado.nota
                        notas.push(notaAssunto)
                    });
                    return notas
                }
            })
            .then((notas) => {
                if(notas.length == 0){
                    // se não tiver notas, apaga a classe titulo
                    $("#titulo").remove()
                    $("#planos").remove()
                    return
                }
                let medias = []
                let assuntos = []
                // separa cada assunto
                notas.forEach(element => {
                    if(!assuntos.includes(element.assunto)){
                        assuntos.push(element.assunto)
                    }
                })

                // soma as notas de cada assunto
                assuntos.forEach(assunto => {
                    let soma = 0
                    let contador = 0
                    notas.forEach(element => {
                        if(element.assunto == assunto){
                            soma += element.nota
                            contador++
                        }
                    })
                    medias.push({assunto: assunto, nota: soma / contador})
                })

                // para cada assunto, verifica se a média é menor que 7
                medias.forEach(element => {
                    if(element.nota < 7){
                        // se for menor que 7, chama a função que vai sugerir conteúdos, com await para esperar a resposta
                        getContents(element.assunto, 50, serie).then((planos) => {
                            // itera pelos planos de aula e adiciona no array de planos de aula
                            planos.forEach(plano => {
                                planosRecomendados.push(plano)
                                console.log(plano)
                                if(planosRecomendados.length > 0 && planosRecomendados.length < 4){
                                    $("#planos").append(
                                        `<section class="plano">
                                            <div class="plano_cards">
                                            <article class="card_plano" title='${plano.titulo}'>
                                                <p class="card_plano_tag">${plano.tema[0]}</p>
                                                <a href="${plano.url}">
                                                    <figure class="card_plano_img">
                                                        <div class="card_plano_bg"></div>
                                                        <img src="https://nova-escola-producao.s3.amazonaws.com/YVwdYKeDYC8fSVGKX9fs8mzac8aRM67TaX5aqdj8bM4p4jd4Zd82KtnJ2saD/professora-sala-aula.jpg" alt="" class="card_img">
                                                    </figure>
                                                    <div class="card_plano_info">
                                                        <h3 class="card_txt">${plano.titulo}</h3>
                                                    </div>
                                                </a>
                                            </article>
                                        </div>
                                        </section>`
                                    )
                                }
                            })
                        })
                    }
                    else{
                        // se não for menor que 7, apaga a classe titulo
                        $("#titulo").remove()
                        $("#planos").remove()
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    verificaNecessidadeDoAssunto()
});