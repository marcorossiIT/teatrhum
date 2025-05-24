import { KeypressedManager } from "./KeypressedManager.js";
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./serviceworker.js");
} else {
    console.warn('browser non compatibile con i service worker')
}


const suoniConfig = [
    { key: 'suon1', src: 'audios/Telefono_tagliato.mp3', nome: 'Telefono' },
    { key: 'suon2', src: 'audios/Campane.mp3', nome: 'Campane' },
    { key: 'suon3', src: 'audios/Sirena.mp3', nome: 'Sirena' },
    { key: 'suon4', src: 'audios/', nome: '- - ' },
    { key: 'suon5', src: 'audios/', nome: '- -' },
    { key: 'uno', src: 'audios/1 - La donna.mp3', nome: '1 - La donna e mobile' },
    { key: 'due', src: 'audios/2 - Largo al factotum.mp3', nome: '2 - Largo al factotum' },
    { key: 'tre', src: 'audios/3 - Don Carlo.mp3', nome: '3 - Don Carlo' },
    { key: 'quattro', src: 'audios/4 - Habanera.mp3', nome: '4 - Habanera' },
    { key: 'cinque', src: 'audios/5 - Otello.mp3', nome: '5 - Otello' },
    { key: 'sei', src: 'audios/6 - Traviata.mp3', nome: '6 - Traviata' },
    { key: 'sette', src: 'audios/7 - Donna TAGLIATA.mp3', nome: '7 - Donna TAGLIATA' },
    { key: 'otto', src: 'audios/8 - Toreador.mp3', nome: '8 - Toreador' },
];


const btnsuon1 = document.getElementById('btnsuon1');
const btnsuon2 = document.getElementById('btnsuon2');
const btnsuon3 = document.getElementById('btnsuon3');
const btnsuon4 = document.getElementById('btnsuon4');
const btnsuon5 = document.getElementById('btnsuon5');

const whatToObserve = {
    attributes: true,
    attributeFilter: ['data-playing'],
};

const mutObsv = new MutationObserver(mutations => {
    for (const m in mutations) {
        if (Object.prototype.hasOwnProperty.call(mutations, m)) {
            const mutation = mutations[m];
            if (mutation.attributeName === 'data-playing') {
                // do something
            }
        }
    }
});
mutObsv.observe(btnsuon1, whatToObserve);
mutObsv.observe(btnsuon2, whatToObserve);
mutObsv.observe(btnsuon3, whatToObserve);
mutObsv.observe(btnsuon4, whatToObserve);
mutObsv.observe(btnsuon5, whatToObserve);



let suoni = {};

suoniConfig.forEach(({ key, src, nome }) => {
    suoni[key] = {
        howl: new Howl({
            src: [src],
            html5: true,
            onplay: function () {
                suoni[key].playing = true;
                iconaStop(key);
            },
            onstop: function () {
                suoni[key].playing = false;
                iconaPlay(key);
            },
            onend: function () {
                suoni[key].playing = false;
                iconaPlay(key);
            },
        }),
        playing: false,
        nomeVisualizzato: nome,
    };
});

/* ----- NOMI VISUALIZZATI------ */

document.getElementById('label-suon1').innerText = suoni.suon1.nomeVisualizzato;
document.getElementById('label-suon2').innerText = suoni.suon2.nomeVisualizzato;
document.getElementById('label-suon3').innerText = suoni.suon3.nomeVisualizzato;
document.getElementById('label-suon4').innerText = suoni.suon4.nomeVisualizzato;
document.getElementById('label-suon5').innerText = suoni.suon5.nomeVisualizzato;
document.getElementById('label-canz1').innerText = suoni.uno.nomeVisualizzato;
document.getElementById('label-canz2').innerText = suoni.due.nomeVisualizzato;
document.getElementById('label-canz3').innerText = suoni.tre.nomeVisualizzato;
document.getElementById('label-canz4').innerText = suoni.quattro.nomeVisualizzato;
document.getElementById('label-canz5').innerText = suoni.cinque.nomeVisualizzato;
document.getElementById('label-canz6').innerText = suoni.sei.nomeVisualizzato;
document.getElementById('label-canz7').innerText = suoni.sette.nomeVisualizzato;
document.getElementById('label-canz8').innerText = suoni.otto.nomeVisualizzato;

/* ----- END NOMI VISUALIZZATI------ */


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
    suoni.sei.howl.volume(volume)
    suoni.sette.howl.volume(volume)
    suoni.otto.howl.volume(volume)
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
    suoni.sei.howl.volume(nuovoVolume)
    suoni.sette.howl.volume(nuovoVolume)
    suoni.otto.howl.volume(nuovoVolume)
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
    suoni.sei.howl.volume(nuovoVolume)
    suoni.sette.howl.volume(nuovoVolume)
    suoni.otto.howl.volume(nuovoVolume)
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

/*let keymanager = new KeypressedManager();

keymanager.onkeypressed('1', toggleAudioPlayUno)
keymanager.onkeypressed('2', toggleAudioPlayDue)
keymanager.onkeypressed('3', toggleAudioPlayTre)
keymanager.onkeypressed('4', toggleAudioPlayQuattro)
keymanager.onkeypressed('5', toggleAudioPlayCinque)
keymanager.onkeypressed('q', toggleAudioPlaysuon1)
keymanager.onkeypressed('w', toggleAudioPlaysuon2)
keymanager.onkeypressed('e', toggleAudioPlaysuon3)
keymanager.onkeypressed('r', toggleAudioPlaysuon4)
keymanager.onkeypressed('t', toggleAudioPlaysuon5)
// ## <<---- here per aggiungere un NUOVO SUONO

*/

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
function toggleAudioPlaySei() {
    toggleAudioPlay('sei')
}
function toggleAudioPlaySette() {
    toggleAudioPlay('sette')
}
function toggleAudioPlayOtto() {
    toggleAudioPlay('otto')
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
function toggleAudioPlaysuon4() {
    toggleAudioPlay('suon4')
}
function toggleAudioPlaysuon5() {
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
document.getElementById('btnsei').addEventListener('click', function (event) {
    toggleAudioPlay('sei');
})
document.getElementById('btnsette').addEventListener('click', function (event) {
    toggleAudioPlay('sette');
})
document.getElementById('btnotto').addEventListener('click', function (event) {
    toggleAudioPlay('otto');
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



