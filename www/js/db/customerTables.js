let todolist =
  "CREATE TABLE IF NOT EXISTS todolist \
              ( \
                  ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
                  TASKNAME                   TEXT NOT NULL \
              )";

  let table_gameinfo = `
    CREATE TABLE IF NOT EXISTS tbl_gameinfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gameName TEXT NOT NULL,
    gameId VARCHAR(20) NOT NULL,
    cost INTEGER NOT NULL,
    GameType VARCHAR(20) NOT NULL,
    gamePeriod INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 1
    )`;


let tbl_plannames = `
CREATE TABLE IF NOT EXISTS tbl_plannames (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  planId TEXT NOT NULL,
  recharge_points INTEGER NOT NULL DEFAULT 0,
  new_card_bonus INTEGER NOT NULL DEFAULT 0,
  recharge_bonus INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );`;


let tbl_playergamedetails = `
CREATE TABLE IF NOT EXISTS tbl_playergamedetails (
id INTEGER PRIMARY KEY AUTOINCREMENT,
UID VARCHAR(20) NOT NULL,
gameId INTEGER NOT NULL,
gameStartDate DATE NOT NULL,
gamePoints INTEGER NOT NULL,
gameStartTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
gameEndTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;



let tbl_ports = `
CREATE TABLE IF NOT EXISTS tbl_ports (
id INTEGER PRIMARY KEY AUTOINCREMENT,
port VARCHAR(20) NOT NULL,
baudrate INTEGER NOT NULL
);`;

let tbl_points = `CREATE TABLE IF NOT EXISTS tbl_points (
id INTEGER PRIMARY KEY AUTOINCREMENT,
UID VARCHAR(20) NOT NULL,
totalRecharges INTEGER NOT NULL DEFAULT 0,
totalPoints INTEGER NOT NULL DEFAULT 0,
totalGames INTEGER NOT NULL DEFAULT 0,
totalPoints_spent INTEGER NOT NULL DEFAULT 0,
totalPoints_balance INTEGER NOT NULL DEFAULT 0
);`;


let tbl_recharge = `CREATE TABLE IF NOT EXISTS tbl_recharge (
id INTEGER PRIMARY KEY AUTOINCREMENT,
UID VARCHAR(30),
planId VARCHAR(30),
rechargeType VARCHAR(30),
rechargeDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;


let tbl_rechargetypes = `CREATE TABLE IF NOT EXISTS tbl_rechargetypes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
rechargeName VARCHAR(20) NOT NULL
);`;

let tbl_register = `CREATE TABLE IF NOT EXISTS tbl_register (
id INTEGER PRIMARY KEY AUTOINCREMENT,
candName TEXT,
contactNo TEXT,
email TEXT,
UID VARCHAR(30) NOT NULL,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
createdBy INTEGER NOT NULL
);`;
