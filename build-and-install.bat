@echo off
setlocal EnableDelayedExpansion
echo.
echo ========================================
echo   Lumina Daily Build ^& Install
echo ========================================
echo.

cd /d D:\Project\lumina-daily

set ADB="C:\Users\jeiel\AppData\Local\Android\Sdk\platform-tools\adb.exe"
set FALLBACK_DEVICE=R3CWC0KB53Z
set TARGET_DEVICE=

:: Check adb exists
if not exist "C:\Users\jeiel\AppData\Local\Android\Sdk\platform-tools\adb.exe" (
    echo ERROR: adb.exe not found at the specified path.
    echo Please check Android SDK installation.
    pause & exit /b 1
)

:: ----------------------------------------------------------------
:: Auto-detect Galaxy S24 (SM-S92x series)
:: Falls back to hardcoded ID if auto-detect fails
:: ----------------------------------------------------------------
echo [0/5] Detecting Galaxy S24 (SM-S92x)...

for /f "skip=1 tokens=1,2" %%A in ('%ADB% devices') do (
    if "%%B"=="device" (
        for /f "usebackq delims=" %%M in (`%ADB% -s %%A shell getprop ro.product.model 2^>nul`) do (
            set MODEL_NAME=%%M
            echo !MODEL_NAME! | findstr /i "SM-S92" >nul
            if !errorlevel! equ 0 (
                set TARGET_DEVICE=%%A
                echo   Found: %%A ^(model: !MODEL_NAME!^)
                goto :DeviceFound
            )
        )
    )
)

:DeviceFound
if "%TARGET_DEVICE%" neq "" goto :BuildStart

:: Fallback: try hardcoded device ID
echo   Auto-detect failed. Trying fallback ID: %FALLBACK_DEVICE%...
for /f "skip=1 tokens=1,2" %%A in ('%ADB% devices') do (
    if "%%A"=="%FALLBACK_DEVICE%" if "%%B"=="device" (
        set TARGET_DEVICE=%FALLBACK_DEVICE%
        echo   Found via fallback ID: %FALLBACK_DEVICE%
        goto :BuildStart
    )
)

echo ERROR: Galaxy S24 not found. Is USB/wireless connected?
echo Run 'adb devices' to check connected devices.
pause & exit /b 1

:BuildStart
:: Record start time
set START_TIME=%TIME%

echo.
echo [1/5] npm run build...
call npm run build
if %errorlevel% neq 0 ( echo ERROR: npm run build failed & pause & exit /b 1 )

echo.
echo [2/5] cap sync android...
call npx cap sync android
if %errorlevel% neq 0 ( echo ERROR: cap sync failed & pause & exit /b 1 )

echo.
echo [3/5] gradlew assembleDebug...
cd android
call gradlew assembleDebug --quiet
if %errorlevel% neq 0 ( echo ERROR: gradle build failed & pause & exit /b 1 )
cd ..

echo.
echo [4/5] adb install -> %TARGET_DEVICE%...
%ADB% -s %TARGET_DEVICE% install -r "D:\Project\lumina-daily\android\app\build\outputs\apk\debug\app-debug.apk"
if %errorlevel% neq 0 ( echo ERROR: adb install failed & pause & exit /b 1 )

echo.
echo [5/5] Launch app...
%ADB% -s %TARGET_DEVICE% shell am start -n com.jeiel85.luminadaily/.MainActivity

:: Calculate elapsed time
set END_TIME=%TIME%
for /f "tokens=1-4 delims=:.," %%a in ("%START_TIME%") do set /a S_H=%%a, S_M=%%b, S_S=%%c
for /f "tokens=1-4 delims=:.," %%a in ("%END_TIME%")   do set /a E_H=%%a, E_M=%%b, E_S=%%c
set /a ELAPSED=(E_H-S_H)*3600 + (E_M-S_M)*60 + (E_S-S_S)
set /a ELAPSED_M=ELAPSED/60, ELAPSED_S=ELAPSED%%60

echo.
echo ========================================
echo   Done! Device: %TARGET_DEVICE%
echo   Elapsed: %ELAPSED_M%m %ELAPSED_S%s
echo ========================================
echo.
pause
