HANDOFF CONTEXT
===============

Current branch: main
Latest release tag: v1.2.8
Latest version commit on main: afa76b4 chore: bump version to 1.2.8 (versionCode 18)

What was pushed in this round
-----------------------------
- Tablet layout handling in src/App.tsx was adjusted so tablet-width viewports can use the wider two-column layout more reliably.
- .firebase/hosting.ZG9jcw.cache was updated to reflect the current generated hosting output metadata.
- android/app/google-services.json only had a trailing newline normalization change.
- This handoff file was added so another PC can resume without session context.

What was intentionally NOT pushed
---------------------------------
- .claude/settings.local.json
  - This file contains machine-specific local permission settings with a Windows absolute path.
  - It is not suitable for cross-device sync and should stay local.

Validation already completed
----------------------------
- npm ci
- npm run lint
- npm run build
- Tag workflow for v1.2.8 succeeded on GitHub Actions

Repository-specific cautions
----------------------------
- GitHub Pages serves docs/ only. Do not switch Pages to Actions mode.
- React app is bundled into dist/ for Capacitor Android, not served from Pages.
- For releases, package.json version and android/app/build.gradle versionName/versionCode must stay aligned.

Start on another PC
-------------------
1. git clone https://github.com/jeiel85/lumina-daily.git
2. cd lumina-daily
3. git checkout main
4. git pull origin main
5. npm ci
6. Create .env in the repo root with the Firebase and Gemini keys described in AGENTS.md
7. npm run dev

If Android work is needed
-------------------------
- Ensure Android SDK and Java 21 are installed.
- Keep capacitor.config.ts webDir as dist.
- Run npm run build
- Run npx cap sync android

Immediate next checks
---------------------
- Confirm your local .env exists before running the app.
- If you plan a new release, verify package.json and android/app/build.gradle versions before tagging.
- If GitHub Actions warnings are addressed next, update deprecated Node 20-based actions and CodeQL v3 references in .github/workflows/deploy.yml.
