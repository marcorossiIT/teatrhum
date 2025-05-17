window.onload = startHere
function startHere() {


    if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');
    } else {
        console.info('WebMIDI is not supported in this browser.');
    }

    const h1Comando = document.getElementById('comando')
    const h1Nota = document.getElementById('nota')
    const h1Velocita = document.getElementById('velocita')

    navigator.requestMIDIAccess()
        .then(onMIDISuccess, onMIDIFailure);

    function onMIDISuccess(midiAccess) {

        console.log(midiAccess);

        var inputs = midiAccess.inputs;
        var outputs = midiAccess.outputs;

        for (var input of inputs.values()) {
            console.log(input)
            input.onmidimessage = getMIDIMessage;
        }

        for (var output of outputs.values()) {
            input.onmidimessage = getMIDIMessage;
        }

    }

    function onMIDIFailure() {

        console.warn('Could not access your MIDI devices.');
    }

    function getMIDIMessage(midiMessage) {
        console.log(midiMessage)
        h1Comando.innerText = midiMessage.data[0]
        h1Nota.innerText = midiMessage.data[1]
        h1Velocita.innerText = midiMessage.data[2]

    }
}
