import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const HAPTIC_PREF_KEY = 'hapticEnabled';

// 사용자 설정 확인 — 기본값 true (한 번도 설정한 적 없으면 켜짐)
function isHapticEnabled(): boolean {
  try {
    return localStorage.getItem(HAPTIC_PREF_KEY) !== 'false';
  } catch {
    return true;
  }
}

// App.tsx 의 settings 변경 시 동기화 호출용
export function setHapticEnabled(enabled: boolean) {
  try {
    localStorage.setItem(HAPTIC_PREF_KEY, enabled ? 'true' : 'false');
  } catch {
    // localStorage 불가 환경 (sandbox 등) — 무시
  }
}

export async function hapticLight() {
  if (!Capacitor.isNativePlatform()) return;
  if (!isHapticEnabled()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Haptics not available
  }
}

export async function hapticMedium() {
  if (!Capacitor.isNativePlatform()) return;
  if (!isHapticEnabled()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    // Haptics not available
  }
}

export async function hapticHeavy() {
  if (!Capacitor.isNativePlatform()) return;
  if (!isHapticEnabled()) return;
  try {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch {
    // Haptics not available
  }
}
