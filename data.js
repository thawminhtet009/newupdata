const SHEET_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1yFi2LC02KhBQZ4m6kfzad_1FBsom9QDABPUHS7RKOJM/values/member!A2:D100?key=AIzaSyDZqMYFCHG17qgCbrFhyoEIdrR9ua86348';

async function fetchVideos() {
  const res = await fetch(SHEET_URL);
  const data = await res.json();
  return data.values.map(row => ({
    title: row[0],
    image: row[1],
    embed: row[2],
    download: row[3],
    category: row[4],
    release: row[5]
  }));
}
