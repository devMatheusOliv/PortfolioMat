const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Execute Next.js build
console.log("Building Next.js application...");
execSync("next build", { stdio: "inherit" });

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, ".vercel", "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create static directory if it doesn't exist
const staticDir = path.join(outputDir, "static");
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy .next directory to output/static
console.log("Copying build output to .vercel/output/static...");
execSync(`cp -r .next/* ${staticDir}/`, { stdio: "inherit" });

// Create config file
const configPath = path.join(outputDir, "config.json");
const config = {
  version: 3,
  routes: [
    {
      handle: "filesystem",
    },
    {
      src: "/(.*)",
      dest: "/$1",
    },
  ],
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("Static export completed successfully.");
