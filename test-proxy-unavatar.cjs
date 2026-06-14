const http = require('http');
const url = "http://localhost:3000/api/proxy-image?url=" + encodeURIComponent("https://unavatar.io/instagram/adarsh_furniture");

http.get(url, (res) => {
  let size = 0;
  res.on('data', chunk => size += chunk.length);
  res.on('end', () => console.log('Downloaded bytes:', size, 'Status:', res.statusCode));
}).on('error', (e) => {
  console.error("Error:", e.message);
});
