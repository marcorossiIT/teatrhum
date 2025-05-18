import { KeypressedManager } from "./KeypressedManager.js";
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./serviceworker.js");
} else {
    console.warn('browser non compatibile con i service worker')
}



let suoni = {
    suon1: {
        howl: new Howl({
            src: ['audios/doorbell2-6450.mp3'],
            html5: true,
            onplay: function () {
                suoni.suon1.playing = true;
                iconaStop('suon1')

            },
            onstop: function () {
                suoni.suon1.playing = false;
                iconaPlay('suon1')

            },
            onend: function () {
                suoni.suon1.playing = false;
                iconaPlay('suon1')

            },
        }),
        playing: false,
        nomeVisualizzato: "Doorbell"
    },
    suon2: {
        howl: new Howl({
            src: ['audios/toilet-flush-02-45833.mp3'],
            html5: true,
            onplay: function () {
                suoni.suon2.playing = true;
                iconaStop('suon2')

            },
            onstop: function () {
                suoni.suon2.playing = false;
                iconaPlay('suon2')

            },
            onend: function () {
                suoni.suon2.playing = false;
                iconaPlay('suon2')

            },
        }),
        playing: false,
        nomeVisualizzato: "Bagno"

    }, 
    suon3: {
        howl: new Howl({
            src: ['audios/boing-flexatone-wobble-310482.mp3'],
            html5: true,
            onplay: function () {
                suoni.suon3.playing = true;
                iconaStop('suon3')

            },
            onstop: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
            onend: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
        }),
        playing: false,
        nomeVisualizzato: "Boing"

    },
    suon4: {
        howl: new Howl({
            src: ['audios/sound-design-elements-sfx-ps-022-302865.mp3'],
            html5: true,
            onplay: function () {
                suoni.suon3.playing = true;
                iconaStop('suon3')

            },
            onstop: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
            onend: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
        }),
        playing: false,
        nomeVisualizzato: "Scboom"

    },
    suon5: {
        howl: new Howl({
            src: ['audios/transition-base-121422.mp3'],
            html5: true,
            onplay: function () {
                suoni.suon3.playing = true;
                iconaStop('suon3')

            },
            onstop: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
            onend: function () {
                suoni.suon3.playing = false;
                iconaPlay('suon3')

            },
        }),
        playing: false,
        nomeVisualizzato: "transizione boom"

    },
// ## <<---- here per aggiungere un NUOVO SUONO


    uno: {
        howl: new Howl({
            src: ['audios/Acid Trumpet by Kevin MacLeod.mp3'],
            html5: true,
            onplay: function () {
                suoni.uno.playing = true;
                iconaStop('uno')

            },
            onstop: function () {
                suoni.uno.playing = false;
                iconaPlay('uno')

            },
            onend: function () {
                suoni.uno.playing = false;
                iconaPlay('uno')

            },
        }),
        playing: false,
        nomeVisualizzato: "Acid Trumpet"

    },
    due: {
        howl: new Howl({
            src: ['audios/bop-things-by-Nesrality-from-Pixabay.mp3'],
            html5: true,
            onplay: function () {
                suoni.due.playing = true;
                iconaStop('due')

            },
            onstop: function () {
                suoni.due.playing = false;
                iconaPlay('due')

            },
            onend: function () {
                suoni.due.playing = false;
                iconaPlay('due')

            },
        }),
        playing: false
    },
    tre: {
        howl: new Howl({
            src: ['audios/snowflakes-by-JuliusH-from-Pixabay.mp3'],
            html5: true,
            onplay: function () {
                suoni.tre.playing = true;
                iconaStop('tre')

            },
            onstop: function () {
                suoni.tre.playing = false;
                iconaPlay('tre')

            },
            onend: function () {
                suoni.tre.playing = false;
                iconaPlay('tre')

            },
        }),
        playing: false
    },
    quattro: {
        howl: new Howl({
            src: ['audios/Twin-Musicom-64-Sundays.mp3'],
            html5: true,
            onplay: function () {
                suoni.quattro.playing = true;
                iconaStop('quattro')

            },
            onstop: function () {
                suoni.quattro.playing = false;
                iconaPlay('quattro')

            },
            onend: function () {
                suoni.quattro.playing = false;
                iconaPlay('quattro')

            },
        }),
        playing: false
    },
    cinque: {
        howl: new Howl({
            src: ['audios/Bluedidjks_-_BlueDid_-_didier.merlateau.mp3'],
            html5: true,
            onplay: function () {
                suoni.cinque.playing = true;
                iconaStop('cinque')

            },
            onstop: function () {
                suoni.cinque.playing = false;
                iconaPlay('cinque')

            },
            onend: function () {
                suoni.cinque.playing = false;
                iconaPlay('cinque')

            },
        }),
        playing: false
    }
// ## <<---- here per aggiungere un NUOVO SUONO


}



