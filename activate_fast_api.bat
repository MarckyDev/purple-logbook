@echo off
cd "C:\Users\Lenovo\OneDrive\Desktop\Programming\Web\My-LogBook\purple-logbook\app\api"

call venv\Scripts\activate.bat

echo Activated virtual environment.
echo.
@REM echo Installing dependencies
@REM pip install fastapi uvicorn python-dotenv
echo.
echo Starting FastAPI server...
uvicorn main:app --reload
pause