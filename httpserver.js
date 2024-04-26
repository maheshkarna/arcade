const path = require("path");
const express = require("express");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
const CryptoJS = require('crypto-js');
var sp = "";
const sqlite3 = require('sqlite3').verbose();
const dbPath = "C:/Users/mahes/AppData/Roaming/application/databases/http_localhost_8686/1";

let httpserver = {
  root: path.join(__dirname, "./www/"),
  port: 8686,
  host: "0.0.0.0",
  exObj: express(),
  intialize: () => {
    httpserver.exObj.use(express.static(httpserver.root));

    httpserver.exObj.get("/getGameCost", function (request, response) {
    response.setHeader("Content-Type", "application/x-www-form-urlencoded");
    response.setHeader("Access-Control-Allow-Origin", "*"); 
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
      
    const dataToSend = request.query; // Assuming the data to send is provided in the request body
    // let uid = dataToSend.UID;
    let gid = dataToSend.GID;
    let action = dataToSend.ACTION;
    let statusObj = {};
    
    let sqlLitedb = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error connecting to database");
          return;
        }
    });
    
    if(action == "GET_GAME_COST"){
        sqlLitedb.serialize(() => {
          sqlLitedb.all(`SELECT * FROM tbl_gameinfo where gameId ='${gid}'`, (err, rows) => {
              if (err) 
              {
                console.error(err.message);
                response.status(500).send("Error executing query");
                return;
              }
              if(rows.length > 0){

                if(rows[0].status == 1){
                  statusObj.message  = "Tap Your Card To Play";
                }else{
                  statusObj.message  = "Game Is Inactive";
                }

                statusObj.gameCost = rows[0].cost;
                statusObj.status  = rows[0].status;
                
              }else{
                statusObj.gameCost = 0;
                statusObj.status  = 0;
                statusObj.message  = "Invalid Scanner";
              } 
              response.json(statusObj);
          });
        });
      }else{
        response.send('Invalid Action');
      }
    }); 


    // ========== Game Start API ========== //
    httpserver.exObj.get("/gameStart", function (request, response) {
      response.setHeader("Content-Type", "application/json");
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
  
      const dataToSend = request.query;
      const uid = dataToSend.UID;
      const gid = dataToSend.GID;
      const action = dataToSend.ACTION;
      let startGameObj = {};

      let sqlLitedb = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
          if (err) {
              console.error(err.message);
              response.status(500).send("Error connecting to database");
              return;
          }
      });
  
      if (action == "START_GAME") {

        // Checking Valid Card or Not ....
        let tbl_points_qry = `SELECT * FROM tbl_points where UID ='${uid}'`
        //console.log(uid);
          sqlLitedb.all(tbl_points_qry, (err, rows) => {
              if (err) {
                  console.error(err.message);
                  response.status(500).send("Error executing query");
                  return;
              }
              if (rows.length > 0) {
                  managePoints(rows);
              } else {
                  // console.log('Invalid Card');
                  response.json({ status: 0, message: 'Invalid Card' });
                  return;
              }
          });
  

        // Checking Valid Credit Points or Not ....

          function managePoints(valobj) {
              const totalpoints = valobj[0].totalPoints_balance;
              const totalGames = valobj[0].totalGames;
              const totalPoints_spent = valobj[0].totalPoints_spent;
              const today = new Date().toISOString().split('T')[0];
  
              sqlLitedb.all(`SELECT * FROM tbl_gameinfo where gameId ='${gid}'`, (err, rows) => {
                  if (err) {
                      console.error(err.message);
                      response.status(500).send("Error executing query");
                      return;
                  }
                  if (rows.length > 0) {

                    if(rows[0].status == 0){
                      response.json({ status: 0, message: 'Game is Inactive' });
                      return;
                    }else{
                      
                      const gameCost = rows[0].cost;
                      const gameType = rows[0].GameType;
                      const gamePeriod = rows[0].gamePeriod;
                      const remainingPoints = totalpoints - gameCost;
                      const playedGames = totalGames + 1;
                      const spentPoints = totalPoints_spent + gameCost;
  
                      if (remainingPoints < 0) {
                        response.send({ status: 0, message: 'Poor Credits' });
                        return;
                      }else {
                        sqlLitedb.run(`UPDATE tbl_points SET totalPoints_balance = ${remainingPoints}, totalGames = ${playedGames}, totalPoints_spent = ${spentPoints} where UID = '${uid}' `, (err) => {
                          if (err) {
                              console.error(err.message);
                              response.status(500).send("Error updating points");
                              return;
                          }  

                          sqlLitedb.run(`INSERT INTO tbl_playergamedetails (UID, gameId, gameStartDate,gamePoints) VALUES ('${uid}', '${gid}', '${today}',0)`, (err) => {
                          if (err) {
                              console.error(err.message);
                              response.status(500).send("Error inserting game details");
                              return;
                          }
                                    // console.log(`tbl_playergamedetails Rows Inserted`);
                                    startGameObj.gameTime = gamePeriod;
                                    startGameObj.gameType = gameType;
                                    startGameObj.balanceCredits = remainingPoints;
                                    startGameObj.playedGames = playedGames;
                                    startGameObj.spentPoints = spentPoints;
                                    startGameObj.status = 1;
                                    startGameObj.message = 'Scanned Successfully Ready To Play';
                                    response.json(startGameObj);
                                });
                          });
                      }
                    }
                  } else {
                      response.send({ status: 0, message: 'Invalid Game'});
                      return;
                  }
              });
          }
      }
  });
  


  // Encoding of registration key
  httpserver.exObj.get("/encryptString", function (request, response){
    const plaintext = request.query.regKey;
    const secretKey = request.query.skey;
    const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    console.log(ciphertext);
    response.send(ciphertext);
  });


    // Decoding of registration key
    httpserver.exObj.get("/decryptString", function (request, response){
      const ciphertext = request.query.encregkey;
      const secretKey = request.query.skey;
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      console.log(plaintext);
      response.send(plaintext);
    });

 // Read Serial Ports 
 httpserver.exObj.get("/readPort", function (request, response) {
  serialport.SerialPort.list().then(
    (ports) => {
      // console.log(ports);
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(ports));
    },
    (err) => {
      // console.log(err);
      response.statusCode = 500;
      response.end('Error occurred');
    }
  );
});

   // Serial port connection
