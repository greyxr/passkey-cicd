console.log("Running")
const fs = require('fs') // from "fs";
const path = require("path") // import path from "path";

const phrases = ["promotion", "security", "authorization"];
const ignoredDirs = ["node_modules", ".git", ".github"];
const results = { PROMOTION: [], SECURITY: [], AUTHORIZATION: [] };

// Recursive directory scan
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !ignoredDirs.includes(entry.name)) {
        console.log("Entering directory " + full)
      walk(full);
    } else if (/\.(js|ts|jsx|tsx|mjs|cjs)$/.test(entry.name)) {
      const lines = fs.readFileSync(full, "utf8").split("\n");
      lines.forEach((line, i) => {
        phrases.forEach(p => {
          if (line.toLowerCase().includes(p)) {
            // for now, put everything under PROMOTION
            results.PROMOTION.push(`${full}:${i + 1}: ${line.trim()}`);
          }
        });
      });
    }
  }
}

walk(".");

let html = `<html><body>`;
for (const section of ["PROMOTION", "SECURITY", "AUTHORIZATION"]) {
  html += `<h2>${section}</h2><ul>`;
  results[section].forEach(line => {
    html += `<li><code>${line}</code></li>`;
  });
  html += `</ul>`;
}
html += `</body></html>`;

fs.writeFileSync("report.html", html);