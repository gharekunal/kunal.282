import https from "https";
https.get("https://unavatar.io/instagram/adarsh_furniture", (res) => {
  console.log(res.statusCode, res.headers.location);
});
