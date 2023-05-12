function mediaAritmetica(...n){
    let somaDasNotas
    for(i = 0;i < n.length;i++){
        somaDasNotas = n[i].notas.reduce(function (valorAcumulado, valorAtual){
            return valorAcumulado += valorAtual
        }, 1)
    }
    return somaDasNotas / n.length
}


//O Array "n" deve ser passado sendo o array da turma e se nescessário mudar o ".notas"
//para o equivalente da chave pertencete a notas

arrayTeste = [{notas: 100}, {notas: 200}, {notas: 30}]

mediaAritmetica(arrayTeste)