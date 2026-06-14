import https from 'https';
https.get('https://unavatar.io/instagram/adarsh_furniture', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