let isFadeinRumori = false;
let isFadeoutRumori = false;
let isFadeinCanzoni = false;
let isFadeoutCanzoni = false;

muteall();

/* ----------- */

function muteall() {
    setRumoriVolume(0);
    setCanzoniVolume(0);

}

function stopall() {
    isFadeinCanzoni = false
    isFadeoutCanzoni = false
    isFadeinRumori = false
    isFadeoutRumori = false

    for (const key in suoni) {
        if (Object.hasOwnProperty.call(suoni, key)) {
            const suono = suoni[key];
            suono.howl.stop();

        }
    }

}

/* ----------- */

function toggleAudioPlay(suono) {


    if (suoni[suono].playing) {
        suoni[suono].howl.stop();
    } else {
        suoni[suono].howl.play();
    }

}


function setRumoriVolume(volume) {

    isFadeinRumori = false;
    isFadeoutRumori = false;

    document.getElementById('labelVolumeRumori').innerText = Math.round(volume * 100);
    document.getElementById('volumeRumori').value = volume * 100;


    suoni.suon1.howl.volume(volume)
    suoni.suon2.howl.volume(volume)
    suoni.suon3.howl.volume(volume)
    suoni.suon4.howl.volume(volume)
    suoni.suon5.howl.volume(volume)
// ## <<---- here per aggiungere un NUOVO SUONO


}

function setCanzoniVolume(volume) {

    isFadeinCanzoni = false;
    isFadeoutCanzoni = false;


    document.getElementById('labelVolumeCanzoni').innerText = Math.round(volume * 100);
    document.getElementById('volumeCanzoni').value = volume * 100;


    suoni.uno.howl.volume(volume)
    suoni.due.howl.volume(volume)
    suoni.tre.howl.volume(volume)
    suoni.quattro.howl.volume(volume)
    suoni.cinque.howl.volume(volume)
}

/* ----------- */

function toggleFadeinRumori() {
    isFadeoutRumori = false
    if (isFadeinRumori) {
        isFadeinRumori = false;
    } else {
        isFadeinRumori = true;
        fadeinRumori();
    }
}

function fadeinRumori() {
    fadeInRumori_step();
}

function fadeInRumori_step() {
    let volumeRanger = document.getElementById('volumeRumori')
    let volumelabel = document.getElementById('labelVolumeRumori')
    let nuovoVolume = (Number(volumeRanger.value) + 1) / 100;

    if (nuovoVolume > 1 || !isFadeinRumori) {
        isFadeinRumori = false;

        return;
    }
    suoni.suon1.howl.volume(nuovoVolume)
    suoni.suon2.howl.volume(nuovoVolume)
    suoni.suon3.howl.volume(nuovoVolume)
    suoni.suon4.howl.volume(nuovoVolume)
    suoni.suon5.howl.volume(nuovoVolume)
// ## <<---- here per aggiungere un NUOVO SUONO

    volumeRanger.value = nuovoVolume * 100;
    setLabelInnerText(volumelabel, nuovoVolume * 100)

    setTimeout(fadeInRumori_step, 100);

}


function toggleFadeoutRumori() {
    isFadeinRumori = false;
    if (isFadeoutRumori) {
        isFadeoutRumori = false;
    } else {
        isFadeoutRumori = true;
        fadeoutRumori();
    }
}

function fadeoutRumori() {
    fadeOutRumori_step();
}

