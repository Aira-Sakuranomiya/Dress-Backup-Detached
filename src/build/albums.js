const fs = require('fs');
const path = require('path');
const types = ['.png', '.jpg'];

const result = [];
for (const filename of fs.readdirSync('Dress')) {
  if (filename.startsWith('.')) {
    continue;
  }
  const file = path.join('Dress', filename);
  if (fs.statSync(file).isDirectory()) {
    const readme = path.join(file, 'README.md');
    const album = {
      name: filename,
      readme: fs.existsSync(readme) && fs.readFileSync(readme, { encoding: 'utf-8' }),
      files: fs.readdirSync(file).filter(file => types.includes(path.extname(file).toLowerCase()))
    };
    if (!album.files.length) {
      continue;
    }
    result.push(album);
  }
}
fs.writeFileSync('data/albums.json', JSON.stringify(result));
