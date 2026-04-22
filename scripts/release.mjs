#!/usr/bin/env node
/**
 * 릴리즈 스크립트
 * 사용법: node scripts/release.mjs <version>
 * 예시:   node scripts/release.mjs 1.0.9
 *
 * 수행 순서:
 * 1. package.json version 업데이트
 * 2. android/app/build.gradle versionCode/versionName 업데이트
 * 3. 두 파일 버전 일치 검증
 * 4. git commit & push (main)
 * 5. git tag & push (v{version})
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] }).trim();
}

function log(msg) { console.log(`\x1b[36m→\x1b[0m ${msg}`); }
function ok(msg)  { console.log(`\x1b[32m✓\x1b[0m ${msg}`); }
function fail(msg) { console.error(`\x1b[31m✗\x1b[0m ${msg}`); process.exit(1); }

// ── 1. 인자 확인 ──────────────────────────────────────────
const newVersion = process.argv[2];
if (!newVersion || !/^\d+\.\d+\.\d+$/.test(newVersion)) {
  fail('버전을 입력해주세요. 예: node scripts/release.mjs 1.0.9');
}

// ── 2. 현재 버전 확인 ─────────────────────────────────────
const pkgPath = join(ROOT, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;
log(`현재 버전: ${currentVersion} → 새 버전: ${newVersion}`);

// ── 3. package.json 업데이트 ──────────────────────────────
pkg.version = newVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
ok(`package.json → ${newVersion}`);

// ── 4. build.gradle 업데이트 ──────────────────────────────
const gradlePath = join(ROOT, 'android/app/build.gradle');
let gradle = readFileSync(gradlePath, 'utf8');

const versionCodeMatch = gradle.match(/versionCode (\d+)/);
if (!versionCodeMatch) fail('build.gradle에서 versionCode를 찾을 수 없습니다.');
const newVersionCode = parseInt(versionCodeMatch[1]) + 1;

gradle = gradle
  .replace(/versionCode \d+/, `versionCode ${newVersionCode}`)
  .replace(/versionName "[^"]+"/, `versionName "${newVersion}"`);
writeFileSync(gradlePath, gradle);
ok(`build.gradle → versionCode ${newVersionCode}, versionName "${newVersion}"`);

// ── 5. 버전 일치 검증 ─────────────────────────────────────
const verifiedPkg = JSON.parse(readFileSync(pkgPath, 'utf8')).version;
const verifiedGradle = readFileSync(gradlePath, 'utf8').match(/versionName "([^"]+)"/)[1];

if (verifiedPkg !== newVersion) fail(`package.json 버전 불일치: ${verifiedPkg}`);
if (verifiedGradle !== newVersion) fail(`build.gradle 버전 불일치: ${verifiedGradle}`);
ok('버전 일치 검증 완료');

// ── 6. git 상태 확인 ──────────────────────────────────────
const status = run('git status --porcelain');
const changedFiles = status.split('\n').filter(Boolean).map(l => l.trim().split(' ').pop());
const unexpected = changedFiles.filter(f => !f.includes('package.json') && !f.includes('build.gradle'));
if (unexpected.length > 0) {
  fail(`커밋되지 않은 파일이 있습니다:\n${unexpected.join('\n')}\n릴리즈 전에 처리해주세요.`);
}

// ── 7. commit & push ──────────────────────────────────────
log('커밋 중...');
run('git add package.json android/app/build.gradle');
run(`git commit -m "chore: bump version ${currentVersion} → ${newVersion} (versionCode ${newVersionCode})"`);
run('git push origin main');
ok('main 브랜치 푸시 완료');

// ── 8. tag & push ─────────────────────────────────────────
const tag = `v${newVersion}`;
log(`태그 생성: ${tag}`);
run(`git tag ${tag}`);
run(`git push origin ${tag}`);
ok(`태그 푸시 완료: ${tag}`);

console.log(`\n\x1b[32m🚀 릴리즈 ${tag} 빌드가 시작됩니다!\x1b[0m`);
console.log(`   https://github.com/jeiel85/lumina-daily/actions`);
