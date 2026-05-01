# PowerShell script to create a public GitHub repository and upload all project files
# ---------------------------------------------------------------
# Configuration (replace token if needed)
$owner = "zeeshansarwar1986"
$repo  = "BallisticsPro"
$token = "<REDACTED_GITHUB_TOKEN>"

# Base directory of the project (this script assumes it lives in the project root)
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Helper: GitHub API request
function Invoke-GitHubApi {
    param(
        [string]$Method,
        [string]$Url,
        [hashtable]$Headers,
        [object]$Body = $null
    )
    $jsonBody = if ($Body) { $Body | ConvertTo-Json -Depth 10 } else { $null }
    try {
        $response = Invoke-RestMethod -Method $Method -Uri $Url -Headers $Headers -Body $jsonBody -ContentType "application/json"
        return $response
    } catch {
        return $_
    }
}

$authHeader = @{"Authorization" = "token $token"; "User-Agent" = "BallisticsProUploader"}

# ---------------------------------------------------------------
# 1. Create repository if it does not exist
$repoUrl = "https://api.github.com/repos/$owner/$repo"
$exists = Invoke-GitHubApi -Method GET -Url $repoUrl -Headers $authHeader
if ($exists -is [System.Management.Automation.ErrorRecord]) {
    Write-Host "Repository does not exist. Creating $owner/$repo (public)..."
    $createBody = @{name = $repo; private = $false}
    $createResp = Invoke-GitHubApi -Method POST -Url "https://api.github.com/user/repos" -Headers $authHeader -Body $createBody
    if ($createResp -is [System.Management.Automation.ErrorRecord]) {
        Write-Error "Failed to create repository: $($createResp.Exception.Message)"
        exit 1
    }
    Write-Host "Repository created successfully."
} else {
    Write-Host "Repository already exists."
}

# ---------------------------------------------------------------
# 2. Upload files recursively
function Upload-File {
    param(
        [string]$LocalPath,
        [string]$RepoPath
    )
    $contentBytes = [System.IO.File]::ReadAllBytes($LocalPath)
    $base64 = [System.Convert]::ToBase64String($contentBytes)
    $url = "https://api.github.com/repos/$owner/$repo/contents/$RepoPath"
    $body = @{
        message = "Add $RepoPath"
        content = $base64
        branch  = "main"
    }
    $resp = Invoke-GitHubApi -Method PUT -Url $url -Headers $authHeader -Body $body
    if ($resp -is [System.Management.Automation.ErrorRecord]) {
        Write-Error "Failed to upload ${RepoPath}: $($resp.message)"
    } else {
        Write-Host "Uploaded: $RepoPath"
    }
}

# Ensure the default branch exists (create an empty commit if repository was just created)
function Ensure-MainBranch {
    $refUrl = "https://api.github.com/repos/$owner/$repo/git/refs/heads/main"
    $ref = Invoke-GitHubApi -Method GET -Url $refUrl -Headers $authHeader
    if ($ref -is [System.Management.Automation.ErrorRecord]) {
        # Create an empty commit to initialise main branch
        Write-Host "Initialising main branch..."
        $blob = Invoke-GitHubApi -Method POST -Url "https://api.github.com/repos/$owner/$repo/git/blobs" -Headers $authHeader -Body @{content = ""; encoding = "utf-8"}
        $tree = Invoke-GitHubApi -Method POST -Url "https://api.github.com/repos/$owner/$repo/git/trees" -Headers $authHeader -Body @{tree = @()}
        $commit = Invoke-GitHubApi -Method POST -Url "https://api.github.com/repos/$owner/$repo/git/commits" -Headers $authHeader -Body @{message = "Initial commit"; tree = $tree.sha; parents = @()}
        $createRef = Invoke-GitHubApi -Method POST -Url "https://api.github.com/repos/$owner/$repo/git/refs" -Headers $authHeader -Body @{ref = "refs/heads/main"; sha = $commit.sha}
        Write-Host "Main branch initialised."
    }
}
Ensure-MainBranch

# Walk through local directory and upload each file (skip the script itself)
Get-ChildItem -Path $baseDir -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Substring($baseDir.Length + 1) -replace "\\","/"
    if ($relative -ieq "upload_to_github.ps1") { return }
    Upload-File -LocalPath $_.FullName -RepoPath $relative
}

Write-Host "All files uploaded to https://github.com/$owner/$repo"
