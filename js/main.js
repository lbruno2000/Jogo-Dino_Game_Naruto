//selecionar o dino
const dino = document.querySelector('.dino');
const fundo = document.querySelector('.fundo');
let isJumping = false;
let position = 0;

var musica_fundo=document.getElementById("musica_fundo");
var musica=document.getElementById("musica");

//função de pressionar o espaço
function handleKeyUp(event){    
    if (event.keyCode === 32 || event.keyCode == 38) {
        
        //Música em loop
        musica_fundo.addEventListener("ended", function(){ musica_fundo.currentTime = 0; musica_fundo.play(); }, false);
        musica_fundo.play();
        
        if (!isJumping) {
            jump();
        }
    }
}

//função para pular com o dinossauro
function jump(){

    musica.play();
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else{
                    position = position - 20;
                    dino.style.bottom = position + 'px';
                }
            //velocidade que vai descer
            }, 20);

        } else{
            //subindo
            position = position + 20;
            dino.style.bottom = position + 'px';
        }

    //velocidade que vai subir
    }, 20);
}

function criarCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    
    //math serve para operações em matemática como arredondamentos
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    fundo.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            fundo.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            musica_fundo.pause();
            clearInterval(leftInterval);
            paracontagem();
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo<br>Sua Pontuação foi de: ' + segundos + ' Pontos</h1>';
        } else{
            //velocidade que vai se mover para esquerda
            cactusPosition = cactusPosition - 10;
            
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(criarCactus, randomTime);

}


var segundos = 0; //inicio do cronometro
function conta() {
    segundos++;
    document.getElementById("pontos").innerHTML = "Pontuação: " + segundos;
}
    
function inicia(){
    interval = setInterval("conta();",1000);
}

function paracontagem(){
    clearInterval(interval);
}

inicia();
criarCactus();

document.addEventListener('keyup', handleKeyUp);