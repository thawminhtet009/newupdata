const params = new URLSearchParams(window.location.search);
const title = params.get('title');
const embedBox = document.getElementById('embedBox');
const titleBox = document.getElementById('videoTitle');
const downloadLink = document.getElementById('downloadLink');

fetchVideos().then(videos => {
  const video = videos.find(v => v.title === title);
  if (video) {
    embedBox.innerHTML = `<iframe src="${video.embed}" frameborder="0" allowfullscreen></iframe>`;
    titleBox.textContent = video.title;
    downloadLink.href = video.download;
  }
});
