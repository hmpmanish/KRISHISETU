@echo off
echo Starting KrishiSetu Project...

echo.
echo ========================================================
echo Starting Backend (FastAPI on http://localhost:8000)...
echo ========================================================
start cmd /k "cd backend && .\venv\Scripts\activate && uvicorn app.main:app --reload"

echo.
echo ========================================================
echo Starting Frontend (React on http://localhost:5173)...
echo ========================================================
start cmd /k "cd frontend && npm run dev"

echo.
echo All services started in new windows!
echo - Frontend: http://localhost:5173
echo - Backend API Docs: http://localhost:8000/docs
