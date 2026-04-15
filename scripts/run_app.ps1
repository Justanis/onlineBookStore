Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host "Activating backend virtual environment..."
. .\backend\.venv\Scripts\Activate.ps1

Write-Host "Running Django backend..."
python .\backend\manage.py runserver