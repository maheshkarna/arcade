const { app, BrowserWindow } = require("electron");
const httpServerObj = require("./httpserver.js");
const path = require("path");

app.whenReady().then(() => {
  console.log(app.getPath("userData"));
  createHttpServer();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createHttpServer();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function createHttpServer() {
  console.log(httpServerObj.httpserver.intialize());
  createWindow();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // movable: false,
    // resizable: false,
    // maximizable: false,
    // minimizable: false,
    // titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win.loadFile("./www/index.html");
  win.maximize();
  win.loadURL("http://localhost:8686");
};
