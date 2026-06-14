const http = require('http');
const url = "http://localhost:3000/api/proxy-image?url=" + encodeURIComponent("https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/454722908_1978419785920994_1331566226510301920_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NjAuYzIifQ&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gHusmBthz2jJynneUTIvKElCSeMEKYqLzvlfFqeXOfyN15q-spb_mOnWd_93Muhksc&_nc_ohc=AdTrhT6vMJ4Q7kNvwEeyzHU&_nc_gid=ZCSLEyfeSWiAig06rcQzGw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_pwR6uCdpN48p4jzK4Tc1arw-Bp3ApFrAT2vX7EgYe9Q&oe=6A318C0C&_nc_sid=7a9f4b");

http.get(url, (res) => {
  let size = 0;
  res.on('data', chunk => size += chunk.length);
  res.on('end', () => console.log('Downloaded bytes:', size, 'Status:', res.statusCode));
}).on('error', (e) => {
  console.error("Error:", e.message);
});
