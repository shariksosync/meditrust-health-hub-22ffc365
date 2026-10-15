const fs = require('fs');
const html = fs.readFileSync('cancer_care_body.html', 'utf8');

const regex = /(?:src|href|url)\s*[:=(]\s*['"]?([^'")\s>]+)/gi;
let m;
const set = new Set();
while ((m = regex.exec(html)) !== null) {
  if (m[1].startsWith('http') || m[1].endsWith('.png') || m[1].endsWith('.svg') || m[1].endsWith('.jpg') || m[1].endsWith('.jpeg')) {
    set.add(m[1]);
  }
}
console.log('Found assets count:', set.size);
Array.from(set).forEach(x => console.log(x));