function fadeOutRumori_step() {
    let volumeRanger = document.getElementById('volumeRumori')
    let volumelabel = document.getElementById('labelVolumeRumori')
    let nuovoVolume = (Number(volumeRanger.value) - 1) / 100;

    if (nuovoVolume < 0 || !isFadeoutRumori) {
        isFadeoutRumori = false;

        return;
    }

    suoni.suon1.howl.volume(nuovoVolume)
    suoni.suon2.howl.volume(nuovoVolume)
    suoni.suon3.howl.volume(nuovoVolume)
    suoni.suon4.howl.volume(nuovoVolume)
    suoni.suon5.howl.volume(nuovoVolume)
// ## <<---- here per aggiungere un NUOVO SUONO

    volumeRanger.value = nuovoVolume * 100;
    setLabelInnerText(volumelabel, nuovoVolume * 100)

    setTimeout(fadeOutRumori_step, 100);

}


/* ----------- */

function toggleFadeinCanzoni() {
    isFadeoutCanzoni = false
    if (isFadeinCanzoni) {
        isFadeinCanzoni = false;
    } else {
        isFadeinCanzoni = true;
        fadeinCanzoni();
    }
}

function fadeinCanzoni() {
    fadeInCanzoni_step();
}

function fadeInCanzoni_step() {
    let volumeRanger = document.getElementById('volumeCanzoni')
    let volumelabel = document.getElementById('labelVolumeCanzoni')
    let nuovoVolume = (Number(volumeRanger.value) + 1) / 100;

    if (nuovoVolume > 1 || !isFadeinCanzoni) {
        isFadeinCanzoni = false;

        return;
    }
    suoni.uno.howl.volume(nuovoVolume)
    suoni.due.howl.volume(nuovoVolume)
    suoni.tre.howl.volume(nuovoVolume)
    suoni.quattro.howl.volume(nuovoVolume)
    suoni.cinque.howl.volume(nuovoVolume)
    volumeRanger.value = nuovoVolume * 100;
    setLabelInnerText(volumelabel, nuovoVolume * 100)

    setTimeout(fadeInCanzoni_step, 100);

}


function toggleFadeoutCanzoni() {
    isFadeinCanzoni = false;
    if (isFadeoutCanzoni) {
        isFadeoutCanzoni = false;
    } else {
        isFadeoutCanzoni = true;
        fadeoutCanzoni();
    }
}

function fadeoutCanzoni() {
    fadeOutCanzoni_step();
}

function fadeOutCanzoni_step() {
    let volumeRanger = document.getElementById('volumeCanzoni')
    let volumelabel = document.getElementById('labelVolumeCanzoni')
    let nuovoVolume = (Number(volumeRanger.value) - 1) / 100;

    /*
    nuovovolume: y
    volume.value: x
    y = easeinOut(x)
    */

    if (nuovoVolume < 0 || !isFadeoutCanzoni) {
        isFadeoutCanzoni = false;

        return;
    }

    suoni.uno.howl.volume(nuovoVolume)
    suoni.due.howl.volume(nuovoVolume)
    suoni.tre.howl.volume(nuovoVolume)
    suoni.quattro.howl.volume(nuovoVolume)
    suoni.cinque.howl.volume(nuovoVolume)
    volumeRanger.value = nuovoVolume * 100;
    setLabelInnerText(volumelabel, nuovoVolume * 100)


    setTimeout(fadeOutCanzoni_step, 100);

}

/* ----------- */


function onvolumerumoriInput(param) {
    let valueVolume = param / 100;

    isFadeinRumori = false
    isFadeoutRumori = false


    setRumoriVolume(valueVolume)


}

function onvolumecanzoniInput(param) {
    let valueVolume = param / 100;

    isFadeinCanzoni = false
    isFadeoutCanzoni = false

    setCanzoniVolume(valueVolume)


}
function iconaPlay(audio) {
    document.getElementById('btn' + audio).innerHTML = `<i class="fa-solid fa-play"></i>`

}
function iconaStop(audio) {
    document.getElementById('btn' + audio).innerHTML = `<i class="fa-solid fa-stop"></i>`

}

function setLabelInnerText(label, text) {
    label.innerText = Math.round(text);

}

function easeInOut(x, a = 1) {

    let y = (x ** a) / (x ** a + ((1 - x) ** a));

    return y
}

