let dataFoto = fetch('/edit/image') // Ganti dengan endpoint API yang sesuai
    .then(response => response.json())
    .then(data => {
        let swiperListFoto = document.getElementById('swiperListFoto');
        swiperListFoto.innerHTML = ''; // Kosongkan isi awal
        data.forEach(item => {
            let slide = document.createElement('div');
            slide.className = 'swiper-slide';
            // slide.innerHTML = `<img src="/asset/content/${item.url}" class="w-full h-128 object-cover rounded" alt="Foto${item.url}" />`;
            slide.innerHTML = `
            <div class="relative group">
                <img src="/asset/content/${item.url}" class="w-full h-128 object-cover rounded" alt="Foto${item.url}" />
                <button class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" onclick="hapusFoto('${item.url}')">×</button>
            </div>`;
            swiperListFoto.appendChild(slide);
        });
        // swiper.update(); // Update Swiper setelah menambahkan slide
    })
const swiper = new Swiper(".listFoto", {
    loop: false,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
async function hapusFoto(url) {
    try {
        const response = await fetch('/edit/image', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        if (!response.ok) throw new Error('Gagal menghapus foto');
        const data = await response.json();
        console.log('Hapus sukses:', data);
        Swal.fire({
            title: 'Berhasil!',
            text: 'Foto telah dihapus.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        // Update tampilan atau notifikasi
        const swiperSlide = document.querySelector(`.swiper-slide img[src*="${url}"]`).closest('.swiper-slide');
        swiper.removeSlide(swiper.activeIndex);
        swiper.update();


    } catch (error) {
        console.error('Error:', error.message);
    }

}

let videoData = fetch('/edit/video') // Ganti dengan endpoint API yang sesuai
    .then(response => response.json())
    .then(data => {
        let videoContainer = document.getElementById('videoContainer');
        console.log(videoContainer);
        videoContainer.innerHTML = '';        
        data.forEach(item => {
            let slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
            <div class="relative group">
                <video src="/asset/content/${item.url}" class="w-full h-40 rounded-lg border" controls></video>
                <button class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" onclick="hapusVideo('${item.url}')">×</button>
            </div>`;
            videoContainer.appendChild(slide);
        })
    }
);
async function hapusVideo(url) {
    try {
        const response = await fetch('/edit/video', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        if (!response.ok) throw new Error('Gagal menghapus video');
        const data = await response.json();
        console.log('Hapus sukses:', data);
        Swal.fire({
            title: 'Berhasil!',
            text: 'Video telah dihapus.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        // Update tampilan atau notifikasi
        const swiperSlide = document.querySelector(`.swiper-slide video[src*="${url}"]`).closest('.swiper-slide');
        swiperSlide.remove();
     
    } catch (error) {
        console.error('Error:', error.message);
    }
}