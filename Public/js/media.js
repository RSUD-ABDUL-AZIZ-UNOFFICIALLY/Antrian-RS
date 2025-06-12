async function updateRunningText() {
    await fetch('/edit/message')
        .then(response => response.json())
        .then(data => {
            const runningTextContainer = document.getElementById('runningTextContainer');
            runningTextContainer.innerHTML = ''; // Clear previous content
            if (data.message.length <= 100) {
                for (let i = 0; i < 4; i++) {
                    const runningText = document.createElement('div');
                    runningText.className = 'marquee-loop inline-block text-white text-4xl font-medium px-2';
                    runningText.innerHTML = data.message;
                    runningTextContainer.appendChild(runningText);
                }
            } else if (data.message.length > 100) {
                for (let i = 0; i < 3; i++) {
                    const runningText = document.createElement('div');
                    runningText.className = 'marquee-loop inline-block text-white text-4xl font-medium px-2';
                    runningText.innerHTML = data.message;
                    runningTextContainer.appendChild(runningText);
                }
            } else {
                console.error('No message found in response');
            }
        })
        .catch(error => console.error('Error fetching running text:', error));
}
updateRunningText();

async function updateVideo() {
    let currentIndex = 0;
    let playlist = [];
    await fetch('/edit/video')
        .then(response => response.json())
        .then(data => {
            for (let url of data) {
                playlist.push("/asset/content/" + url.url);
            }
        })
        .catch(error => console.error('Error fetching video:', error));
    let videoPlayer = document.getElementById("videos");
    console.log(videoPlayer);
    console.log(playlist);
    console.log(playlist.length);

    videoPlayer.addEventListener("ended", () => {
        console.log("Video ended, switching to next video.");
        currentIndex = (currentIndex + 1) % playlist.length; // Loop kembali ke awal
        videoPlayer.src = playlist[currentIndex];
        videoPlayer.play();
    });

}
updateVideo();