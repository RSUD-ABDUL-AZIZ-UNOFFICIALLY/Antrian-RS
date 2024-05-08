const { getDisplay, updateDisplay } = require('./model/display');

async function test() {
    let result = await getDisplay();
    result.forEach(element => {
        console.log(element.loket);
    });
    let updateDisplays = await updateDisplay(1, 1);
    // console.log(result);
}

test();
