# Definimos escenarios de prueba
$tests = @(
    @{ instructions = "MMMMDMMMIIM"; expected = "2:4:O"; status=200 },
    @{ instructions = "MIMIMIMIM"; expected = "0:1:S"; status=200 },

    #  Caso vacío
    @{ instructions = ""; expected = "0:0:N"; status=200 },

    #  Solo giros
    @{ instructions = "IIII"; expected = "0:0:N"; status=200 },

    #  Instrucción inválida
    @{ instructions = "MMXMM"; expected = $null; status=400 },

    #  Parámetro faltante
    @{ instructions = $null; expected = $null; status=400 }
)

foreach ($test in $tests) {
    try {
        if ($null -eq $test.instructions) {
            $url = "http://localhost:3000/rover"
        } else {
            $url = "http://localhost:3000/rover?instructions=$($test.instructions)"
        }

        $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop

        if ($test.status -ne 200) {
            Write-Host "Test '$($test.instructions)' Failed (Expected error but got success)"
            continue
        }

        if ($response.resultado -eq $test.expected) {
            Write-Host "Test '$($test.instructions)' Passed"
        } else {
            Write-Host "Test '$($test.instructions)' Failed"
            Write-Host "Expected: $($test.expected)"
            Write-Host "Got: $($response.resultado)"
        }

    } catch {
        if ($test.status -ne 200) {
            Write-Host "Test '$($test.instructions)' Passed (Error esperado)"
        } else {
            Write-Host "Test '$($test.instructions)' Failed (Unexpected error)"
            Write-Host $_
        }
    }
}
