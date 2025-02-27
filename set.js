const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkV3MkZqWUpWUS9NR3UzSmgzUElBTUprbVJPUVNCcE9GMHV2RWs1SlVIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRDB0QWJ1dDhER3YwOVhlcUwwVDFKVzAvT3BzTkZmTlpweEVmYjlYeUowVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRnk4OHpuZWVsMWZXOUxKQ0lNTVdtS1c4OXF4eG9GVGlVWFk4WHNpZ1VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxNlpkdnNHaEZhRnlpZjBKcHhMMnBJTHJHNlV1YkU0S1ZQc0o3VkhKR3kwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPMXAyaFYvMnFrc0Z4c2pra0V6MkZzZkZrMUtrMHZITUtnVWVZN2R5MUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJIM0FRVmltR2dvYjlwRnV0U3R6OUs3bnZya00ydHRva2NHd0cvZW9Zekk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0tORkhiYUU0V3lTckcvZ2prMm9kNk1TNHBvTTJNUmp1eFlVMjNHUmZHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN014V2NWYkx2V0hOQldZdFUxT2JKV21ObkplNm9aT3RPMDM2QjdoYzFXTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit3NWZ0anJ0R3YySGpYUVd3RktrV01ENHNITjNKMFl5dGxYZ0tZbUxjY2dlQlE2UWpMV1hlTTVnVm5xOUJhemo3V3FnQ2pzWGFCMEJNOVFJdWx2MkR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJya3NraDRjQkRmZXpQaTBDUmdxY1phTlBJdWtXNkFqcWpLcWJPR09oQUY4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyRzJmQ0s5MlRuVzIyTktLZ1dYSTV3IiwicGhvbmVJZCI6ImRlNGRkMjA4LTdmYjEtNGI4Yi04OWI5LWQzYTdmYzM1NDFjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXa3pzNlUzazA1cGpSVVlUcFBoTVo3RjdVQmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDdkbnI0OFZKWXhpTWRLaHpSTHRiWm5CNWxNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkgzTERSS0xNIiwibWUiOnsiaWQiOiIyMzQ5MTE3MDI3MTMwOjMxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMcTR5c0lIRUtQTmdMNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlY0JFNGNXOXpLVUpsV0o2L01DZjFvaHByQ3JKYVpHSklQdTBlNENnZWc0PSIsImFjY291bnRTaWduYXR1cmUiOiJWN3pPS3d0ZjRmaSs2YVpWNTUwaW9CTFlTZlZWWExCYzExdUt0S2lyalhBZloyRmJSZTVicE4zd1N0NkVOVW55MXJES3B5ZW8xZVgzOXZSclZidnVEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVlhuc2FEYStPY0ZKQzA0SUwxdEJyV2UveUhwbGkrQmRnUlk1VFhMaUMyeFNHYUNiL0pScHN6Rkd1ejhPM0cvdFc2b3oycHkyZkJVMW10cjMyQjlJRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTE3MDI3MTMwOjMxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhuQVJPSEZ2Y3lsQ1pWaWV2ekFuOWFJYWF3cXlXbVJpU0Q3dEh1QW9Ib08ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDA2NDYwNjV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255784766591",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