httpserver.exObj.get("/SPconnection", function (request, response) {
response.setHeader("Content-Type", "text/event-stream");
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Connection", "keep-alive");
const path = request.query.path;
const baudRate = parseInt(request.query.baudRate);
   sp = new SerialPort({
      path: path,
      baudRate: baudRate,
  });

  // console.log(path,baudRate);
  sp.on("open", showPortOpen);
  sp.on("error", showError);
  sp.on("data", readSerialData);

  function showPortOpen() {
      console.log("Serial port is open");
  }

  let accumulatedData = "";
  function readSerialData(data) {
      // Log received data
      // Accumulate received data
      accumulatedData += data.toString("utf8");
      // Process accumulated data for complete messages
      let newlineIndex;
      while ((newlineIndex = accumulatedData.indexOf("\n")) !== -1) {
          const completeMessage = accumulatedData.slice(0, newlineIndex);
          response.write("data: " + completeMessage + "\n\n");
          // Remove processed message from accumulated data
          accumulatedData = accumulatedData.slice(newlineIndex + 1);
      }
  }
  function showError(error) {
      console.error("Serial port error:", error);
  }
});


       
    // Serial port connection
    httpserver.exObj.get("/closePort", function (request, response) {
      if (sp != "") {
        sp.close((err) => {
          if (err) {
            console.error("Error closing serial port:", err);
            response.status(500).send("Error closing serial port");
          } else {
            sp = "";
            console.log("Serial port closed successfully");
            response.send("Serial port closed successfully");
          }
        });
      } else {
        console.log("No serial port is open");
        response.send("No serial port is open");
      }
    });

    httpserver.exObj.listen(httpserver.port, httpserver.host, () => {
    console.log(`HTTP server running at http://${httpserver.host}:${httpserver.port}/`);
    });
  },
};
module.exports = { httpserver };