/* ----- KEY SHORTCUT ------ */
let keymanager = new KeypressedManager();

keymanager.onkeypressed('1', toggleAudioPlayUno)
keymanager.onkeypressed('2', toggleAudioPlayDue)
keymanager.onkeypressed('3', toggleAudioPlayTre)
keymanager.onkeypressed('4', toggleAudioPlayQuattro)
keymanager.onkeypressed('5', toggleAudioPlayCinque)
keymanager.onkeypressed('q', toggleAudioPlaysuon1)
keymanager.onkeypressed('w', toggleAudioPlaysuon2)
keymanager.onkeypressed('e', toggleAudioPlaysuon3)
keymanager.onkeypressed('e', toggleAudioPlaysuon4)
keymanager.onkeypressed('e', toggleAudioPlaysuon5)
// ## <<---- here per aggiungere un NUOVO SUONO



function toggleAudioPlayUno() {
    toggleAudioPlay('uno')
}
function toggleAudioPlayDue() {
    toggleAudioPlay('due')
}
function toggleAudioPlayTre() {
    toggleAudioPlay('tre')
}
function toggleAudioPlayQuattro() {
    toggleAudioPlay('quattro')
}
function toggleAudioPlayCinque() {
    toggleAudioPlay('cinque')
}
// ## <<---- here per aggiungere un NUOVO SUONO

function toggleAudioPlaysuon1() {
    toggleAudioPlay('suon1')
}
function toggleAudioPlaysuon2() {
    toggleAudioPlay('suon2')
}
function toggleAudioPlaysuon3() {
    toggleAudioPlay('suon3')
}
function toggleAudioPlaysuon3() {
    toggleAudioPlay('suon4')
}
function toggleAudioPlaysuon3() {
    toggleAudioPlay('suon5')
}
// ## <<---- here per aggiungere un NUOVO SUONO


/* ----- END KEY SHORTCUT ------ */


/* ----- button listeners ------ */

document.getElementById('btnsuon1').addEventListener('click', function (event) {
    toggleAudioPlay('suon1');
})
document.getElementById('btnsuon2').addEventListener('click', function (event) {
    toggleAudioPlay('suon2');
})
document.getElementById('btnsuon3').addEventListener('click', function (event) {
    toggleAudioPlay('suon3');
})
document.getElementById('btnsuon4').addEventListener('click', function (event) {
    toggleAudioPlay('suon4');
})
document.getElementById('btnsuon5').addEventListener('click', function (event) {
    toggleAudioPlay('suon5');
})

// ## <<---- here per aggiungere un NUOVO SUONO


document.getElementById('btnuno').addEventListener('click', function (event) {
    toggleAudioPlay('uno');
})

document.getElementById('btndue').addEventListener('click', function (event) {
    toggleAudioPlay('due');
})

document.getElementById('btntre').addEventListener('click', function (event) {
    toggleAudioPlay('tre');
})

document.getElementById('btnquattro').addEventListener('click', function (event) {
    toggleAudioPlay('quattro');
})

document.getElementById('btncinque').addEventListener('click', function (event) {
    toggleAudioPlay('cinque');
})
// ## <<---- here per aggiungere un NUOVO SUONO


document.getElementById('fadeinCanzoni').addEventListener('click', function (event) {
    toggleFadeinCanzoni()
})
document.getElementById('fadeoutCanzoni').addEventListener('click', function (event) {
    toggleFadeoutCanzoni()
})
document.getElementById('fadeinRumori').addEventListener('click', function (event) {
    toggleFadeinRumori()
})
document.getElementById('fadeoutRumori').addEventListener('click', function (event) {
    toggleFadeoutRumori()
})

document.getElementById('btnMuteall').addEventListener('click', function (event) {
    muteall()
})
document.getElementById('btnStopall').addEventListener('click', function (event) {
    stopall()
})

document.getElementById('volumeRumori').addEventListener('input', function (event) {
    onvolumerumoriInput(event.target.valueAsNumber);
})

document.getElementById('volumeCanzoni').addEventListener('input', function (event) {
    onvolumecanzoniInput(event.target.valueAsNumber);
})

/* ----- end button listeners ------ */



