const express = require("express");
const app = express();

const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

// Ensure log directory exists
const logDir = '/app/logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logStream = fs.createWriteStream(path.join(logDir, 'output.log'), { flags: 'a' });

console.log = function (msg) {
  logStream.write(`[LOG] ${msg}\n`);
  process.stdout.write(`[LOG] ${msg}\n`);
};

console.error = function (msg) {
  logStream.write(`[ERROR] ${msg}\n`);
  process.stderr.write(`[ERROR] ${msg}\n`);
};

console.log("App started  pipeline");

app.get("/", (req, res) =>
{
console.log("Home route accessed"),
 res.send("Hello from Github Action!")
});

app.listen(port, () => console.log(`App running on port ${port}`));

