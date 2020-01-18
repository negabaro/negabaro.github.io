//

const document = {
  cookie:
    "OB-USER-TOKEN=xx; _ga=GA1.2.238315056.1569401405; com.silverpop.iMA.page_visit=47:"
};
const getUtilityDataCookie = key => {
  //const cookieMock = getCookie("utilityData");
  const cookieMock2 =
    "{weather:'w_kinki_sumoto',traffic:'4',business:'',mytown:'',seiza:['Aries','2']}";

  const cookieMock = "{traffic:'4',business:'',mytown:'',seiza:['Aries','2']}";

  try {
    const obj = JSON.parse(
      cookieMock.replace(/'/g, '"').replace(/(\w+)?:/g, '"$1":')
    );
  } catch {}

  if (key === "weather" && !obj[key]) {
    return "w_default";
  }

  return obj[key];
  //obj.find(( _  ) => _[key]  )
  //weatherが存在しない場合、w_defaultを返す
  //return JSON.parse(cookieMock.replace(/'/g, '"').replace(/(\w+)?:/g, '"$1":'));
};

const getCookie = cookie_name => {
  const exp = new RegExp(cookie_name + "=(.*?)[;$]");
  //const cookie_value = document.cookie.match(exp);
  const cookie_value = document.cookie.match(exp);
  return cookie_value ? cookie_value[1] : "";
};

//console.log("getCookie", getCookie("utilityData"));
//console.log("getCookie", getCookie("WWW_SESS"));

console.log("getUtilityDataCookie", getUtilityDataCookie("weather"));
