const https = require('https');
const url = "https://instagram.fpnq22-1.fna.fbcdn.net/v/t51.2885-19/274398235_4652225414876387_398269555590706351_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MDAuYzIifQ&_nc_ht=instagram.fpnq22-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHzhkadpeAyLslXTePuud4HmutWNAq4HlYySjheo5Xmu2r18dcZ845bny9UmnVmhpo&_nc_ohc=1Ho6KKnb1w4Q7kNvwGEr8H_&_nc_gid=VHRANpIH9CNAVOj4FU6UFw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_e1u1Ttz9BALsIVrkx74jMHIGMyiq6CqI4jcQ78k1mpw&oe=6A317AB8&_nc_sid=7a9f4b";

https.get(url, (res) => {
  console.log("Status:", res.statusCode);
}).on('error', (e) => {
  console.error("Error:", e.message);
});