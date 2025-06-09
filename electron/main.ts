import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import isDev from "electron-is-dev";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    backgroundColor: "#ffffff",
  });

  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handlers for GitHub API
ipcMain.handle("github:search", async (_, query: string) => {
  // Implement GitHub API search
  return { items: [] };
});

ipcMain.handle("github:get-repo", async (_, owner: string, repo: string) => {
  // Implement GitHub API repo fetch
  return {};
});

ipcMain.handle("github:get-issues", async (_, owner: string, repo: string) => {
  // Implement GitHub API issues fetch
  return [];
});

ipcMain.handle("github:get-pulls", async (_, owner: string, repo: string) => {
  // Implement GitHub API pull requests fetch
  return [];
});
