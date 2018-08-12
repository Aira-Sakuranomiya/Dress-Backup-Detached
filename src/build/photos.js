const fs = require('fs');
const path = require('path');
const photos = require('../commits.json');
const result = [];

const types = ['.png', '.jpg', '.gif', '.webp', '.bmp', '.svg'];

for (const commit of photos) {
  // 去除没有文件的提交
  if (!commit.files) {
    continue;
  }

  const files = [];
  for (const file of commit.files) {
    // 去除不是图片的文件和不存在了的文件
    if (types.includes(path.extname(file)) && fs.existsSync(path.join('Dress', file))) {
      files.push(file);
    }
  }

  if (!files.length) {
    continue;
  }
  commit.files = files;
  result.push(commit);
}
fs.writeFileSync('data/photos.json', JSON.stringify(result));
