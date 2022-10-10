function number(a) {
    new Audio('/asset/audio/suara/nomorantrian.wav').play();
    setTimeout(() => {
        angka(a);
    }, 500);
}
function angka(a) {
    if (a <= 12) {
        setTimeout(() => {
            let audio = new Audio(numberMap[a]);
            audio.play();
        }, 1500);
        return;
    } else if (a < 20) {
        setTimeout(() => {
            let audio = new Audio(numberMap[a - 10]);
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio('/asset/audio/suara/belas.wav').play();
        }, 2500);
        return;
    } else if (a < 30) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/20.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 20]).play();
        }, 2500);
    }
    else if (a < 40) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/30.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 30]).play();
        }, 2500);
    }
    else if (a < 50) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/40.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 40]).play();
        }, 2500);
    }
    else if (a < 60) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/50.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 50]).play();
        }, 2500);
    }
    else if (a < 70) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/60.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 60]).play();
        }, 2500);
    }
    else if (a < 80) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/70.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 70]).play();
        }, 2500);
    }
    else if (a < 90) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/80.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 80]).play();
        }, 2500);
    }
    else if (a < 100) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/90.wav');
            audio.play();
        }, 1500);
        setTimeout(() => {
            new Audio(numberMap[a - 90]).play();
        }, 2500);
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
    else if (a < 300) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/200.wav');
            audio.play();
        }, 1500);
        let ulang = a - 200;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 400) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/300.wav');
            audio.play();
        }, 1500);
        let ulang = a - 300;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 500) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/400.wav');
            audio.play();
        }, 1500);
        let ulang = a - 400;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 600) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/500.wav');
            audio.play();
        }, 1500);
        let ulang = a - 500;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 700) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/600.wav');
            audio.play();
        }, 1500);
        let ulang = a - 600;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 800) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/700.wav');
            audio.play();
        }, 1500);
        let ulang = a - 700;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 900) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/800.wav');
            audio.play();
        }, 1500);
        let ulang = a - 800;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    else if (a < 1000) {
        setTimeout(() => {
            let audio = new Audio('/asset/audio/suara/900.wav');
            audio.play();
        }, 1500);
        let ulang = a - 900;
        setTimeout(() => {
            angka(ulang);
        }, 1250);
        return;
    }
    // setTimeout(() => {
    //     let audio = new Audio('/asset/audio/suara/1000.wav');
    //     audio.play();
    // }, 1500);
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
}