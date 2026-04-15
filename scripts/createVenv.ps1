Set-Location (Split-Path -Parent $PSScriptRoot)

if (!(Test-Path "backend/.venv")) {
    Write-Host "Creating backend virtual environment..."
    python -m venv backend/.venv
}

Write-Host "Activating backend virtual environment..."
. .\backend\.venv\Scripts\Activate.ps1

Write-Host "Installing backend dependencies..."
python -m pip install --upgrade pip
pip install -r .\backend\requirements.txt

Write-Host "Backend environment is ready."
