// const { getPrettyDate }  = require('./defaultEvents.js');
import  { getPrettyDate } from './defaultEvents.js';
function verdict(a, b, msg) {
    let pf = "FAIL"
    if ( JSON.stringify(a) === JSON.stringify(b) ) { 
        pf = "PASS"
    }
    console.log(`${pf} ${msg}`)
}
function test_prettyDate() { 
    const x = getPrettyDate() 
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
    const isMatch = regex.test(x);
    verdict(isMatch , true, "test_prettyDate " + x )
}

function runner() { 
    test_prettyDate() 
}
runner() 




