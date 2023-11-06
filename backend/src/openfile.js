const fs = require('fs');

fs.readFile('battlefy-player-info-export.csv', 'utf8', (error, csv) => {
    if(error) {
        console.log('Erro ao ler o arquivo!');
        return;
    }

    const jsonRetorno = [];

    const dados = csv.split('\n');

    // tratar chaves do json
    const chaves = dados.shift().split(',');
    
    // não usei "for(const chave of chaves)" porque quero
    // alterar os elementos do array
    for(let i = 0; i < chaves.length; i++) {
        chaves[i] = chaves[i].replaceAll('"', '');
        if(chaves[i].includes('ID Discord')) chaves[i] = 'discordID';
        if(chaves[i].includes('Email')) chaves[i] = 'email';
    }


    for(let linha of dados) {
        linha = linha.split(',');
        const obj = {};
        
        // iterar em cada coluna de dados
        for(let i = 0; i < linha.length; i++) {
            linha[i] = linha[i].replaceAll('"', '');
            obj[chaves[i]] = linha[i];
        }
        jsonRetorno.push(obj);
    }

    console.log(jsonRetorno);
});

