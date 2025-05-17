/*
keypress shortcut



*/


/*
esempio d'uso

keymanager.onkeypressed('a', functionDoSomething);
*/

export class KeypressedManager {
    listeners = {};
    keypressStatus = {};

     #KEY_STATUS = {
        PRESSING: 'PRESSING',
        NOT_PRESSED: 'NOT PRESSED',
        NOT_PRESSED_FIRING: 'NOT PRESSED FIRING',
        PRESSED_TIMING: ' PRESSED TIMING',
        NOT_PRESSED_TIMING: 'NOT PRESSED TIMING',
    }
    
     #SAFETY_DOUBLEPRESS_TIMING_TIME = 500;
    
    

    onkeypressed(key, functionDoSomething) {

        if (!(key in this.listeners)) {
            this.listeners[key] = [];
        }

        this.listeners[key].push(functionDoSomething);

        return true;
    }

    fireKeyPressedEvent(key) {
        console.log('firing');

        if (!(key in this.listeners) || this.listeners[key].length == 0) {
            return; // do nothing
        }


        this.listeners[key].forEach(funzione => {
            funzione();
        });
    }

    constructor() {

        // attenzione al Runtime-Binding di 'this'
        const keydownEventHandler = function (keydownEvent) {
            const keydown = keydownEvent.key;

            if (!(keydown in this.keypressStatus))
                this.keypressStatus[keydown] = this.#KEY_STATUS.NOT_PRESSED; //inizializzo a zero 


            if (this.keypressStatus[keydown] === this.#KEY_STATUS.NOT_PRESSED_TIMING)
                this.keypressStatus[keydown] = this.#KEY_STATUS.PRESSED_TIMING;

            else if (this.keypressStatus[keydown] === this.#KEY_STATUS.NOT_PRESSED)
                this.keypressStatus[keydown] = this.#KEY_STATUS.PRESSING;

        };
        const keyupEventHandler = function (keyupEvent) {
            const keyup = keyupEvent.key;

            if (this.keypressStatus[keyup] === this.#KEY_STATUS.PRESSING) {
                this.keypressStatus[keyup] = this.#KEY_STATUS.NOT_PRESSED_TIMING;

                // arrow function keeps 'this'. read more about 'runtume binding'
                setTimeout(() => {
                    if (this.keypressStatus[keyup] === this.#KEY_STATUS.NOT_PRESSED_TIMING)
                        this.keypressStatus[keyup] = this.#KEY_STATUS.NOT_PRESSED
                }, this.#SAFETY_DOUBLEPRESS_TIMING_TIME);
            } else if (this.keypressStatus[keyup] === this.#KEY_STATUS.PRESSED_TIMING) {
                this.keypressStatus[keyup] = this.#KEY_STATUS.NOT_PRESSED_FIRING;
                this.fireKeyPressedEvent(keyup);
                
                this.keypressStatus[keyup] = this.#KEY_STATUS.NOT_PRESSED;
            } 
            

        };

        window.addEventListener('keydown', keydownEventHandler.bind(this));

        window.addEventListener('keyup', keyupEventHandler.bind(this))
    }
}


