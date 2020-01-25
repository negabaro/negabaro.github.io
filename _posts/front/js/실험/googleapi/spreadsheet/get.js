//https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get
//import google from "googleapis";
//var google = require("googleapis");
const fs = require("fs");
const readline = require("readline");

const { google } = require("googleapis");
const sheets = google.sheets("v4");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = "token.json";

fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

function listMajors(auth) {
  console.log("auth", auth);
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "17QkLNIQPG8NlXtTYhrIax7IN0lZNf0JfwpoIgIgE58I",
      range: "シート1!A1:A50000"
      //majorDimension: "ROWS"
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log("Name, Major:", rows);
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map(row => {
          console.log(`${row[0]}, ${row[4]}`);
        });
      } else {
        console.log("No data found.");
      }
    }
  );

  sheets.spreadsheets.get(
    { spreadsheetId: "11Ei0d8unBdpk9ITGDxnkNYNnhe1Xc4Nn2IrxuNTo_NI" },
    (err, res) => {
      if (err) return console.log("The API returned an error2: " + err);
      //console.log(res.data.properties.title);  //파일 titleㄱㅏ져옴
      console.log(res.data.sheets); //sheets 일람 가져옴
    }
  );

  /*
  const getSheets = async (auth, spreadsheetId) => {
    const sheets = google.sheets({version: "v4", auth});
    const result = (await sheets.spreadsheets.get({ 
      spreadsheetId 
    })).data.sheets.map((sheet) => {
      return sheet.properties.title
    })
    return result
  }
*/
}

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/*
authorize(function(authClient) {
  var request = {
    // The spreadsheet to request.
    //spreadsheetId: "my-spreadsheet-id", // TODO: Update placeholder value.
    spreadsheetId: "17QkLNIQPG8NlXtTYhrIax7IN0lZNf0JfwpoIgIgE58I",
    // The ranges to retrieve from the spreadsheet.
    ranges: [], // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false, // TODO: Update placeholder value.

    auth: authClient
  };

  sheets.spreadsheets.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});

function authorize(callback) {
  // TODO: Change placeholder below to generate authentication credentials. See
  // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
  //
  // Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var authClient = null;

  if (authClient == null) {
    console.log("authentication failed");
    return;
  }
  callback(authClient);
}
*/
