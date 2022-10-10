function number(a) {
    new Audio('/asset/audio/suara/nomorantrian.wav').play();
    setTimeout(() => {
        angka(a);
    }, 500);
}
function angka(a) {
    if (a <= 19) {
        setTimeout(() => {
            let audio = new Audio(numberMap[a]);
            audio.play();
        }, 1500);
        return;
    }
    else if (a < 100) {
        let puluh = Math.floor(a / 10);
        setTimeout(() => {
            let audio = new Audio(numberMap[puluh]);
            audio.play();
        }, 1000);
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/puluh.wav');
            audio.play();
        }, 2000);
        setTimeout(() => {
            new Audio(numberMap[a - puluh * 10]).play();
        }, 2800);
    }
    else if (a < 200) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/100.wav');
            audio.play();
        }, 1500);
        let ulang = a - 100;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 1000) {
        let puluh = Math.floor(a / 100);
        setTimeout(() => {
            let audio = new Audio(numberMap[puluh]);
            audio.play();
        }, 1000);
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/ratus.wav');
            audio.play();
        }, 1800);

        let ulang = a - puluh * 100;
        setTimeout(() => {
            angka(ulang);
        }, 2000);
        return;
    }

    else if (a < 2000) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/1000.wav');
            audio.play();
        }, 1500);
        let ulang = a - 1000;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
}
function loket(a) {
    setTimeout(() => {
        new Audio('/asset/audio/suara/loket.wav').play();
    }, 100);
    angka(a)
}

const numberMap = {
    1: '/asset/audio/suara/1.wav',
    2: '/asset/audio/suara/2.wav',
    3: '/asset/audio/suara/3.wav',
    4: '/asset/audio/suara/4.wav',
    5: '/asset/audio/suara/5.wav',
    6: '/asset/audio/suara/6.wav',
    7: '/asset/audio/suara/7.wav',
    8: '/asset/audio/suara/8.wav',
    9: '/asset/audio/suara/9.wav',
    10: '/asset/audio/suara/10.wav',
    11: '/asset/audio/suara/11.wav',
    12: '/asset/audio/suara/12.wav',
    13: '/asset/audio/suara/13.wav',
    14: '/asset/audio/suara/14.wav',
    15: '/asset/audio/suara/15.wav',
    16: '/asset/audio/suara/16.wav',
    17: '/asset/audio/suara/17.wav',
    18: '/asset/audio/suara/18.wav',
    19: '/asset/audio/suara/19.wav',
}