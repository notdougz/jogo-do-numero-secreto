// Lista para armazenar os números já sorteados, evitando repetições
let listaDeNumerosSorteados = [];

// Define o limite máximo para o número secreto
let numeroLimite = 10;

// Variável que armazena o número secreto gerado pela função gerarNumeroAleatorio()
let numeroSecreto = gerarNumeroAleatorio();

// Variável que conta o número de tentativas do usuário
let tentativas = 1;

// Função que exibe um texto na tela, recebe a tag HTML e o texto que será exibido
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com base na tag passada como parâmetro
    let campo = document.querySelector(tag);
    // Altera o conteúdo do elemento selecionado para o texto passado como parâmetro
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

// Função que exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
}

// Exibe a mensagem inicial ao carregar o jogo
exibirMensagemInicial();

// Função que verifica o chute do usuário
function verificarChute() {
    // Pega o valor digitado pelo usuário no campo de input
    let chute = document.querySelector('input').value;

    // Verifica se o chute do usuário é igual ao número secreto
    if (chute == numeroSecreto) {
        // Se o usuário acertar, exibe uma mensagem de acerto
        exibirTextoNaTela('h1', 'Acertou!');

        // Verifica se a palavra "tentativa" deve estar no singular ou plural
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

        // Cria a mensagem com o número de tentativas que o usuário levou para acertar
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        // Exibe a mensagem de tentativas na tela
        exibirTextoNaTela('p', mensagemTentativas);

        // Habilita o botão de reiniciar o jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o usuário errar, verifica se o chute foi maior ou menor que o número secreto
        if (chute > numeroSecreto) {
            // Se o chute for maior, informa que o número secreto é menor
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            // Se o chute for menor, informa que o número secreto é maior
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        // Incrementa o número de tentativas
        tentativas++;
        // Limpa o campo de input para o próximo chute
        limparCampo();
    }
}

// Função que gera um número aleatório entre 1 e 10, evitando repetições
function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Verifica quantos números já foram sorteados
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se todos os números possíveis já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número já foi sorteado anteriormente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se o número já foi sorteado, chama a função novamente para gerar outro número
        return gerarNumeroAleatorio();
    } else {
        // Se o número não foi sorteado, adiciona-o à lista de números sorteados
        listaDeNumerosSorteados.push(numeroEscolhido);
        // Exibe a lista de números sorteados no console (para fins de depuração)
        console.log(listaDeNumerosSorteados);
        // Retorna o número escolhido
        return numeroEscolhido;
    }
}

// Função que limpa o campo de input
function limparCampo() {
    // Seleciona o campo de input
    chute = document.querySelector('input');
    // Limpa o valor do campo de input
    chute.value = '';
}

// Função que reinicia o jogo
function reiniciarJogo() {
    // Gera um novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    // Limpa o campo de input
    limparCampo();
    // Reseta o número de tentativas
    tentativas = 1;
    // Exibe a mensagem inicial novamente
    exibirMensagemInicial();
    // Desabilita o botão de reiniciar o jogo
    document.getElementById('reiniciar').setAttribute('disabled', true);
}