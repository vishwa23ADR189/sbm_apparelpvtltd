const fs = require('fs');

// Read file and remove BOM if present
const files = [
  'src/components/admin/AddProduct.jsx',
  'src/pages/CartTemp.jsx',
  'src/pages/Login.jsx'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Remove BOM if present
  const cleaned = content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
  fs.writeFileSync(file, cleaned, 'utf8');
  console.log('BOM removed from: ' + file);
});
