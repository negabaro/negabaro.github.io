//

const getSpreadsheetId = spreadsheetUrl => {
  const r1 = RegExp("/docs.google.com\\/spreadsheets\\/d\\/(.+)\\/edit");
  if (r1.test(spreadsheetUrl)) {
    const r2 = r1.exec(spreadsheetUrl);
    console.log("r2", r2[1]);
  } else {
    console.log("spreadsheetUrl2", spreadsheetUrl);
  }

  //console.log("spreadsheetUrl", spreadsheetUrl);
  const spreadsheetId = "17QkLNIQPG8NlXtTYhrIax7IN0lZNf0JfwpoIgIgE58I";
  return spreadsheetId;
};

console.log(
  "getSpreadsheetId",
  getSpreadsheetId(
    "https://docs.google.com/spreadsheets/d/11Ei0d8unBdpk9ITGDxnkNYNnhe1Xc4Nn2IrxuNTo_NI/edit#gid=1012440402"
  )
);
