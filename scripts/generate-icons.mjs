import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'D:/다운로드_Downloads/Lumina.jpg';
const ANDROID_BASE = 'D:/Project/lumina-daily/android/app/src/main/res';

// ic_launcher.png 사이즈
const SIZES = [
  { dir: 'mipmap-mdpi',    size: 48,  fgSize: 108 },
  { dir: 'mipmap-hdpi',    size: 72,  fgSize: 162 },
  { dir: 'mipmap-xhdpi',   size: 96,  fgSize: 216 },
  { dir: 'mipmap-xxhdpi',  size: 144, fgSize: 324 },
  { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
];

for (const { dir, size, fgSize } of SIZES) {
  const outDir = join(ANDROID_BASE, dir);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  // ic_launcher.png & ic_launcher_round.png (일반 아이콘)
  for (const name of ['ic_launcher.png', 'ic_launcher_round.png']) {
    await sharp(SRC)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(join(outDir, name));
    console.log(`✓ ${dir}/${name} (${size}x${size})`);
  }

  // ic_launcher_foreground.png (적응형 아이콘 foreground)
  // 108dp 캔버스 중앙에 72dp 크기(66%)로 아이콘 배치 → 투명 배경
  const iconInFg = Math.round(fgSize * 0.66);
  const padding = Math.round((fgSize - iconInFg) / 2);
  const resizedIcon = await sharp(SRC)
    .resize(iconInFg, iconInFg, { fit: 'cover' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: fgSize,
      height: fgSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resizedIcon, left: padding, top: padding }])
    .png()
    .toFile(join(outDir, 'ic_launcher_foreground.png'));
  console.log(`✓ ${dir}/ic_launcher_foreground.png (${fgSize}x${fgSize})`);
}

// Play Store 아이콘 512x512
await sharp(SRC)
  .resize(512, 512, { fit: 'cover' })
  .png()
  .toFile('D:/Project/lumina-daily/lumina-icon-512.png');
console.log('✓ lumina-icon-512.png (Play Store용)');

// public 폴더용
await sharp(SRC).resize(192, 192).png().toFile('D:/Project/lumina-daily/public/icon-192.png');
await sharp(SRC).resize(512, 512).png().toFile('D:/Project/lumina-daily/public/icon-512.png');
console.log('✓ public/icon-192.png, public/icon-512.png');

console.log('\n🎉 모든 아이콘 생성 완료!');
