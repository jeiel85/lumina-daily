@echo off
set ANDROID_HOME=C:\Users\jeiel\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
call D:\Project\lumina-daily\android\gradlew.bat -p D:\Project\lumina-daily\android assembleDebug
if %errorlevel% neq 0 (
  echo BUILD_FAILED
  exit /b 1
)
echo BUILD_SUCCESS
set ADB=%ANDROID_HOME%\platform-tools\adb.exe
"%ADB%" install -r "D:\Project\lumina-daily\android\app\build\outputs\apk\debug\app-debug.apk"
echo INSTALL_DONE
"%ADB%" shell monkey -p com.jeiel85.luminadaily -c android.intent.category.LAUNCHER 1
echo APP_LAUNCHED
