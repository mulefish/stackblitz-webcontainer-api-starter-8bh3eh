import { getPrettyDate, default_events } from './defaultEvents.js';
function verdict(a, b, msg) {
    let pf = "FAIL"
    let isOk = false
    if (JSON.stringify(a) === JSON.stringify(b)) {
        pf = "PASS"
        isOk = true
    }
    console.log(`${pf} ${msg}`)
    return isOk
}

/* Dates are hard : Do they fit the format? */
function test_prettyDate() {
    const x = getPrettyDate()
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
    const isMatch = regex.test(x);
    verdict(isMatch, true, "test_prettyDate " + x)
}

/* Check for typos and general dumbness */
function test_default_events() {
    let isOk = true
    const keys = ["event", "created", "json"]
    for (let k in default_events) {
        keys.forEach((key) => {
            if (!default_events[k].hasOwnProperty(key)) {
                console.log(key + "   " + k + "   fail ")
                isOk = false
            }

            if (typeof default_events[k]["json"] !== "object") {
                console.log(key + "   " + k + "   fail ")
                isOk = false
            }
        })
    }
    verdict(isOk, true, "test_default_events")
}
/* are all the defaults present? */
function test_all_the_defaults_are_there() {
    let expected = ["app-response", "error", "general-component-event", "page-products-displayed", "page-view", "product-interaction", "purchase"]
    expected = expected.sort()
    let actual = Object.keys(default_events)
    actual = actual.sort()

    // TODO: Zap this IF once done
    const x = verdict(expected, actual, "test_all_the_defaults_are_there")
    if (x === false) {
        console.log("actual")
        console.log(actual)
        console.log("expected")
        console.log(expected)
    }
}

function runner() {
    test_all_the_defaults_are_there()
    test_prettyDate()
    test_default_events()
}
runner()




