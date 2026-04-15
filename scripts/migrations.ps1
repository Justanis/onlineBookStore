Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host "Activating backend virtual environment..."
. .\backend\.venv\Scripts\Activate.ps1

Write-Host "Creating Django migrations for books app..."
python .\backend\manage.py makemigrations books

Write-Host "Applying migrations..."
python .\backend\manage.py migrate

if ($LASTEXITCODE -ne 0) {
	Write-Host "Standard migrate failed; using fake migrate for existing schema..."
	python .\backend\manage.py migrate --fake
}
