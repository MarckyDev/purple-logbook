@echo off
cd C:\Users\Lenovo\OneDrive\Desktop\Programming\Web\My-LogBook\purple-logbook\app\api

call venv\Scripts\activate.bat

echo Activated virtual environment.

echo Starting FastAPI server...
uvicorn main:app --reload
pause