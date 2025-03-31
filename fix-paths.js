const fs = require("fs");
const path = require("path");

// Directories to look for HTML files
const directories = [path.join(__dirname, ".vercel", "output", "static")];

// Function to walk through directories recursively
function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recursively walk through subdirectories
      results = results.concat(walkDir(filePath));
    } else {
      // Add HTML files to results
      if (path.extname(file).toLowerCase() === ".html") {
        results.push(filePath);
      }
    }
  });

  return results;
}

// Function to fix paths in HTML files
function fixHtmlPaths(htmlFile) {
  console.log(`Processing: ${htmlFile}`);

  // Read the HTML file
  let html = fs.readFileSync(htmlFile, "utf8");

  // Fix relative paths for CSS and JS files
  html = html.replace(
    /href=["'](?!http|\/|#|mailto:|tel:)(.*?)["']/g,
    'href="/$1"'
  );
  html = html.replace(/src=["'](?!http|\/|#|data:)(.*?)["']/g, 'src="/$1"');

  // Write back the modified HTML
  fs.writeFileSync(htmlFile, html);
  console.log(`Fixed paths in: ${htmlFile}`);
}

// Process all directories
directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Searching for HTML files in: ${dir}`);
    const htmlFiles = walkDir(dir);
    console.log(`Found ${htmlFiles.length} HTML files`);

    htmlFiles.forEach(fixHtmlPaths);
  } else {
    console.log(`Directory does not exist: ${dir}`);
  }
});

console.log("Path fixing completed successfully.");
