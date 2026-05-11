import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './src/assets/LogoPartner';
const files = ['antam.png', 'bni.png', 'ekis.png', 'lps.png', 'paragon.png', 'sariroti.png', 'telkom.jpg'];

async function convert() {
  for (const file of files) {
    const inputPath = path.join(directory, file);
    const outputPath = path.join(directory, file.split('.')[0] + '.webp');
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${file} to WebP`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

convert();
