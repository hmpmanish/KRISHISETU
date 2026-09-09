const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(from)) return;
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

// Ensure dist exists
if (!fs.existsSync('dist')) fs.mkdirSync('dist');

// Copy files
if (fs.existsSync('index.html')) fs.copyFileSync('index.html', 'dist/index.html');
copyFolderSync('css', 'dist/css');
copyFolderSync('js', 'dist/js');
copyFolderSync('assets', 'dist/assets');

console.log('Build completed. Files copied to dist/.');
