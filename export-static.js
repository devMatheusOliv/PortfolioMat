const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { copyFileSync, mkdirSync } = fs;

// Função auxiliar para copiar pastas recursivamente
function copyFolderRecursiveSync(source, target) {
  // Verifica se a pasta de destino existe, se não, cria
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Lê os arquivos da pasta de origem
  const files = fs.readdirSync(source);

  // Copia cada arquivo/pasta
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    // Se for uma pasta, copia recursivamente
    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderRecursiveSync(sourcePath, targetPath);
    } else {
      // Se for um arquivo, copia diretamente
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

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

// Copy .next directory to output/static using recursive function
console.log("Copying build output to .vercel/output/static...");
if (fs.existsSync(".next")) {
  copyFolderRecursiveSync(".next", staticDir);
}

// Copy public directory contents to output/static
console.log("Copying public directory to .vercel/output/static...");
if (fs.existsSync("public")) {
  copyFolderRecursiveSync("public", staticDir);
}

// Also copy css, js, and images directories directly to root if they exist
const staticContentDirs = ["css", "js", "images"];
staticContentDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Copying ${dir} directory to .vercel/output/static/...`);
    const targetDir = path.join(staticDir, dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    copyFolderRecursiveSync(dir, targetDir);
  }
});

// Create config file
const configPath = path.join(outputDir, "config.json");
const config = {
  version: 3,
  routes: [
    {
      handle: "filesystem",
    },
    {
      src: "/(css|js|images)/(.*)",
      dest: "/$1/$2",
    },
    {
      src: "/(.*)",
      dest: "/$1",
    },
  ],
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log("Static export completed successfully.");
