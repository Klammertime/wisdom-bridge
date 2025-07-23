const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// You'll need to install sharp: npm install --save-dev sharp

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const iconsDir = path.join(publicDir, 'icons');
  
  // Create icons directory if it doesn't exist
  await fs.mkdir(iconsDir, { recursive: true });
  
  // Create a simple default icon (you should replace this with your actual logo)
  const svg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#3B82F6" rx="64"/>
      <text x="256" y="320" font-family="Arial, sans-serif" font-size="280" font-weight="bold" text-anchor="middle" fill="white">B</text>
    </svg>
  `;
  
  // Generate icons for each size
  for (const size of sizes) {
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    
    console.log(`Generated icon-${size}x${size}.png`);
  }
  
  // Generate Apple touch icon
  await sharp(Buffer.from(svg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  
  console.log('Generated apple-touch-icon.png');
  
  // Generate favicon
  await sharp(Buffer.from(svg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error);