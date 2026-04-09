import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SRC = 'lumina-icon-512.png';
const RES = 'android/app/src/main/res';

// 알림 아이콘 사이즈 (mdpi 기준 24dp)
const sizes = [
  { folder: 'drawable-mdpi',    size: 24  },
  { folder: 'drawable-hdpi',    size: 36  },
  { folder: 'drawable-xhdpi',   size: 48  },
  { folder: 'drawable-xxhdpi',  size: 72  },
  { folder: 'drawable-xxxhdpi', size: 96  },
];

for (const { folder, size } of sizes) {
  const dir = join(RES, folder);
  mkdirSync(dir, { recursive: true });
  const out = join(dir, 'ic_stat_notification.png');

  // 원본 이미지를 알파 채널 마스크로 변환 → 흰색 실루엣
  await sharp(SRC)
    .resize(size, size)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { width, height, channels } = info;
      const pixels = new Uint8Array(data);
      for (let i = 0; i < width * height; i++) {
        const alpha = pixels[i * channels + 3];
        pixels[i * channels + 0] = 255; // R
        pixels[i * channels + 1] = 255; // G
        pixels[i * channels + 2] = 255; // B
        pixels[i * channels + 3] = alpha; // A 유지
      }
      return sharp(Buffer.from(pixels), {
        raw: { width, height, channels }
      }).png().toFile(out);
    });

  console.log(`생성: ${out} (${size}x${size})`);
}

console.log('완료!');
