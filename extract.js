const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\veera\\.gemini\\antigravity\\brain\\648d54f7-a229-40de-ab60-77cf047a7acf\\.system_generated\\steps\\4\\content.md', 'utf-8');

const regex = /<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<h2[^>]*>([^<]+)<\/h2>[\s\S]*?<h2[^>]*>([^<]+)<\/h2>[\s\S]*?<a[^>]*href="([^"]+)"/g;

let match;
const results = [];
while ((match = regex.exec(content)) !== null) {
  const image = match[1];
  const name = match[2].trim();
  const address = match[3].trim();
  const mapUrl = match[4];

  if (name.toLowerCase().includes('hyundai')) {
    results.push({ name, address, mapUrl, image });
  }
}

console.log(JSON.stringify(results, null, 2));
