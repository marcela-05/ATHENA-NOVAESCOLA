const HITS = 10 // Número de hits a retornar
var planosRecomendados = [] // Array que armazena os planos de aula


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
    url = '/notas/turma?idTurma=' + url.searchParams.get("idTurma");

    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let notas = []
            let retorno = data;
            retorno.map(function(dado) {
                notaAssunto = {}
                notaAssunto.assunto = dado.area
                notaAssunto.nota = dado.nota
                notas.push(notaAssunto)
            });
            return notas
        })
        .then((notas) => {
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
                if(element.nota < 11){
                    // se for menor que 7, chama a função que vai sugerir conteúdos
                    getContents(element.assunto, 100, serie).then((contents) => {
                        // Para cada elemento do array contents, imprime o título e a URL
                        contents.forEach(element => {
                            planosRecomendados.push(element)
                        });
                    });
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function inserePlanosNaPagina() {
    // código para inserir planos na página
}

verificaNecessidadeDoAssunto()
