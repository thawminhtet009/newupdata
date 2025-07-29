const container = document.getElementById('videoContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

let videos = [];

fetchVideos().then(data => {
  videos = data;
  renderCategories();
  renderVideos();
});

function renderCategories() {
  const categories = [...new Set(videos.map(v => v.category))];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function renderVideos() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  container.innerHTML = '';
  
  videos.filter(v =>
    (v.title.toLowerCase().includes(search)) &&
    (category === 'all' || v.category === category)
  ).forEach(v => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${v.image}" alt="${v.title}">
      <div>
        <h3>${v.title}</h3>
        <p>${v.category} | ${v.release}</p>
        ${isNew(v.release) ? '<span class="new">NEW</span>' : ''}
        <a href="watch.html?title=${encodeURIComponent(v.title)}">▶️ Watch</a>
      </div>
    `;
    container.appendChild(div);
  });
}

function isNew(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  const diff = (today - date) / (1000 * 60 * 60 * 24);
  return diff < 7; // Less than 7 days old
}

searchInput.addEventListener('input', renderVideos);
categoryFilter.addEventListener('change', renderVideos);
