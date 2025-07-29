const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1yFi2LC02KhBQZ4m6kfzad_1FBsom9QDABPUHS7RKOJM/values/member!A2:D100?key=AIzaSyDZqMYFCHG17qgCbrFhyoEIdrR9ua86348";

const videoFrame = document.getElementById("videoFrame");
const videoTitle = document.getElementById("videoTitle");
const downloadButtons = document.getElementById("downloadButtons");
const episodeContainer = document.getElementById("episodeContainer");

let videoData = [];

function loadVideo(index) {
  const data = videoData[index];
  if (!data) return;
  videoTitle.textContent = data[0]; // Title
  videoFrame.src = data[1]; // Embed URL
  downloadButtons.innerHTML = `
    <button onclick="window.open('${data[2]}','_blank')">Download 1</button>
    <button onclick="window.open('${data[3]}','_blank')">Download 2</button>
  `;
}

fetch(sheetUrl)
  .then(res => res.json())
  .then(data => {
    videoData = data.values;
    if (!videoData || videoData.length === 0) {
      videoTitle.textContent = "No videos found.";
      return;
    }
    // Load first video
    loadVideo(0);
    // Create episode buttons
    videoData.forEach((video, i) => {
      const ep = document.createElement("div");
      ep.className = "episode-item";
      ep.textContent = video[0];
      ep.onclick = () => loadVideo(i);
      episodeContainer.appendChild(ep);
    });
  })
  .catch(err => {
    videoTitle.textContent = "Failed to load videos.";
    console.error(err);
  });
