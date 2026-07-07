const fs = require('fs');

let content = fs.readFileSync('c:/Users/veera/Hyundai Website/lib/data.ts', 'utf-8');

const newLocations = fs.readFileSync('c:/Users/veera/Hyundai Website/newLocations.ts', 'utf-8');

// Replace locations array
content = content.replace(/export const locations: Location\[\] = \[[\s\S]*?\];/, newLocations.trim());

// Update cityOptions
content = content.replace(/export const cityOptions = \[.*?\];/, 'export const cityOptions = ["Mumbai", "Thane", "Vasai", "Virar", "Wada"];');

fs.writeFileSync('c:/Users/veera/Hyundai Website/lib/data.ts', content);
console.log('Successfully updated lib/data.ts');
