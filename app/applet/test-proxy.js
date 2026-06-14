const http = require('http');

http.get('http://127.0.0.1:3000/api/proxy-image?url=' + encodeURIComponent('https://unavatar.io/instagram/adarsh_furniture') + '&seed=' + encodeURIComponent('Adarsh Furniture'), (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('CONTENT-TYPE:', res.headers['content-type']);
  let data = '';
  res.on('data', d => data += d.toString('utf8'));
  res.on('end', () => console.log('BODY:', data.substring(0, 100)));
});
