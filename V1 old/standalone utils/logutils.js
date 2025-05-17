export function getloggers(pretext = '') {
    return {
        clog: function (...varargs) {
            let copiedObjects = []
            for (const arg of varargs) {
                copiedObjects.push(JSON.parse(JSON.stringify(arg)))
            }
            console.log(pretext, ' - ', ...copiedObjects)
        },
        ilog: function (...varargs) {
            let copiedObjects = []
            for (const arg of varargs) {
                copiedObjects.push(JSON.parse(JSON.stringify(arg)))
            }
            console.info(pretext, ' - ', ...copiedObjects)
        },
        wlog: function (...varargs) {
            let copiedObjects = []
            for (const arg of varargs) {
                copiedObjects.push(JSON.parse(JSON.stringify(arg)))
            }
            console.warn(pretext, ' - ', ...copiedObjects)
        },
        elog: function (...varargs) {
            let copiedObjects = []
            for (const arg of varargs) {
                copiedObjects.push(JSON.parse(JSON.stringify(arg)))
            }
            console.error(pretext, ' - ', ...copiedObjects)
        },
        dlog: function (...varargs) {
            let copiedObjects = []
            for (const arg of varargs) {
                copiedObjects.push(JSON.parse(JSON.stringify(arg)))
            }
            console.debug(pretext, ' - ', ...copiedObjects)
        },
    }
}

