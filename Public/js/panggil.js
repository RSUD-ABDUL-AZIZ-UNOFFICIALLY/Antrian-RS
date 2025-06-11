function playAudiosSequentially(audioPaths) {
    let index = 0;
    // console.log("Playing audios sequentially:", audioPaths);

    function playNext() {
        if (index < audioPaths.length) {
            const audio = new Audio(audioPaths[index]);
            audio.play();
            audio.onended = () => {
                index++;
                playNext(); // Lanjutkan ke audio berikutnya setelah selesai
            };
        }
    }

    playNext(); // Mulai pemutaran
}
let audios = [];

// Angka yang akan diputar
let numMap = {
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
    // Tambahkan angka lainnya sesuai kebutuhan
};
 function playNumberAudio(number) {
    let numberMap = [];
    if (number <= 19){
        numberMap.push(numMap[number] || '');
    }else if (number < 100) {
        const tens = Math.floor(number / 10);
        const units = number % 10;
        if (tens > 0) {
            console.log(tens );
            numberMap.push(numMap[tens ] || '');
        }
        numberMap.push('/asset/audio/suara/puluh.wav');
        if (units > 0) {
            numberMap.push(numMap[units] || '');
        }
    }else if (number < 200) {
        numberMap.push('/asset/audio/suara/100.wav');
        const remainder = number - 100;
        console.log(remainder);
        if (remainder > 0) {
            if (remainder <= 19) {
                numberMap.push(numMap[remainder] || '');
            }else if (remainder < 100) {
                const tens = Math.floor(remainder / 10);
                const units = remainder % 10;
                if (tens > 0) {
                    console.log(tens);
                    numberMap.push(numMap[tens] || '');
                }
                numberMap.push('/asset/audio/suara/puluh.wav');
                if (units > 0) {
                    numberMap.push(numMap[units] || '');
                }
            }
        }
    }
    else if (number < 1000) {
        let puluh = Math.floor(number / 100);
        numberMap.push(numMap[puluh] || '');
        numberMap.push('/asset/audio/suara/ratus.wav');
        const remainder = number % 100;
        if (remainder > 0) {
            if (remainder <= 19) {
                numberMap.push(numMap[remainder] || '');
            } else if (remainder < 100) {
                const tens = Math.floor(remainder / 10);
                const units = remainder % 10;
                if (tens > 0) {
                    console.log(tens);
                    numberMap.push(numMap[tens] || '');
                }
                numberMap.push('/asset/audio/suara/puluh.wav');
                if (units > 0) {
                    numberMap.push(numMap[units] || '');
                }
            }
        }
    } else if (number < 2000) {
        numberMap.push('/asset/audio/suara/1000.wav');
        const remainder = number - 1000;
        if (remainder > 0) {
            numberMap.push(...playNumberAudio(remainder));
        }
    }
    
    return numberMap

}

