import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'D:/다운로드_Downloads/Lumina.jpg';
const ANDROID_BASE = 'D:/Project/lumina-daily/android/app/src/main/res';

const SIZES = [
  { dir: 'mipmap-mdpi',    size: 48  },
  { dir: 'mipmap-hdpi',    size: 72  },
  { dir: 'mipmap-xhdpi',   size: 96  },
  { dir: 'mipmap-xxhdpi',  size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

for (const { dir, size } of SIZES) {
  const outDir = join(ANDROID_BASE, dir);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  for (const name of ['ic_launcher.png', 'ic_launcher_round.png']) {
    await sharp(SRC)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(join(outDir, name));
    console.log(`✓ ${dir}/${name} (${size}x${size})`);
  }
}

// Play Store 아이콘 512x512
await sharp(SRC)
  .resize(512, 512, { fit: 'cover' })
  .png()
  .toFile('D:/Project/lumina-daily/lumina-icon-512.png');
console.log('✓ lumina-icon-512.png (Play Store용)');

// public 폴더용 favicon
await sharp(SRC)
  .resize(192, 192, { fit: 'cover' })
  .png()
  .toFile('D:/Project/lumina-daily/public/icon-192.png');
console.log('✓ public/icon-192.png');

await sharp(SRC)
  .resize(512, 512, { fit: 'cover' })
  .png()
  .toFile('D:/Project/lumina-daily/public/icon-512.png');
console.log('✓ public/icon-512.png');

console.log('\n🎉 모든 아이콘 생성 완료!');
