const fs = require('fs');
const path = require('path');

const files = [
  'src/components/admin/AddProduct.jsx',
  'src/pages/CartTemp.jsx',
  'src/pages/Login.jsx'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed BOM: ' + f);
  } catch (err) {
    console.error('Error fixing ' + f + ':', err.message);
  }
});
