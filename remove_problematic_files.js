const fs = require('fs');
const path = require('path');

function removeProblematicFiles(dir) {
  try {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.lstatSync(fullPath);

      if (stat.isDirectory() && !stat.isSymbolicLink()) {
        removeProblematicFiles(fullPath);
      } else if (stat.isSocket() || (stat.isSymbolicLink() && fullPath.includes('com.microsoft.teams2'))) {
        fs.unlinkSync(fullPath);
        console.log(`Removed: ${fullPath}`);
      }
    });
  } catch (error) {
    console.log(`Error processing ${dir}: ${error.message}`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const platformIndex = args.indexOf('--platform');
const platform = platformIndex !== -1 ? args[platformIndex + 1] : null;

console.log(`Running for platform: ${platform || 'not specified'}`);

removeProblematicFiles(process.env.HOME);

console.log('Finished removing problematic files.');
