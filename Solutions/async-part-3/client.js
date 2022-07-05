const request = require("request");
const fetch = require("cross-fetch");
const axios = require("axios");

// const options = {
//   url: "http://localhost:3001",
//   method: "GET",
//   headers: {
//     Cookie: "cyber4s-is=amazing",
//   },
// };

// request(options, function (err, res, body) {
//   console.log(JSON.stringify(res.headers, null, 4));
// });

fetch("http://localhost:3001", {
  method: "GET",
  headers: {
    Cookie: "cyber4s-is=amazing",
  },
}).then((respone) => console.log(respone.data, respone.headers["set-cookie"]));

axios
  .request({
    url: "http://localhost:3001",
    method: "get",
    headers: {
      Cookie: "cyber4s-is=amazing",
    },
  })
  .then((respone) => console.log(respone.data, respone.headers["set-cookie"]));
