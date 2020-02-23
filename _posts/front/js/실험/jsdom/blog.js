//https://iwb.jp/nodejs-https-jsdom-get-html-text/
//https://iwb.jp/nodejs-https-jsdom-get-html-text/
const https = require("https");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const url = "https://iwb.jp/foo/";

https.get(url, function(res) {
  let html = "";
  res.on("data", function(line) {
    html += line;
  });
  res.on("end", function() {
    const dom = new JSDOM(html);
    console.log(
      dom.window.document.querySelector("#item > li:last-child").textContent
    );
  });
});
