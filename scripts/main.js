const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let score = 0;                        // for later use
let gameFrame = 0;
ctx.font = '50px Georgia';


// game sounds
// const bulletHit1 = document.createElement('audio');
// bulletHit1.src = 'sounds/8bit_bomb_explosion.wav';

// const bulletHit2 = document.createElement('audio');
// bulletHit2.src = '';

// const planeDeath = document.createElement('audio');
// planeDeath.src = '';

// const themeMusic = new Audio('sounds/backgroundMusic.mp3');
// themeMusic.play(); 
//could be issues with permissions or network connectivity
//that are preventing the file from being loaded - chatGPT
// i should test if the sound work when triggerred and not by default in the background 


//pause & continue sounds
let pauseSound = new Audio('sounds/Continue.wav');
let continueSound = new Audio('sounds/Pause.wav');

let p = false;
const keydown = (e) => {
    if (e.key === "p" && p === false) {
        HTMLAudioElement.play(pauseSound);
        p = !p
    } else if(e.key === "p" && p === true) {
        HTMLAudioElement.play(continueSound);
        p = !p
        console.log(p);
    }
}

//   +   background map