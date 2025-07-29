const SHEET_URL = "https://sheets.googleapis.com/v4/spreadsheets/1yFi2LC02KhBQZ4m6kfzad_1FBsom9QDABPUHS7RKOJM/values/member!A2:D100?key=AIzaSyDZqMYFCHG17qgCbrFhyoEIdrR9ua86348";

let allVideos = [];

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    allVideos = data.values.map(row => ({
      id: row[0],
      title: row[1],
      type: row[2],
      url: row[3]
    }));

    const currentPage = window.location.pathname;
    if (currentPage.includes("watch.html")) {
      showWatchPage();
    } else {
      renderVideoList("all");
    }
  })
  .catch(() => {
    alert("❌ Failed to load videos");
  });

function renderVideoList(filter) {
  const list = document.getElementById("videoList");
  list.innerHTML = "";

  let videos = allVideos;
  if (filter === "free") videos = allVideos.filter(v => v.type.toLowerCase() === "free");
  if (filter === "vip") videos = allVideos.filter(v => v.type.toLowerCase() === "vip");

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${video.title}</strong><br><small>${video.type}</small>`;
    card.onclick = () => location.href = `watch.html?post=${video.id}`;
    list.appendChild(card);
  });
}

function filterVideos(type) {
  renderVideoList(type);
}

function showWatchPage() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("post");
  const video = allVideos.find(v => v.id === postId);
  if (!video) {
    document.getElementById("videoTitle").innerText = "❌ Video not found!";
    return;
  }
  document.getElementById("videoTitle").innerText = video.title;
  document.getElementById("videoFrame").src = video.url;
}
