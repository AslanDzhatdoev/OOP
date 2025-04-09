function togglePowerInput() {
    const operation = document.getElementById('matrix_operation').value;
    const powerInput = document.getElementById('power_input');
    powerInput.style.display = (operation === 'power_a' || operation === 'power_b') ? 'block' : 'none';
}

function matrixClearOperation() {
    document.getElementById('matrix_a').value = '';
    document.getElementById('matrix_b').value = '';
    document.getElementById('matrix_power').value = '';
    document.getElementById('matrix_result').innerText = '';
}

async function matrixOperation() {
    const matrix_a = document.getElementById('matrix_a').value;
    const matrix_b = document.getElementById('matrix_b').value;
    const operation = document.getElementById('matrix_operation').value;
    const power = document.getElementById('matrix_power')?.value || 1;

    const response = await fetch('/matrix_operation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `matrix_a=${encodeURIComponent(matrix_a)}&matrix_b=${encodeURIComponent(matrix_b)}&operation=${encodeURIComponent(operation)}&power=${encodeURIComponent(power)}`
    });
    const result = await response.text();
    document.getElementById('matrix_result').innerText = `Результат:\\n${result}`;
}
