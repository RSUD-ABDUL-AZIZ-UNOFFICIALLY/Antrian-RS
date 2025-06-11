const socket = io();
socket.io.on("error", (error) => {
    console.error("Socket.IO error:", error);
});
socket.emit('send_message', { 'command': 'Hello from client!' });


let Element_runningText = document.getElementById('runningText');
fetch('/edit/message')
    .then(response => response.json())
    .then(data => {
        Element_runningText.value = data.message;
    });
function submitText() {
    // console.log(Element_runningText.value);
    fetch('/edit/message', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: Element_runningText.value })
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Teks berjalan telah diperbarui.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            socket.emit('send_message', { 'command': 'UpdateRunningText', 'data': Element_runningText.value });
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

const imagePreview = document.getElementById('imagePreview');
document.getElementById('imageUpload').addEventListener('change', function (e) {
    imagePreview.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.className = 'w-full h-32 object-cover rounded-lg border';

        const del = document.createElement('button');
        del.innerText = '×';
        del.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition';
        del.onclick = () => wrapper.remove();

        wrapper.appendChild(img);
        wrapper.appendChild(del);
        imagePreview.appendChild(wrapper);

    });
});
document.getElementById('imageForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman
    const formData = new FormData(this); // Ambil data dari form
    console.log(formData);

    fetch('/edit/image', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) throw new Error('Gagal mengunggah gambar');
            return response.json();
        })
        .then(data => {
            console.log('Upload sukses:', data);
            socket.emit('send_message', { 'command': 'UpdateImage' });
            Swal.fire({
                title: 'Berhasil!',
                text: 'Gambar telah diunggah.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            imagePreview.innerHTML = '';
            document.getElementById('imageUpload').value = '';
            // Tampilkan notifikasi atau update tampilan
            dataFoto.then(() => swiper.update()); // Ensure the swiper updates after adding images
            let swiperListFoto = document.getElementById('swiperListFoto');
            data.url.forEach(item => {
                let slide = document.createElement('div');
                slide.className = 'swiper-slide';
                // slide.innerHTML = `<img src="/asset/content/${item.url}" class="w-full h-128 object-cover rounded" alt="Foto${item.url}" />`;
                slide.innerHTML = `
            <div class="relative group">
                <img src="/asset/content/${item}" class="w-full h-128 object-cover rounded" alt="Foto${item}" />
                <button class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" onclick="hapusFoto('/asset/content/${item}')">×</button>
            </div>`;
                swiperListFoto.appendChild(slide);
            });

        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});


const videoPreview = document.getElementById('videoPreview');
document.getElementById('videoUpload').addEventListener('change', function (e) {
    videoPreview.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';

        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.className = 'w-full h-40 rounded-lg border';
        video.controls = true;

        const del = document.createElement('button');
        del.innerText = '×';
        del.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition';
        del.onclick = () => wrapper.remove();

        wrapper.appendChild(video);
        wrapper.appendChild(del);
        videoPreview.appendChild(wrapper);
    });
});

document.getElementById('videoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman
    const formData = new FormData(this); // Ambil data dari form


    fetch('/edit/video', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) throw new Error('Gagal mengunggah video');
            return response.json();
        })
        .then(data => {
            console.log('Upload sukses:', data);
            socket.emit('send_message', { 'command': 'UpdateVideo' });
            Swal.fire({
                title: 'Berhasil!',
                text: 'Video telah diunggah.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            videoPreview.innerHTML = '';
            document.getElementById('videoPreview').value = '';
            // Tampilkan notifikasi atau update tampilan
            // let swiperListVideo = document.getElementById('swiperListVideo');
            data.url.forEach(item => {
                let slide = document.createElement('div');
                slide.className = 'swiper-slide';
                 slide.innerHTML = `
                    <div class="relative group">
                        <video src="/asset/content/${item}" class="w-full h-40 rounded-lg border" controls></video>
                        <button class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" onclick="hapusVideo('/asset/content/${item}')">×</button>
                    </div>`;
            videoContainer.appendChild(slide);
            });
           
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});