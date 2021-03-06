window.addEventListener('load', main, false);

function randint(end) {
    return Math.floor(Math.random() * (end + 1));
}

function preloadImages() {
    let images = [];
    for(let i = 0; i <= 12; i++) {
        images[i] = new Image();
        images[i].src = `./assets/notas/${i}.png`;
    }
}

async function main() {

    // VariΓ‘veis
    let numeroAleatorio = randint(12);
    let rodada = 1;
    let acertos = 0;
    let erros = 0;
    let acertou = true;
    
    const buttonsIds = [
        '#btn_do', 
        '#btn_re', 
        '#btn_mi', 
        '#btn_fa', 
        '#btn_sol', 
        '#btn_la', 
        '#btn_si'
    ];
        
    const notas = {
        12: 'la',
        11: 'sol',
        10: 'fa',
        9: 'mi',
        8: 're',
        7: 'do',
        6: 'si',
        5: 'la',
        4: 'sol',
        3: 'fa',
        2: 'mi',
        1: 're',
        0: 'do',
    };

    const personagemErros = [
        'π§', 'π', 'π', 'π', 'π«', 'π­'
    ];

    const personagemAcertos = [
        'π', 'π', 'π', 'π', 'π', 'π', 'π₯³', 'π', 'π€©', 'π', 'π', 'π', 'π', 'π', 'π', 'πππΊ'
    ];

    let personagemAcertosPos = 0;
    let personagemErrosPos = 0;

    // binds
    const pentagrama = document.querySelector('#pentagrama');
    const textRodada = document.querySelector('#text_rodada');
    const textAcertos = document.querySelector('#text_acertos');
    const textErros = document.querySelector('#text_erros');
    const textPersonagem = document.querySelector('#text_personagem');
    const buttonRecomecar = document.querySelector('#button_recomecar');
    const buttons = buttonsIds.map((btnId) => {
        return document.querySelector(btnId);
    });

    // Pre carregar imagens
    preloadImages();

    // Carregar nota aleatΓ³ria
    const imgNota = document.createElement('img');
    imgNota.src = `./assets/notas/${numeroAleatorio}.png`;
    pentagrama.append(imgNota);

    function mudarPersonagem(tipo) {

        if (tipo == 'acerto'){
            if (personagemAcertosPos < personagemAcertos.length){
                textPersonagem.innerHTML = personagemAcertos[personagemAcertosPos];
                personagemErrosPos = 0;
                personagemAcertosPos += 1;
            }
        } else {
            if (personagemErrosPos < personagemErros.length){
                textPersonagem.innerHTML = personagemErros[personagemErrosPos];
                personagemAcertosPos = 0;
                personagemErrosPos += 1;
            }
        }

        
    }

    // BotΓ£o recomeΓ§ar
    buttonRecomecar.addEventListener('click', () => {
        document.location.reload();
    });

    // LΓ³gica
    buttonsIds.forEach(btnId =>{
        const btn = document.querySelector(btnId);
        btn.addEventListener('click', (e) => {

            const nota = e.target.id.slice(4);
            if (nota == notas[numeroAleatorio]) {

                // Mudar Personagem
                mudarPersonagem('acerto');

                // Desabilita o botΓ£o
                e.target.disabled = true;

                // Muda a cor do botΓ£o para verde
                e.target.className = 'app__button app__button-right';

                if(acertou){
                    // Contabilizar acertos
                    acertos += 1;
                    textAcertos.innerHTML = acertos;
                } else {
                    // Contabilizar Erros
                    erros += 1;
                    textErros.innerHTML = erros;
                }

                // Aguarda alguns segundos antes da prΓ³xima rodada
                setTimeout(()=> {

                    acertou = true;

                    // Incrementa
                    rodada += 1;
                    textRodada.innerHTML = rodada;

                    // Reseta ClassName dos botΓ΅es
                    buttons.forEach(btn => {
                        btn.className = 'app__button';
                    });

                    // Evita nΓΊmeros repetidos
                    let novoNumeroAleatorio = randint(12);
                    while(numeroAleatorio == novoNumeroAleatorio){
                        novoNumeroAleatorio = randint(12);
                    }
                    numeroAleatorio = novoNumeroAleatorio;

                    imgNota.src = `./assets/notas/${numeroAleatorio}.png`;

                    // Libera o botΓ£o
                    e.target.disabled = false;

                }, 1000);
                
            } else {
                // Muda a cor do botΓ£o para vermelho
                e.target.className = 'app__button app__button-error';

                acertou = false;

                mudarPersonagem('erro');
            }
            
        });
    });
    
}
