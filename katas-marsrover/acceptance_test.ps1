# Detener ejecución si hay error
$ErrorActionPreference = "Stop"

function Check($name, $arg, $expected) {
    $output = npm start $arg

    if ($output -match $expected) {
        Write-Output "$name:ok"
    } else {
        Write-Output "$name:error"
    }
}

# npm start M
Check "caso_01" "M" "0:1:N"
