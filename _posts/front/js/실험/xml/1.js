const txt =
  '<?xml version="1.0" encoding="utf-8"?><content><![CDATA[<!-- スマホ --><a href="http://weather.asahi.com/sp/pinpoint/kinki/sumoto.html?iref=sptop_ropponshita_w"><p class="Area">洲本</p><p class="Image"><img alt="晴→雨" src="//www.asahicom.jp/weather/images/hare_ame.png"></p><p class="RainChance">40%</p></a>]]></content>';

const parser = new DOMParser();

const xmlDoc = parser.parseFromString(txt, "text/xml");

// 특정 테그를 기준으로 변수에 담는다
const xml = xmlDoc.getElementsByTagName("rss");

console.log("xml", xml);

//https://stackoverflow.com/questions/15376312/whats-the-simplest-way-to-parse-an-xml-string-in-node-js
//https://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript
//https://stackoverflow.com/questions/15376312/whats-the-simplest-way-to-parse-an-xml-string-in-node-js

//using DOMParser
// https://cofs.tistory.com/11

//using xml2js
// https://www.thepolyglotdeveloper.com/2015/01/parse-xml-response-nodejs/
