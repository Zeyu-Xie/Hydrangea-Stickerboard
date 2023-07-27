@echo off

REM Define variables for folder paths
set "PAGE_DIR=page"
set "FUNCTION_DIR=function"
set "PAGE_BUILD_DIR=%PAGE_DIR%\build"
set "FUNCTION_TEMPLATES_DIR=%FUNCTION_DIR%\templates"
set "FUNCTION_APP_DIR=%FUNCTION_DIR%\app"
set "FUNCTION_SOURCES_DIR=%FUNCTION_APP_DIR%\sources"

REM Define custom targets
:all
call :install
call :build
call :apply_build
call :clear_cache
goto :eof

:install
echo "Installing dependencies in page."
cd %PAGE_DIR%
npm install
cd ..
goto :eof

:start
echo "Starting the react project to debug."
cd %PAGE_DIR%
npm start
goto :eof

:build
echo "Running build process in page."
cd %PAGE_DIR%
npm run build
cd ..
goto :eof

:apply_build
echo "Copying the packed page project into the python project's folder."
copy "%PAGE_BUILD_DIR%\index.html" "%FUNCTION_TEMPLATES_DIR%"
xcopy /E /Y "%PAGE_BUILD_DIR%\*" "%FUNCTION_APP_DIR%"
del "%FUNCTION_DIR%\index.html"
goto :eof

:run
echo "Starting the project..."
python3 "%FUNCTION_DIR%\server.py"
goto :eof

:clear_cache
echo "Removing uploaded photos."
del /Q "%FUNCTION_SOURCES_DIR%\*"
echo "Removing the output image."
del "%FUNCTION_APP_DIR%\output.png"
goto :eof

:clear
echo "Removing dependencies in page."
cd %PAGE_DIR%
rd /S /Q node_modules
cd ..
goto :eof
