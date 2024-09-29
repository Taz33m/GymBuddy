const fs = require('fs');
const path = require('path');

function removeSocketsAndSymlinks(dir) {
  try {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fullPath.includes('Library/Caches')) return; // Skip system cache directories
      const stat = fs.lstatSync(fullPath);

      if (stat.isDirectory() && !stat.isSymbolicLink()) {
        removeSocketsAndSymlinks(fullPath);
      } else if (stat.isSocket() || stat.isSymbolicLink()) {
        fs.unlinkSync(fullPath);
        console.log(`Removed: ${fullPath}`);
      }
    });
  } catch (error) {
    console.log(`Error processing ${dir}: ${error.message}`);
  }
}

removeSocketsAndSymlinks('.');
